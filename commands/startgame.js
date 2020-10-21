const db = require("quick.db");
const shuffle = require("shuffle-array");

module.exports = {
  name: "startgame",
  run: async (message, args, client) => {
    let narrator = message.guild.roles.cache.find(r => r.name === "Narrator");
    let mininarr = message.guild.roles.cache.find(
      r => r.name === "Narrator Trainee"
    );
    let alive = message.guild.roles.cache.find(r => r.name === "Alive");
    let dead = message.guild.roles.cache.find(r => r.name === "Dead");

    if (
      !message.member.roles.cache.has(narrator.id) &&
      !message.member.roles.cache.has(mininarr.id)
    )
      return;

    db.set(`isDay_${message.guild.id}`, "no");
    db.set(`nightCount_${message.guild.id}`, 1);
    db.set(`isNight_${message.guild.id}`, "yes");
    db.set(`dayCount_${message.guild.id}`, 0);
    db.set(`wwsVote_${message.guild.id}`, "yes");
    db.set(`commandEnabled_${message.guild.id}`, "no");

    let hh = message.guild.channels.cache
      .filter(c => c.name === "priv-headhunter")
      .keyArray("id");

    let hhig = 0;
    for (let i = 0; i < hh.length; i++) {
      for (let a = 1; a <= alive.members.size; a++) {
        let player = message.guild.members.cache.find(
          m => m.nickname === a.toString()
        );
        let chan = message.guild.channels.cache.get(hh[i]);
        if (
          chan
            .permissionsFor(player.id)
            .has(["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "VIEW_CHANNEL"])
        ) {
          hhig = hhig + 1;
        }
      }
    }

    let allPlayers = [];
    for (let i = 1; i <= alive.members.size; i++) {
      allPlayers.push(i.toString());
    }

    shuffle(allPlayers);

    let gotTarget = null;

    for (let o = 0; o < hhig; o++) {
      for (let p = 1; p <= alive.members.size; p++) {
        let guy = message.guild.members.cache.find(
          m => m.nickname === allPlayers[p - 1]
        );
        let role = db.get(`role_${guy.id}`);
        if (
          role == "Villager" ||
          role == "Doctor" ||
          role == "Bodyguard" ||
          role == "Tough Guy" ||
          role == "Jailer" ||
          role == "Red Lady" ||
          role == "Marksman" ||
          role == "Seer" ||
          role == "Aura Seer" ||
          role == "Spirit Seer" ||
          role == "Seer Apprentice" ||
          role == "Detective" ||
          role == "Sheriff" ||
          role == "Medium" ||
          role == "Witch" ||
          role == "Forger" ||
          role == "Avenger" ||
          role == "Beast Hunter" ||
          role == "Loudmouth" ||
          role == "Fortune Teller" ||
          role == "Grumpy Grandma" ||
          role == "Cupid"
        ) {
          p = 99
          shuffle(allPlayers)
          gotTarget = true;
          db.set(`hhtarget_${hh[o]}`, guy.nickname);
          message.guild.channels.cache.get(hh[o]).send(`<:headhunter:475775432738996237> Your target is **${guy.nickname} ${guy.user.username}**!`)
        }
      }
      if (gotTarget != true) {
        message.channel.send("I could not find a valid target for the headhunter channel! To assign a new target, do `+sethhtarget [User to be the target] [Headhunter channel id]`\n\nHere is the channel id: " + hh[o])
      }
    }
  }
};
