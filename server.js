const http = require("http");
const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/", (request, response) => {
  response.sendStatus(200);
});

app.listen(process.env.PORT);

setInterval(() => {
  http.get(`http://werewolf-online-bot.glitch.me`);
}, 280000);

//fs for writeFile()
const fs = require("fs");

//quick.db for gameroles
const db = require("quick.db");

//discord.js
const Discord = require("discord.js");

// DanBot hosting to make the bot online 24/7

//Bot client
const client = new Discord.Client();

//Prefix and token from config file
const prefix = process.env.PREFIX;

//Cooldown
const cooldowns = new Discord.Collection();

//Databases
//let economy = require("./economy.json");

//Sync with commands folder


client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

//Music queue for all servers
var musicServers = {};

if(!db.get("giveaways")) db.set("giveaways", []);
 
const { GiveawaysManager } = require("discord-giveaways");
const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
 
    // This function is called when the manager needs to get all the giveaway stored in the database.
    async getAllGiveaways(){
        // Get all the giveaway in the database
        return db.get("giveaways");
    }
 
    // This function is called when a giveaway needs to be saved in the database (when a giveaway is created or when a giveaway is edited).
    async saveGiveaway(messageID, giveawayData){
        // Add the new one
        db.push("giveaways", giveawayData);
        // Don't forget to return something!
        return true;
    }
 
    async editGiveaway(messageID, giveawayData){
        // Gets all the current giveaways
        const giveaways = db.get("giveaways");
        // Remove the old giveaway from the current giveaways ID
        const newGiveawaysArray = giveaways.filter((giveaway) => giveaway.messageID !== messageID);
        // Push the new giveaway to the array
        newGiveawaysArray.push(giveawayData);
        // Save the updated array
        db.set("giveaways", newGiveawaysArray);
        // Don't forget to return something!
        return true;
    }
 
    // This function is called when a giveaway needs to be deleted from the database.
    async deleteGiveaway(messageID){
        // Remove the giveaway from the array
        const newGiveawaysArray = db.get("giveaways").filter((giveaway) => giveaway.messageID !== messageID);
        // Save the updated array
        db.set("giveaways", newGiveawaysArray);
        // Don't forget to return something!
        return true;
    }
 
};
 
// Create a new instance of your new class
const manager = new GiveawayManagerWithOwnDatabase(client, {
    storage: false, // Important - use false instead of a storage path
    updateCountdownEvery: 10000,
    default: {
        botsCanWin: false,
        exemptPermissions: [],
        embedColor: "#FF0000",
        reaction: "475775416922275850"
    }
});
// We now have a giveawaysManager property to access the manager everywhere!
client.giveawaysManager = manager;

//Bot on startup
client.on("ready", async () => {
  client.user.setActivity("Werewolf Online!");
  console.log("Connected!");
});

//When receiving a message
client.on("message", message => {

  //let guy = message.member.nickname;
  if (message.author.bot) return; //Ignore bots
  if (
    message.guild.id == "472261911526768642" &&
    message.channel.name == "day-chat"
  ) {
    if (message.content.includes("#priv") || message.content.includes("<#")) {
      message.delete();
      message.channel.send(
        `${message.author} This is a warning! Do not mention your channel!`
      );
    }
  }
  if (
    (message.content.includes("fuck") || message.content.includes("fúck")) &&
    (message.channel.name == "enter-game" ||
      message.channel.name == "player-commands")
  ) {
    message.member.addRole("607926461726457879");
    message.delete();
    message.reply("WATCH YOUR LANG! ");
    let ch = message.guild.channels.find(m => m.name === "game-lobby");
    ch.overwritePermissions(message.author.id, { SEND_MESSAGES: false });
  }
  if (message.content == "-pls snipe") {
    message.delete();
    message.channel.send(`We're no strangers to love
You know the rules and so do I
A full commitment's what I'm thinking of
You wouldn't get this from any other guy

I just wanna tell you how I'm feeling
Gotta make you understand
`);
  }

  if (
    message.guild.id == "472261911526768642" &&
    message.channel.name == "day-chat" &&
    message.member.roles.cache.has("606140092213624859") &&
    message.content.length > 140
  ) {
    message.delete();
    return message.channel.send(
      "Maximum length for messages are 140 characters!"
    );
  }
  if (
    message.guild.id == "472261911526768642" &&
    message.channel.name == "day-chat" &&
    message.member.roles.cache.has("606140092213624859") &&
    message.content.includes("\n")
  ) {
    message.delete();
    return message.channel.send(
      "No, sending more than one line is prohibited!"
    );
  }

  //If user mentions bot
  if (message.content === "<@!549402544066002955>")
    return message.author.send(
      `Hey! My prefix is ${prefix}, you can ask for \`${prefix}help\` if you ever need.`
    );

  //Check if message doesn't start with prefix
  //if (!message.content.startsWith(prefix)) return;


  
  if (!message.content.startsWith(prefix)) return 
  //Out of game commands
  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command =
    client.commands.get(commandName) || //DO NOT PUT ;
    client.commands.find(
      cmd => cmd.aliases && cmd.aliases.includes(commandName)
    );
  if (!command) return; //If such command doesn't exist, ignore it

  //Ignore guild-only commands inside DMs
  if (command.guildOnly && message.channel.type !== "text") {
    return message.reply("I can't execute that command in DMs!");
  }

  //Check if that command needs arguments
  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;
    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }
    return message.channel.send(reply);
  }

  //Check if command is in cooldown
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }
  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 0) * 1000;
  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${Math.ceil(
          timeLeft.toFixed(1)
        )} more seconds before reusing the \`${command.name}\` command.`
      );
    }
  }
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  //Execute command if everything is ok
  try {
    command.run(message, args, musicServers, client);
  } catch (error) {
    console.error(error);
    message.reply("I couldn't execute that command");
  }
});

client.login(process.env.TOKEN);
