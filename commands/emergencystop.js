module.exports = {
  name: 'emergencystop', 
  aliases: ["es", "yesstop", "reboot"], 
  run: async (message, args, client) => {
    let nar = message.guild.roles.cache.find(r => r.name === "Narrator")
    if (message.member.roles.cache.has(nar.id)) {
      message.channel.send('Oh no! Looks like i am executing a bug that is unstoppable. Please wait while i reboot.') 
      client.destroy() 
      client.login(process.env.TOKEN)
    } 
  }
  
} 