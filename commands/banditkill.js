const db =require('quick.db') 

module.exports = {
  name: 'banditkill' ,
  run: async (message, args, client) => {
    if (message.member.hasPermission('MANAGE_CHANNELS')) {
      let dead = message.guild.roles.find(r => r.name === 'Dead')
      let alive = message.guild.roles.find(r => r.name === 'Alive')
      let day = message.guild.channels.find(c => c.name === 'day-chat')
      let guy = message.guild.members.find(m => m.nickname === args[0])
      let role = await db.fetch(`role_${guy.id}`)
      day.send('The Bandits killed **' + args[0] + ' ' + guy.user.username + ' (' + role + ')**!') 
      guy.addRole(dead.id)
      guy.removeRole(alive.id) 
    } 
  } 
} 