const db = require("quick.db");

module.exports = {
  name: "shoot",
  run: async (message, args, client) => {
    if (message.channel.name == "priv-gunner") {
      let bullets = db.get(`bullets_${message.channel.id}`) || 2;
      let alive = message.guild.roles.cache.find(r => r.name === "Alive");
      let dead = message.guild.roles.cache.find(r => r.name === "Dead");
      let dayChat = message.guild.channels.cache.find(
        c => c.name === "day-chat"
      );
      let dayCount = db.get(`dayCount_${message.guild.id}`);
      let isDay = db.get(`isDay_${message.guild.id}`);
      let voting = db.get(`commandEnabled_${message.guild.id}`);
      if (message.member.roles.cache.has(dead.id))
        return message.channel.send(
          "Shooting while dead just shows you how much IQ you have. Probably -200 and below."
        );
      let guy =
        message.guild.members.cache.find(m => m.nickname === args[0]) ||
        message.guild.members.cache.find(m => m.user.username === args[0]) ||
        message.guild.members.cache.find(m => m.id === args[0]) ||
        message.guild.members.cache.find(m => m.user.tag === args[0]);
      
      if (isDay != "yes") return message.channel.send("Uh no. Sleep is very important to you.")
      if (!guy || guy == message.member || !guy.roles.cache.has(alive.id))
        return message.reply("Invalid target!");
      if (bullets > 0) {
        if (dayCount == 1) {
          if (voting != "yes")
            return message.channel.send(
              "You can only shoot when voting starts since this is Day 1."
            );
        }
        if (db.get(`did_${`message.channel.id`}`) == dayCount) return message.channel.send("You already shot today. Get chill pill from dank memer man!")
        dayChat.send(
          `**${message.member.nickname} ${
            message.author.username
          } (Gunner)** shot **${guy.nickname} ${guy.user.username} (${db.get(
            `role_${guy.id}`
          )})**!`
        );
        db.subtract(`bullets_${message.channel.id}`, 1)
        db.set(`did_${message.channel.id}`, dayCount)
      }
    }
  }
};
