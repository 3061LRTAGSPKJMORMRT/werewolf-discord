const fs = require("fs");
let economy = require(`../economy.json`);

module.exports = {
  name: "balance",
  aliases: ["bal", "coins", "money"],
  description: "Shows your or another user's balance",
  usage: "[user]",
  cooldown: 10,
  show: true,
  run: async (message, args) => {
   if (!economy[message.author.id]) {
      economy[message.author.id] = {
        name: message.author.username,
        coins: 0,
        daily: "Not Collected"
      };
      fs.writeFile(`../economy.json`, JSON.stringify(economy), err => {
        if (err) console.error(err);
      });
    }
    if (!args.length) {
      return message.reply(
        `you have ${economy[message.author.id].coins} coins.`
      );
    } else {
      let tUser = message.guild.member(
        message.mentions.users.first() || message.guild.members.get(args[0])
      );
      if (!economy[tUser.id]) {
        return message.reply(tUser + " has no coins!");
      } else {
        return message.channel.send(
          `${tUser} has ${economy[tUser.id].coins} coins.`
        );
      }
    }
  }
};
