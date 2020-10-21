const db = require("quick.db");

module.exports = {
  name: "stab",
  aliases: ["murder"],
  run: async (message, args, client) => {
    if (message.channel.name == "priv-serial-killer") {
      let alive = message.guild.roles.cache.find(r => r.name === 'Alive') 
      let guy = message.guild.members.cache.find(m => m.nickname === args[0])
      let ownself = message.guild.members.cache.find(m => m.nickname === message.member.nickname) 
      if (!guy || guy == ownself) {
        return await message.reply('Invalid target!') 
      } else {
        if (!guy.roles.cache.has(alive.id) || !ownself.roles.cache.has(alive.id)) {
          return await message.reply('You or your target isn\'t alive!')
        } else {
          let role = await db.fetch(`${guy.id}`)
          if (role == "President") return await message.channel.send('yup, killing the president for wins. Player these days just take short cuts.') 
          db.set(`stab_${message.channel.id}`, args[0])
          message.react('475775821760692225')
        } 
      } 
    }
  }
};
