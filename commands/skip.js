const db = require("quick.db");

module.exports = {
  name: "skip",
  run: async (message, args, client) => {
    if (!message.channel.name.includes("priv")) {
      return;
    } else {
      let alive = message.guild.roles.cache.find(r => r.name === "Alive");
      let ownself = message.guild.members.cache.find(
        m => m.nickname === message.member.nickname
      );
      if (!ownself.roles.has(alive.id)) {
        return await message.reply(
          `You cannot skip the discussion phase while dead!`
        );
      } else {
        let isDay = await db.fetch(`isDay_${message.guild.id}`);
        let day = await db.fetch(`dayCount_${message.guild.id}`);
        if (isDay != "yes") {
          return await message.reply(
            "You can only skip the discussion phase during the day!"
          );
        } else {
          if (alive.members.size > 8) {
            return await message.reply(
              "You can only skip the discussion phase if there are 8 or less players alive!"
            );
          } else {
            let dayChat = message.guild.channels.cache.find(c => c.name === 'day-chat') 
            let commands = message.guild.channels.cache.find(c => c.name === 'commands')  
            dayChat.send(`Someone voted to skip the discussion phase!`)
            commands.send(`${message.member.nickname} decided to skip the discussion phase!`)
          }
        }
      }
    }
  }
};
