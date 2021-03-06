const db = require("quick.db");
const Discord = require("discord.js");

module.exports = {
  name: "vt",
  modOnly: true,
  run: async (message, args, client) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      // modOnly doesn't work
      return;
    } else {
    

      let wwsVote = await db.fetch(`wwsVote_${message.guild.id}`);
      let commandEnabled = await db.fetch(`commandEnabled_${message.guild.id}`);
      let voteChat = message.guild.channels.cache.find(c => c.name === "vote-chat");
      let dayChat = message.guild.channels.cache.find(c => c.name === "day-chat");
      let aliveRole = message.guild.roles.cache.find(r => r.name === "Alive");
      db.set(`wwsVote_${message.guild.id}`, "NO");
      let votes = Math.floor(parseInt(aliveRole.members.size) / 2);
      voteChat.send(`<@&${aliveRole.id}>`);
      dayChat.send(`Get ready to vote! (${votes} votes required)`);
      db.set(`commandEnabled_${message.guild.id}`, `yes`);
    }
  }
};
