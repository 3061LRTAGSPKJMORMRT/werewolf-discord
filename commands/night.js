const db = require("quick.db");

module.exports = {
  name: "night",
  run: async (message, args, client) => {
    let alive = message.guild.roles.cache.find(r => r.name === "Alive");
    let dead = message.guild.roles.cache.find(r => r.name === "Dead");
    let narrator = message.guild.roles.cache.find(r => r.name === "Narrator");
    let mininarr = message.guild.roles.cache.find(
      r => r.name === "Narrator Trainee"
    );
    let dayChat = message.guild.channels.cache.find(c => c.name === "day-chat");
    let wwChat = message.guild.channels.cache.find(
      c => c.name === "werewolves-chat"
    );
    let lynched = "yes";

    if (
      !message.member.roles.cache.has(mininarr.id) &&
      !message.member.roles.cache.has(narrator.id)
    )
      return;

    if (args.length != 1)
      return await message.channel.send(
        "You can't kill an empty player! Use 0 if you don't want to kill"
      );

    if (args[0] == "0") {
      dayChat.send(
        "<:votingme:744572471079993445> The Villagers couldn't decide on who to lynch!"
      );
    } else {
      let guy = message.guild.members.cache.find(m => m.nickname === args[0]);

      if (!guy)
        return message.channel.send("User not found. Please try again!");

      let fc = message.guild.channels.cache.filter(
        c => c.name === "priv-flower-child"
      );
      let fcss = fc.keyArray("id");
      for (let i = 0; i < fcss.length; i++) {
        let petal = db.get(`flower_${fcss[i]}`);
        if (petal == args[0]) {
          if (db.get(`protest_${fcss[i]}`) == "no") {
            dayChat.send(
              `<:votingme:744572471079993445> Player **${guy.nickname} ${guy.user.username}** could not be lynched!`
            );
            db.set(`protest_${fcss[i]}`, "no");
            i = 99;
            lynched = "no";
          }
        }
      }
      if (lynched == "yes") {
        let gww = message.guild.channels.cache.filter(
          c => c.name === "priv-guardian-wolf"
        );
        let gwwss = gww.keyArray("id");
        for (let i = 0; i < gwwss.length; i++) {
          let guardian = db.get(`guardian_${gwwss[i]}`);
          if (guardian == args[0]) {
            if (db.get(`protest_${gwwss[i]}`) == "no") {
              dayChat.send(
                `<:votingme:744572471079993445> Player **${guy.nickname} ${guy.user.username}** could not be lynched!`
              );
              db.set(`protest_${fcss[i]}`, "no");
              i = 99;
              lynched = "no";
            }
          }
        }
      }

      if (lynched == "yes") {
        dayChat.send(
          "<:votingme:744572471079993445> The Villagers lynched **" +
            guy.nickname +
            " " +
            guy.user.username +
            " (" +
            db.get(`role_${guy.id}`) +
            ")**!"
        );
        guy.roles.add(dead.id);
        guy.roles.remove(alive.id);
      }
    }

    let as = message.guild.channels.cache
      .filter(c => c.name === "priv-aura-seer")
      .keyArray("id");
    let s = message.guild.channels.cache
      .filter(c => c.name === "priv-seer")
      .keyArray("id");
    let det = message.guild.channels.cache
      .filter(c => c.name === "priv-detective")
      .keyArray("id");
    let sorc = message.guild.channels.cache
      .filter(c => c.name === "priv-sorcerer")
      .keyArray("id");
    let wwseer = message.guild.channels.cache
      .filter(c => c.name === "priv=wolf-seer")
      .keyArray("id");
    let healer1 = message.guild.channels.cache
      .filter(c => c.name === "priv-doctor")
      .keyArray("id"); // doctor
    let healer3 = message.guild.channels.cache
      .filter(c => c.name === "priv-doctor")
      .keyArray("id"); // witch
    let healer2 = message.guild.channels.cache
      .filter(c => c.name === "priv-doctor")
      .keyArray("id"); // bodyguard
    let serialkiller = message.guild.channels.cache.filter(c => c.name === "priv-serial-killer").keyArray("id")
    let gg = message.guild.channels.cache
      .filter(c => c.name === "priv-grumpy-grandma")
      .keyArray("id");
    for (let i = 0; i < as.length; i++) {
      db.set(`auraCheck_${as[i]}`, "no");
    }
    for (let i = 0; i < s.length; i++) {
      db.set(`seer_${s[i]}`, "no");
    }
    for (let i = 0; i < det.length; i++) {
      db.set(`detCheck_${det[i]}`, "no");
    }
    for (let i = 0; i < sorc.length; i++) {
      db.set(`sorcerer_${sorc[i]}`, "no");
    }
    for (let i = 0; i < wwseer.length; i++) {
      db.set(`wwseer_${wwseer[i]}`, "no");
    }
    for (let i = 0; i < healer1.length; i++) {
      db.set(`heal_${healer1[i]}`, null);
    }
    for (let i = 0; i < healer2.length; i++) {
      db.set(`potion_${healer2[i]}`, null);
    }
    for (let i = 0; i < healer3.length; i++) {
      db.set(`guard_${healer3[i]}`, null);
    }
    for (let i = 0; i < serialkiller.length ; i++) {
      db.set(`stab_${serialkiller[i]}`, null)
    }
    for (let i = 0; i < gg.length; i++) {
      db.set(`mute_${gg[i]}`, null)
    }
    for (let a = 1; a < alive.members.size + dead.members.size; a++) {
      let guy = message.guild.members.cache.find(
        m => m.nickname === a.toString()
      );
      let role = db.get(`role_${guy.id}`);
      if (role != "Drunk") {
        dayChat.updateOverwrite(guy.id, {
          SEND_MESSAGES: null,
          READ_MESSAGE_HISTORY: null,
          VIEW_CHANNEL: null
        })
      }
    }
    dayChat.updateOverwrite(alive.id, {
      SEND_MESSAGES: false
    })
    db.set(`isDay_${message.guild.id}`, "no");
    db.set(`isNight_${message.guild.id}`, "yes");
    db.add(`nightCount_${message.guild.id}`, 1);
    db.set(`wwsVote_${message.guild.id}`, "yes");
    db.set(`commandEnabled_${message.guild.id}`, "no");
  }
};
