const Discord = require("discord.js");
const db = require("quick.db");
let voteForwws = ["0"];
module.exports = {
  name: "vote",
  run: async (message, args, client) => {
    let alive = message.guild.roles.cache.find(r => r.name === "Alive");
    let dead = message.guild.roles.cache.find(r => r.name === "Dead");
    let wwsVote = await db.fetch(`wwsVote_${message.guild.id}`);
    let commandEnabled = await db.fetch(`commandEnabled_${message.guild.id}`);
    if (wwsVote == "yes") {
      if (!message.channel.name.includes("wolf")) return;
      let voted =
        message.guild.members.cache.find(m => m.nickname === args[0]) ||
        message.guild.members.cache.find(m => m.id === args[0]) ||
        message.guild.members.cache.find(m => m.user.username === args[0]);

      if (!voted) return message.channel.send("Target doesn't exist!");
      if (voted.roles.cache.has(dead.id))
        return message.channel.send("You can't vote a dead player!");
      if (message.member.roles.cache.has(dead.id) || voted == message.member)
        return message.channel.send(
          "I'm not even gonna say what's your problem."
        );
      if (
        db
          .get(`role_${voted.id}`)
          .toLowerCase()
          .includes("wolf")
      )
        return message.channel.send(
          "Voting your teammates causes gamethrowing you know"
        );

      message.guild.channels.cache
        .get("606131484532801549")
        .send(
          `${message.member.nickname} voted ${
            args[0]
          }`
        );
      message.guild.channels.cache
        .get("606135720825847829")
        .send(
          `${message.member.nickname} voted ${
            args[0]
          }`
        );

      let wolves = message.guild.channels.cache.get("606135720825847829");
      
    }
    if (commandEnabled == "yes") {
      if (!message.channel.name.includes("priv")) {
        return;
      } else {
        if (message.channel.name == "priv-idiot") {
          let killed = await db.fetch(`idiot_${message.channel.id}`);
          if (killed == "yes")
            return await message.channel.send(
              "You idiot! You were lynched and now can't vote. Bohoo. Go tell your mommy."
            );
        }
        let votedGuy = message.guild.members.cache.find(
          m => m.nickname === args[0]
        );
        if (
          !votedGuy ||
          votedGuy.roles.cache.has(dead.id) ||
          votedGuy == message.member
        ) {
          return await message.reply(`Target does not exist!`);
        } else if (
          !votedGuy.roles.cache.has("606140092213624859") ||
          !message.member.roles.cache.has("606140092213624859")
        ) {
          return await message.reply(
            `I know I'm just a bot but I know that you or the player you are trying to vote is dead. Get a life and stop breaking me dude!`
          );
        } else {
          let voteChat = message.guild.channels.cache.find(
            c => c.name === "vote-chat"
          );
          //voteChat.send(`${message.member.nickname} voted ${args[0]}`);
          let voted = message.guild.members.cache.find(
            m => m.nickname === args[0]
          );
          let votes = ["0"];
          if (args[0] == message.member.nickname) {
            return message.reply(
              `Trying to win as fool by voting yourself won't get you anywhere. Get a life dude.`
            );
          } else {
            voteChat.send(`${message.member.nickname} voted ${args[0]}`);
            votes.push(args[0]);
            let vote = await db.fetch(`vote_${message.author.id}`);
            db.set(`vote_${message.author.id}`, args[0]);
          }
        }
      }
    }
  }
};
