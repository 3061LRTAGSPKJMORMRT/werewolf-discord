const db = require("quick.db");

module.exports = {
  name: "enchant",
  alises: ["shaman"],
  run: async (message, args, client) => {
    if (message.channel.name == "priv-wolf-shaman") {
      let alive = message.guild.roles.cache.find(r => r.name === "Alive");
      let guy = message.guild.members.find(m => m.nickname === args[0]);
      let ownself = message.guild.members.cache.find(
        m => m.nickname === message.member.nickname
      );
      let role = await db.fetch(`role_${guy.id}`);
      let toShaman = role.toLowerCase();
      if (!guy || guy == ownself) {
        return await message.reply("Invalid target!");
      } else {
        if (!guy.roles.has(alive.id) || !ownself.roles.has(alive.id)) {
          return await message.reply(`You or your target isn't alive!`);
        } else {
          if (toShaman.includes("wolf")) {
            return await message.reply(
              "You can't use your abilities on other werewolves!"
            );
          } else {
            db.set(`shaman_${message.channel.id}`, args[0]);
            message.react("475776068431904769");
          }
        }
      }
    }
  }
};
