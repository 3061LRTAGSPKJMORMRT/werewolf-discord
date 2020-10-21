const db = require('quick.db') 

module.exports = {
  name: 'hunt', 
  run: async(message, args, client) => {
    if (message.channel.name == 'priv-sect-hunter') {
      let alive = message.guild.roles.cache.find(r =>r.name === 'Alive') 
      let dead = message.guild.roles.cache.find(r => r.name === 'Dead' ) 
      let isNight = await db.fetch(`isNight_${message.guild.id}`) 
      let ownself = message.guild.members.cache.find (m => m.nickname === message.member.nickname) 
      let guy = message.guild.members.cache.find(m => m.nickname === args[0]) 
      if (!isNight == "yes") return await message.channel.send('Listen, you can\'t go hunting for the sect in broad day light.') 
      if (!guy || guy == ownself) return await message.channel.send('Invalid Target!') 
      if (!guy.roles.has(alive.id) || !ownself.roles.has(alive.id)) return await message.channel.send('You can\'t hunt if you or your target is dead dumb.') 
      db.set(`hunt_${message.channel.id}`, args[0])
      message.react('721794093222461592')
    } 
  } 
} 