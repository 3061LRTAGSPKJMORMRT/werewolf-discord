const db = require("quick.db");

module.exports = {
  name: "ignite",
  alises: ["burn", "fire"],
  run: async (message, args, client) => {
    let isNight = await db.fetch(`isNight_${message.guild.id}`);
    let doused = await db.fetch(`doused_${message.channel.id}`);
    let alive = message.guild.roles.cache.find(r => r.name === "Alive");
    let dead = message.guild.roles.cache.find(r => r.name === "Dead");
    if (message.channel.name == "priv-arsonist") {
      if (!message.member.roles.has(alive.id))
        return await message.channel.send(
          "Yes. Trying to win as dead. Good Job."
        );
      if (isNight != "yes")
        return await message.channel.send(
          "Burning in broad day light just makes you look stupid"
        );
      if (doused == null || doused.length == 0)
        return await message.channel.send(
          "Are you dumb? Don't try to think i'm stupid! You haven't even doused anyone yet! "
        );

      for (let i = 1; i < doused.length; i++) {
        let guy = message.guild.members.cache.find(m => m.nickname === doused[i]);
        if (guy.roles.has(alive.id)) {
          let day = message.guild.channels.cache.find(c => c.name === "day-chat");
          let role = await db.fetch(`role_${guy.id}`);
          day.send(
            `<:ignite:744575140032938014> The Arsonist ignited **${guy.nickname} ${guy.user.username} (${role})**!`
          );
          guy.addRole(dead.id);
          guy.removeRole(alive.id);
          if (role == "Junior Werewolf" || role == "Avenger") {
            while (role == "Junior Werewolf" || role == "Avenger") {
              if (role == "Junior Werewolf") {
                let jwwtag = await db.fetch(`jwwtag_${guy.id}`);
                if (jwwtag) {
                  guy = message.guild.members.cache.find(m => m.nickname === jwwtag);
                  role = await db.fetch(`role_${guy.id}`);
                  if (guy.roles.has(alive.id)) {
                    day.send(
                      `<:revenge:744572531889012756> The Junior Werewolf's death has been avenged! **${guy.nickname} ${guy.user.username} (${role})** is dead!`
                    );
                    guy.addRole(dead.id)
                    guy.removeRole(alive.id);
                  }
                }
              } else if (role == "Avenger") {
                let atag = await db.fetch(`atag_${guy.id}`);
                if (atag) {
                  guy = message.guild.members.cache.find(m => m.nickname === atag) 
                  role = await db.fetch(`role_${guy.id}`) 
                  if (guy.roles.has(alive.id)) {
                    day.send(`<:avenge:744536638314774558> The Avenger has avenged **${guy.nickname} ${guy.user.username} (${role})**!`) 
                    guy.addRole(dead.id)
                    guy.removeRole(alive.id)
                  } 
                } 
              }
            }
          }
        }
      }
      db.set(`doused_${message.channel.id}`, ["1"])
    }
  }
};
