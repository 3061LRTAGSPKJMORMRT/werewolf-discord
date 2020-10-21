const db = require("quick.db");

module.exports = {
  name: "tag",
  aliases: ["revenge", "avenge", "hunt", "target"],
  run: async (message, args, client) => {
    let jtag = await db.fetch(`jwwtag_${message.author.id}`);
    let atag = await db.fetch(`atag_${message.author.id}`) 
    let guy = message.guild.members.cache.find(m => m.nickname === args[0]);
    let alive = message.guild.roles.cache.find(r => r.name === "Alive");
    let dead = message.guild.roles.cache.find(r => r.name === "Dead");
    let ownself = message.guild.members.cache.find(
      m => m.nickname === message.member.nickname
    );
    if (message.channel.name == "priv-junior-werewolf") {
      if (
        parseInt(args[0]) >
          parseInt(alive.members.size) + parseInt(dead.members.size) ||
        parseInt(args[0]) < 1
      ) {
        return await message.reply("Invalid target!");
      } else if (!message.member.roles.cache.has(alive.id) || !guy.roles.cache.has(alive.id)) {
        return await message.reply("You or your target isn't alive!");
      }
      let role = await db.fetch(`role_${guy.id}`) 
      let player = role.toLowerCase()
      if (player.includes('wolf')) {
        return await message.reply('You can\'t tag your teammate!') 
      }
      if (role == 'President') {
        return await message.reply('You can\'t tag the President!')
      } else {
        db.set(`jwwtag_${message.author.id}`, args[0])
        message.react('475775484219752453')
      } 
    }
    if (message.channel.name == "priv-avenger") {
      if (
        parseInt(args[0]) >
          parseInt(alive.members.size) + parseInt(dead.members.size) ||
        parseInt(args[0]) < 1
      ) {
        return await message.reply("Invalid Target!");
      }
      if (!ownself.roles.has(alive.id) || !guy.roles.has(alive.id)) {
        return await message.reply("You or your target isn't alive!");
      }
      let role = await db.fetch(`role_${guy.id}`) 
      if (role == 'President') {
        return await message.reply('You can\'t tag the President!') 
      } else {
        db.set(`atag_${message.author.id}`, args[0]) 
        message.react('482179367485702162')
      } 
    }
  }
};
