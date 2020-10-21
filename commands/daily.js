const moment = require("moment");
let economy = require("/app/economy.json");
const fs = require("fs");

module.exports = {
  name: "daily",
  description: "Free coins every day!",
  cooldown: 5,
  show: true,
  run: async (message, args) => {
    if (message.guild.id != '673666304192020513') {
      return
    }
    if (!economy[message.author.id]) {
      economy[message.author.id] = {
        name: message.author.username,
        coins: 0,
        daily: "Not Collected"
      };
      fs.writeFile(`/app/economy.json`, JSON.stringify(economy), err => {
        if (err) console.error(err);
      });
    }
    if (economy[message.author.id].daily != moment().format("L")) {
      economy[message.author.id].daily = moment().format("L");
      economy[message.author.id].coins += 10;
      message.reply(
        `you received 10 daily coins, now you have ${economy[message.author.id].coins} coins!`
      );
      fs.writeFile(`/app/economy.json`, JSON.stringify(economy), err => {
        if (err) console.error(err);
      });
    } else {
      message.reply(
        "you already had your daily coins! Come back " +
          moment()
            .endOf("day")
            .fromNow()
      );
    }
  }
};