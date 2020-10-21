const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "reveal",
  aliases: ["rev", "show"], 
  run: async (message, args, client) => {
    let aliveRole = message.guild.roles.cache.find(r => r.name === "Alive");
    let deadRole = message.guild.roles.cache.find(r => r.name === "Dead");
    if (message.channel.name == "priv-mayor") {
      let dayChat = message.guild.channels.cache.find(c => c.name === "day-chat");
      let ability = await db.fetch(`ability_${message.channel.id}`);
      if (ability)
        return await message.reply("You already used up your ability!");
      dayChat.send(
        `**${message.member.nickname} (Mayor)** has revealed himself!`
      );
      db.set(`ability_${message.channel.id}`, "yes");
    } else if (
      message.channel.name == "priv-pacifist" ||
      message.channel.name == "priv-wolf-pacifist"
    ) {
      let ability = await db.fetch(`paci_${message.channel.id}`);
      let isday = await db.fetch(`isDay_${message.guild.id}`);
      let day = await db.fetch(`day_${message.guild.id}`);
      if (ability == "yes")
        return await message.reply("You already used up all your abilities!");
      let cmd = await db.fetch(`commandEnabled_${message.guild.id}`);
      let guy = message.guild.members.cache.find(m => m.nickname === args[0]);
      let role = await db.fetch(`role_${guy.id}`);
      let nrole = role.toLowerCase();
      let revealed = await db.fetch(`revealed_${guy.id}`);
      let sected = await db.fetch(`sected_${message.author.id}`);
      let dchat = message.guild.channels.cache.find(c => c.name === "day-chat");
      if (isday != "yes")
        return await message.reply(
          "You can only use this ability during the day!"
        );
      if (day == 1) {
        if (cmd != "yes")
          return await message.reply(
            "You can only use this ability when voting starts on day 1!"
          );
        if (!guy || guy == message.member.nickname)
          return await message.reply("Invalid Target");
        if (role == "President")
          return await message.reply("You can't reveal the President!");
        if (
          message.channel.name == "priv-wolf-pacifist" &&
          nrole.includes("wolf")
        )
          return await message.reply("You can't reveal your own teammate!");
        if (revealed == "yes")
          return await message.reply("You can't reveal a revealed player!");
        if (sected == "yes" && role == "Sect Leader")
          return await message.reply(
            "You can't reveal a Sect Leader when sected!"
          );
        db.set(`paci_${message.channel.id}`, "yes");
        dchat.send(
          "The Pacifist<:pacifist:583672644965236736> revealed **" +
            args[0] +
            " " +
            guy.user.username +
            " (" +
            role +
            ")**!"
        );
        db.set(`reveal_${guy.id}`, "yes");
        if (message.channel.name == "priv-wolf-pacifist")
          client.channels
            .get("606135720825847829")
            .send(
              "The Wolf Pacifist<:wolf_pacifist:711948506989985812> has revealed **" +
                args[0] +
                " " +
                guy.user.username +
                "**!"
            );
      } else {
        if (!guy || guy == message.member.nickname)
          return await message.reply("Invalid Target");
        if (role == "President")
          return await message.reply("You can't reveal the President!");
        if (
          message.channel.name == "priv-wolf-pacifist" &&
          nrole.includes("wolf")
        )
          return await message.reply("You can't reveal your own teammate!");
        if (revealed == "yes")
          return await message.reply("You can't reveal a revealed player!");
        if (sected == "yes" && role == "Sect Leader")
          return await message.reply(
            "You can't reveal a Sect Leader when sected!"
          );
        db.set(`paci_${message.channel.id}`, "yes");
        dchat.send(
          "The Pacifist<:pacifist:583672644965236736> revealed **" +
            args[0] +
            " " +
            guy.user.username +
            " (" +
            role +
            ")**!"
        );
        db.set(`reveal_${guy.id}`, "yes");
        if (message.channel.name == "priv-wolf-pacifist")
          client.channels
            .get("606135720825847829")
            .send(
              "The Wolf Pacifist<:wolf_pacifist:711948506989985812> has revealed **" +
                args[0] +
                " " +
                guy.user.username +
                "**!"
            );
      }
    }
  }
};
