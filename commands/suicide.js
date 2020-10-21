const db = require("quick.db");

module.exports = {
  name: "suicide",
  run: async (message, args, client) => {
    if (
      message.channel.name.includes("priv") ||
      message.channel.name == "day-chat"
    ) {
      let day = message.guild.channels.cache.find(c => c.name === "day-chat");
      let role = await db.fetch(`role_${message.author.id}`);
      day.send(
        "**" +
          message.member.nickname +
          " " +
          message.author.username +
          " (" +
          role +
          ")** has commited suicide!"
      );
      message.member.roles.add("606131202814115882");
      message.member.roles.remove("606140092213624859");
    }

    if (message.member.hasPermission("MANAGE_CHANNELS")) {
      let guy = message.guild.members.cache.find(m => m.nickname === args[0]);
      let role = await db.fetch(`role_${guy.id}`);
      let day = message.guild.channels.cache.find(c => c.name === "day-chat");
      day.send(
        "**" +
          guy.nickname +
          " " +
          guy.user.username +
          " (" +
          role +
          ")** has commited suicide!"
      );
      guy.roles.add("606131202814115882");
      guy.roles.remove("606140092213624859");
    }
  }
};
