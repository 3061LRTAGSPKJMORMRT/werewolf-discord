module.exports = {
  name: 'jail' ,
  run: async (message, args, client) => {
    message.react('475775467882938369')
    let commandChannel = message.guild.channels.cache.find(c => c.name === 'commands')
    commandChannel.send(
      `${message.member.nickname} decided to jail ${args[0]}`
    )
  } 
} 