const db = require("quick.db");
const Discord = require("discord.js");

module.exports = {
  name: "day",
  run: async (message, args, client) => {
    //defining all of the variables
    let narrator = message.guild.roles.cache.get("606139219395608603");
    let mininarr = message.guild.roles.cache.get("606276949689499648");
    let alive = message.guild.roles.cache.get("606140092213624859");
    let dead = message.guild.roles.cache.get("606131202814115882");
    let dayChat = message.guild.channels.cache.get("606132999389708330");
    let wolfChat = message.guild.channels.cache.get("606135720825847829");
    let jailed = message.guild.channels.cache.get("606251143466713174");
    let dayCount = db.get(`dayCount_${message.guild.id}`);

    if (
      !message.member.roles.cache.has(narrator.id) &&
      !message.member.roles.cache.has(mininarr.id)
    )
      return;

    //serial killer killing
    let serialkillers = message.guild.channels.cache.filter(
      c => c.name === "priv-serial-killer"
    );
    let sks = serialkillers.keyArray("id");
    for (let i = 0; i < sks.length; i++) {
      let sk = message.guild.channels.cache.get(sks[i]);
      let toKill = db.get(`stab_${sks[i]}`);
      if (toKill != null) {
        let guy = message.guild.members.cache.find(m => m.nickname === toKill);
        //doc protect
        let doctors = message.guild.channels.cache.filter(
          c => c.name === "priv-doctor"
        );
        let docs = doctors.keyArray("id");
        for (let j = 0; j < docs.length; j++) {
          let doc = message.guild.channels.cache.get(docs[j]);
          let protect = db.get(`heal_${docs[j]}`);
          if (protect == toKill) {
            sk.send(
              `${alive} Player **${toKill} ${guy.user.username}** could not be killed!`
            );
            doc.send(`${alive}`);
            doc.send(
              `<:heal:744536259673718894> Your protection saved **${toKill} ${guy.user.username}**!`
            );
            db.set(`stab_${sks[i]}`, null);
          }
        }
      }
      toKill = db.get(`stab_${sks[i]}`);
      if (toKill != null) {
        let guy = message.guild.members.cache.find(m => m.nickname === toKill);
        //bh protect
        let beasthunters = message.guild.channels.cache.filter(
          c => c.name === "priv-beast-hunter"
        );
        let bhs = beasthunters.keyArray("id");
        for (let j = 0; j < bhs.length; j++) {
          let thebhguy
          for (let ohno = 1 ; ohno <= alive.members.size + dead.members.size ; ohno++) {
            let ithink = message.guild.members.cache.find(m => m.nickname === ohno.toString())
            for (let nooh = 0 ; nooh < bhs.length ; nooh.length) {
              let ithinkooh = message.guild.channels.cache.get(bhs[nooh])
              if (ithinkooh.permissionsFor(ithink).has(["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "VIEW_CHANNEL"])) {
                thebhguy = ithink
              }
            }
          }
          let bh = message.guild.channels.cache.get(bhs[j]);
          let protect = db.get(`setTrap_${bhs[j]}`);
          let active = db.get(`trapActive_${bhs[j]}`);
          if (protect == toKill && active == true && thebhguy.roles.cache.has(alive.id)) {
            sk.send(
              `${alive} Player **${toKill} ${guy.user.username}** could not be killed!`
            );
            bh.send(`${alive}`);
            bh.send(
              `<:active:744536047702245426> Your trap was triggered last night but your target was too strong.`
            );
            db.set(`stab_${sks[i]}`, null);
            db.set(`setTrap_${bhs[j]}`, null);
            db.set(`trapActive_${bhs[j]}`, false);
          }
        }
      }
      toKill = db.get(`stab_${sks[i]}`);
      if (toKill != null) {
        let guy = message.guild.members.cache.find(m => m.nickname === toKill);
        //witch protect
        let witches = message.guild.channels.cache.filter(
          c => c.name === "priv-witch"
        );
        let witch = witches.keyArray("id");
        for (let j = 0; j < witch.length; j++) {
          let wc = message.guild.channels.cache.get(witch[j]);
          let protect = db.get(`potion_${witch[j]}`);
          if (protect == toKill) {
            sk.send(
              `${alive} Player **${toKill} ${guy.user.username}** could not be killed!`
            );
            wc.send(`${alive}`);
            wc.send(
              `<:potion:744536604252700766> Your potion saved a life last night!`
            );
            db.set(`stab_${sks[i]}`, null);
            db.set(`potion_${witch[j]}`, null);
          }
        }
      }
      toKill = db.get(`stab_${sks[i]}`);
      if (toKill != null) {
        let guy = message.guild.members.cache.find(m => m.nickname === toKill);
        //bg protect
        let bodyguards = message.guild.channels.cache.filter(
          c => c.name === "priv-bodyguard"
        );
        let bgs = bodyguards.keyArray("id");
        for (let j = 0; j < bgs.length; j++) {
          let bg = message.guild.channels.cache.get(bgs[j]);
          let protect = db.get(`guard_${bgs[j]}`);
          let lives = db.get(`lives_${bgs[j]}`);
          if (protect == toKill || db.get(`role_${guy.id}`) == "Bodyguard") {
            if (lives == 2) {
              j = 99;
              sk.send(
                `${alive} Player **${toKill} ${guy.user.username}** could not be killed!`
              );
              bg.send(`${alive}`);
              bg.send(
                `<:guard:744536167109886023> You fought off an attack last night and survived. Next time you are attacked you will die.`
              );
              db.set(`stab_${sks[i]}`, null);
              db.subtract(`lives_${bgs[j]}`, 1);
            } else if (lives == 1) {
              j = 99;
              db.set(`stab_${sks[i]}`, null);
              db.set(`guard_${bgs[j]}`, null);
              if (protect == toKill) {
                for (
                  let k = 1;
                  k <= alive.members.size + dead.members.size;
                  k++
                ) {
                  let uwu = message.guild.members.cache.find(
                    m => m.nickname === k.toString()
                  );
                  if (
                    bg
                      .permissionsFor(uwu)
                      .has([
                        "SEND_MESSAGES",
                        "VIEW_CHANNEL",
                        "READ_MESSAGE_HISTORY"
                      ])
                  ) {
                    k = 100;
                    guy = uwu;
                  }
                }
              }
              dayChat.send(
                `The Serial Killer stabbed **${guy.nickname} ${
                  guy.user.username
                } (${db.get(`role_${guy.id}`)})**!`
              );
              guy.roles.add(dead.id);
              guy.roles.remove(alive.id);
            }
          }
        }
      }

      toKill = db.get(`stab_${sks[i]}`);
      if (toKill != null) {
        let guy = message.guild.members.cache.find(m => m.nickname === toKill);
        let role = db.get(`role_${guy.id}`);
        dayChat.send(
          `The Serial Killer stabbed **${toKill} ${guy.user.username} (${role})**!`
        );
        guy.roles.add(dead.id);
        guy.roles.remove(alive.id);
        if (role == "Junior Werewolf" || role == "Avenger") {
          while (role == "Junior Werewolf" || role == "Avenger") {
            if (role == "Junior Werewolf") {
              let newjww = db.get(`jwwtag_${guy.id}`);
              if (newjww != null) {
                let newtoJww = message.guild.members.cache.find(
                  m => m.nickname === newjww
                );
                role = db.get(`role_${newtoJww.id}`);
                if (newtoJww.roles.cache.has(alive.id)) {
                  dayChat.send(
                    `<:revenge:744572531889012756> The Junior Werewolf's death has been avenged! **${newjww} ${newtoJww.user.username} (${role})** is dead!`
                  );
                  newtoJww.roles.remove(alive.id);
                  newtoJww.roles.add(dead.id);
                }
              }
            } else if (role == "Avenger") {
              let newatag = db.get(`atag_${guy.id}`);
              if (newatag != null) {
                let newtoatag = message.guild.members.cache.find(
                  m => m.nickname === newatag
                );
                role = db.get(`role_${newtoatag.id}`);
                if (newtoatag.roles.cache.has(alive.id)) {
                  dayChat.send(
                    `<:avenge:744536638314774558> The Avenger avenged **${newtoatag.nickname} ${newtoatag.user.username} (${role})**!`
                  );
                  newtoatag.roles.remove(alive.id);
                  newtoatag.roles.add(dead.id);
                }
              }
            }
          }
        }
      }
    }

    let wwKill = args[0];
    if (wwKill != 0) {
      let doctorsww = message.guild.channels.cache
        .filter(c => c.name === "priv-doctor")
        .keyArray("id");
      for (let vv = 0; vv < doctorsww.length; vv++) {
        let protect = db.get(`heal_${doctorsww[vv]}`);
        if (protect == args[0]) {
          let guy = message.guild.members.cache.find(
            m => m.nickname === protect
          );
          if (guy.roles.cache.has(alive.id)) {
            wolfChat.send(
              `${alive} Player **${wwKill} ${guy.user.username}** could not be killed!`
            );
            wwKill = null;
            message.guild.channels.cache.get(doctorsww[vv]).send(`${alive}`);
            message.guild.channels.cache
              .get(doctorsww[vv])
              .send(
                "<:doctor_voting_protect:766979837473587211> Your protection saved **" +
                  protect +
                  " " +
                  guy.user.username +
                  "**!"
              );
          }
        }
      }
      if (wwKill != null) {
        let guy = message.guild.members.cache.find(m => m.nickname === wwKill);
        //bh protect
        let beasthunters = message.guild.channels.cache.filter(
          c => c.name === "priv-beast-hunter"
        );
        let bhs = beasthunters.keyArray("id");
        for (let j = 0; j < bhs.length; j++) {
          let bh = message.guild.channels.cache.get(bhs[j]);
          let protect = db.get(`setTrap_${bhs[j]}`);
          let active = db.get(`trapActive_${bhs[j]}`);
          if (protect == wwKill && active == true) {
            wwKill = null;
            db.set(`setTrap_${bhs[j]}`, null);
            db.set(`trapActive_${bhs[j]}`, false);
            let terminator = "uwu";
            for (
              let aishleen = 1;
              aishleen <= alive.members.size + dead.members.size;
              aishleen++
            ) {
              let thewwtokill = message.guild.members.cache.find(
                m => m.nickname === aishleen.toString()
              );
              let role = db.get(`role_${thewwtokill.id}`);
              if (role == "Junior Werewolf") {
                terminator = null;
                dayChat.send(
                  `<:trap:744535154927861761> The Beast Hunter's trap killed **${thewwtokill.nickname} ${thewwtokill.user.username} (${role})**!`
                );
                thewwtokill.roles.add(dead.id);
                thewwtokill.roles.remove(alive.id);
                let jwwtag = db.get(`jwwtag_${guy.id}`);
                if (jwwtag != null) {
                  let toJww = message.guild.members.cache.find(
                    m => m.nickname === jwwtag
                  );
                  let toRole = db.get(`role_${toJww.id}`);
                  if (toJww.roles.cache.has(alive.id)) {
                    dayChat.send(
                      `<:revenge:744572531889012756> The Junior Werewolf's death has been avenged! **${jwwtag} ${toJww.user.username} (${toRole})** is dead!`
                    );
                    toJww.roles.add(dead.id);
                    toJww.roles.remove(alive.id);
                    if (toRole == "Junior Werewolf" || toRole == "Avenger") {
                      while (
                        toRole == "Junior Werewolf" ||
                        toRole == "Avenger"
                      ) {
                        if (toRole == "Junior Werewolf") {
                          let newjww = db.get(`jwwtag_${toJww.id}`);
                          if (newjww != null) {
                            let newtoJww = message.guild.members.cache.find(
                              m => m.nickname === newjww
                            );
                            toRole = db.get(`role_${newtoJww.id}`);
                            if (newtoJww.roles.cache.has(alive.id)) {
                              dayChat.send(
                                `<:revenge:744572531889012756> The Junior Werewolf's death has been avenged! **${jwwtag} ${toJww.user.username} (${toRole})** is dead!`
                              );
                              newtoJww.roles.remove(alive.id);
                              newtoJww.roles.add(dead.id);
                            }
                          }
                        } else if (role == "Avenger") {
                          let newatag = db.get(`atag_${toJww.id}`);
                          if (newatag != null) {
                            let newtoatag = message.guild.members.cache.find(
                              m => m.nickname === newatag
                            );
                            toRole = db.get(`role_${newtoatag.id}`);
                            if (newtoatag.roles.cache.has(alive.id)) {
                              dayChat.send(
                                `<:avenge:744536638314774558> The Avenger avenged **${jwwtag} ${toJww.user.username} (${toRole})**!`
                              );
                              newtoatag.roles.remove(alive.id);
                              newtoatag.roles.add(dead.id);
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            if (terminator == "uwu") {
              for (
                let aishleen = 1;
                aishleen <= alive.members.size + dead.members.size;
                aishleen++
              ) {
                let thewwtokill = message.guild.members.cache.find(
                  m => m.nickname === aishleen.toString()
                );
                let role = db.get(`role_${thewwtokill.id}`);
                if (
                  role == "Werewolf" &&
                  thewwtokill.roles.cache.has(alive.id)
                ) {
                  dayChat.send(
                    `<:trap:744535154927861761> The Beast Hunter's trap killed **${thewwtokill.nickname} ${thewwtokill.user.username} (${role})**!`
                  );
                  thewwtokill.roles.add(dead.id);
                  thewwtokill.roles.remove(alive.id);
                  terminator = null;
                }
              }
            }
            if (terminator == "uwu") {
              for (
                let aishleen = 1;
                aishleen <= alive.members.size + dead.members.size;
                aishleen++
              ) {
                let thewwtokill = message.guild.members.cache.find(
                  m => m.nickname === aishleen.toString()
                );
                let role = db.get(`role_${thewwtokill.id}`);
                if (
                  role == "Nightmare Werewolf" &&
                  thewwtokill.roles.cache.has(alive.id)
                ) {
                  dayChat.send(
                    `<:trap:744535154927861761> The Beast Hunter's trap killed **${thewwtokill.nickname} ${thewwtokill.user.username} (${role})**!`
                  );
                  thewwtokill.roles.add(dead.id);
                  thewwtokill.roles.remove(alive.id);
                  terminator = null;
                }
              }
            }
            if (terminator == "uwu") {
              for (
                let aishleen = 1;
                aishleen <= alive.members.size + dead.members.size;
                aishleen++
              ) {
                let thewwtokill = message.guild.members.cache.find(
                  m => m.nickname === aishleen.toString()
                );
                let role = db.get(`role_${thewwtokill.id}`);
                if (
                  role == "Kitten Wolf" &&
                  thewwtokill.roles.cache.has(alive.id)
                ) {
                  dayChat.send(
                    `<:trap:744535154927861761> The Beast Hunter's trap killed **${thewwtokill.nickname} ${thewwtokill.user.username} (${role})**!`
                  );
                  thewwtokill.roles.add(dead.id);
                  thewwtokill.roles.remove(alive.id);
                  terminator = null;
                }
              }
            }
            if (terminator == "uwu") {
              for (
                let aishleen = 1;
                aishleen <= alive.members.size + dead.members.size;
                aishleen++
              ) {
                let thewwtokill = message.guild.members.cache.find(
                  m => m.nickname === aishleen.toString()
                );
                let role = db.get(`role_${thewwtokill.id}`);
                if (
                  role == "Wolf Shaman" &&
                  thewwtokill.roles.cache.has(alive.id)
                ) {
                  dayChat.send(
                    `<:trap:744535154927861761> The Beast Hunter's trap killed **${thewwtokill.nickname} ${thewwtokill.user.username} (${role})**!`
                  );
                  thewwtokill.roles.add(dead.id);
                  thewwtokill.roles.remove(alive.id);
                  terminator = null;
                }
              }
            }
            if (terminator == "uwu") {
              for (
                let aishleen = 1;
                aishleen <= alive.members.size + dead.members.size;
                aishleen++
              ) {
                let thewwtokill = message.guild.members.cache.find(
                  m => m.nickname === aishleen.toString()
                );
                let role = db.get(`role_${thewwtokill.id}`);
                if (
                  role == "Wolf Pacifist" &&
                  thewwtokill.roles.cache.has(alive.id)
                ) {
                  dayChat.send(
                    `<:trap:744535154927861761> The Beast Hunter's trap killed **${thewwtokill.nickname} ${thewwtokill.user.username} (${role})**!`
                  );
                  thewwtokill.roles.add(dead.id);
                  thewwtokill.roles.remove(alive.id);
                  terminator = null;
                }
              }
            }
            if (terminator == "uwu") {
              for (
                let aishleen = 1;
                aishleen <= alive.members.size + dead.members.size;
                aishleen++
              ) {
                let thewwtokill = message.guild.members.cache.find(
                  m => m.nickname === aishleen.toString()
                );
                let role = db.get(`role_${thewwtokill.id}`);
                if (
                  role == "Shadow Wolf" &&
                  thewwtokill.roles.cache.has(alive.id)
                ) {
                  dayChat.send(
                    `<:trap:744535154927861761> The Beast Hunter's trap killed **${thewwtokill.nickname} ${thewwtokill.user.username} (${role})**!`
                  );
                  thewwtokill.roles.add(dead.id);
                  thewwtokill.roles.remove(alive.id);
                  terminator = null;
                }
              }
            }
            if (terminator == "uwu") {
              for (
                let aishleen = 1;
                aishleen <= alive.members.size + dead.members.size;
                aishleen++
              ) {
                let thewwtokill = message.guild.members.cache.find(
                  m => m.nickname === aishleen.toString()
                );
                let role = db.get(`role_${thewwtokill.id}`);
                if (
                  role == "Guardian Wolf" &&
                  thewwtokill.roles.cache.has(alive.id)
                ) {
                  dayChat.send(
                    `<:trap:744535154927861761> The Beast Hunter's trap killed **${thewwtokill.nickname} ${thewwtokill.user.username} (${role})**!`
                  );
                  thewwtokill.roles.add(dead.id);
                  thewwtokill.roles.remove(alive.id);
                  terminator = null;
                }
              }
            }
            if (terminator == "uwu") {
              for (
                let aishleen = 1;
                aishleen <= alive.members.size + dead.members.size;
                aishleen++
              ) {
                let thewwtokill = message.guild.members.cache.find(
                  m => m.nickname === aishleen.toString()
                );
                let role = db.get(`role_${thewwtokill.id}`);
                if (
                  role == "Werewolf Berserk" &&
                  thewwtokill.roles.cache.has(alive.id)
                ) {
                  dayChat.send(
                    `<:trap:744535154927861761> The Beast Hunter's trap killed **${thewwtokill.nickname} ${thewwtokill.user.username} (${role})**!`
                  );
                  thewwtokill.roles.add(dead.id);
                  thewwtokill.roles.remove(alive.id);
                }
              }
            }
            if (terminator == "uwu") {
              for (
                let aishleen = 1;
                aishleen <= alive.members.size + dead.members.size;
                aishleen++
              ) {
                let thewwtokill = message.guild.members.cache.find(
                  m => m.nickname === aishleen.toString()
                );
                let role = db.get(`role_${thewwtokill.id}`);
                if (
                  role == "Alpha Werewolf" &&
                  thewwtokill.roles.cache.has(alive.id)
                ) {
                  dayChat.send(
                    `<:trap:744535154927861761> The Beast Hunter's trap killed **${thewwtokill.nickname} ${thewwtokill.user.username} (${role})**!`
                  );
                  thewwtokill.roles.add(dead.id);
                  thewwtokill.roles.remove(alive.id);
                  terminator = null;
                }
              }
            }
            if (terminator == "uwu") {
              for (
                let aishleen = 1;
                aishleen <= alive.members.size + dead.members.size;
                aishleen++
              ) {
                let thewwtokill = message.guild.members.cache.find(
                  m => m.nickname === aishleen.toString()
                );
                let role = db.get(`role_${thewwtokill.id}`);
                if (
                  role == "Wolf Seer" &&
                  thewwtokill.roles.cache.has(alive.id)
                ) {
                  dayChat.send(
                    `<:trap:744535154927861761> The Beast Hunter's trap killed **${thewwtokill.nickname} ${thewwtokill.user.username} (${role})**!`
                  );
                  thewwtokill.roles.add(dead.id);
                  thewwtokill.roles.remove(alive.id);
                  terminator = null;
                }
              }
            }
            if (terminator == null) {
              j = 99;
              wwKill = null;
            }
          }
        }
      }

      if (wwKill != null) {
        let guy = message.guild.members.cache.find(m => m.nickname === wwKill);
        //witch protect
        let witches = message.guild.channels.cache.filter(
          c => c.name === "priv-witch"
        );
        let witch = witches.keyArray("id");
        for (let j = 0; j < witch.length; j++) {
          let wc = message.guild.channels.cache.get(witch[j]);
          let protect = db.get(`potion_${witch[j]}`);
          if (protect == wwKill) {
            wolfChat.send(
              `${alive} Player **${wwKill} ${guy.user.username}** could not be killed!`
            );
            wc.send(`${alive}`);
            wc.send(
              `<:potion:744536604252700766> Your potion saved a life last night!`
            );
            wwKill = null;
            db.set(`potion_${witch[j]}`, null);
            j = 99;
          }
        }
      }

      if (wwKill != null) {
        let guy = message.guild.members.cache.find(m => m.nickname === wwKill);
        //bg protect
        let bodyguards = message.guild.channels.cache.filter(
          c => c.name === "priv-bodyguard"
        );
        let bgs = bodyguards.keyArray("id");
        for (let j = 0; j < bgs.length; j++) {
          let bg = message.guild.channels.cache.get(bgs[j]);
          let protect = db.get(`guard_${bgs[j]}`);
          let lives = db.get(`lives_${bgs[j]}`);
          if (protect == wwKill || db.get(`role_${guy.id}`) == "Bodyguard") {
            if (lives == 2) {
              j = 99;
              wolfChat.send(
                `${alive} Player **${wwKill} ${guy.user.username}** could not be killed!`
              );
              bg.send(`${alive}`);
              bg.send(
                `<:guard:744536167109886023> You fought off an attack last night and survived. Next time you are attacked you will die.`
              );
              wwKill = null;
              db.subtract(`lives_${bgs[j]}`, 1);
            } else if (lives == 1) {
              j = 99;
              wwKill = null;
              db.set(`guard_${bgs[j]}`, null);
              if (protect == wwKill) {
                for (
                  let k = 1;
                  k <= alive.members.size + dead.members.size;
                  k++
                ) {
                  let uwu = message.guild.members.cache.find(
                    m => m.nickname === k.toString()
                  );
                  if (
                    bg
                      .permissionsFor(uwu)
                      .has([
                        "SEND_MESSAGES",
                        "VIEW_CHANNEL",
                        "READ_MESSAGE_HISTORY"
                      ])
                  ) {
                    k = 100;
                    guy = uwu;
                  }
                }
              }
              dayChat.send(
                `The Werewolves killed **${guy.nickname} ${
                  guy.user.username
                } (${db.get(`role_${guy.id}`)})**!`
              );
              guy.roles.add(dead.id);
              guy.roles.remove(alive.id);
            }
          }
        }
      }
    }

    let mediums = message.guild.members.cache
      .filter(c => c.name === "priv-medium")
      .keyArray("id");
    for (let gg = 0; gg < mediums.length; gg++) {
      let revive = db.get(`revive_${mediums[gg]}`);
      if (revive != null) {
        let undead = message.guild.members.cache.find(
          m => m.nickname === revive
        );
        if (undead.roles.cache.has(dead.id)) {
          dayChat.send(
            `<:medium_revived:767251278266761237> The Medium revived **${undead.nickname} ${undead.user.username}**!`
          );
          db.set(`med_${mediums[gg]}`, "yes");
          db.set(`revive_${mediums[gg]}`, null);
        }
      }
    }

    if (wwKill != null && wwKill != '0') {
      let guy = message.guild.members.cache.find(m => m.nickname === wwKill);
      let role = db.get(`role_${guy.id}`);
      dayChat.send(
        `The Werewolf killed **${wwKill} ${guy.user.username} (${role})**!`
      );
      guy.roles.add(dead.id);
      guy.roles.remove(alive.id);
    }

    dayChat.send(`Day ${dayCount + 1} has started. Get ready to discuss!`);
    dayChat.send(`${alive}`);

    dayChat.updateOverwrite(alive.id, {
      SEND_MESSAGES: true
    });

    let beasthunters = message.guild.channels.cache.filter(
      c => c.name === "priv-beast-hunter"
    );
    let bhs = beasthunters.keyArray("id");
    for (let j = 0; j < bhs.length; j++) {
      db.set(`trapActive_${bhs[j]}`, true);
    }

    let mdoctor = message.guild.channels.cache.filter(
      c => c.name === "priv-doctor"
    );
    let doc = mdoctor.keyArray("id");
    for (let j = 0; j < doc.length; j++) {
      db.set(`heal_${doc[j]}`, null);
    }

    let witches = message.guild.channels.cache.filter(
      c => c.name === "priv-witch"
    );
    let witch = beasthunters.keyArray("id");
    for (let j = 0; j < bhs.length; j++) {
      db.set(`potion_${witch[j]}`, null);
    }

    let bodyguards = message.guild.channels.cache.filter(
      c => c.name === "priv-bodyguard"
    );
    let bgs = bodyguards.keyArray("id");
    for (let j = 0; j < bhs.length; j++) {
      db.set(`guard_${bgs[j]}`, null);
    }

    let grumpies = message.guild.channels.cache.filter(
      c => c.name === "priv-grumpy-grandma"
    );
    let ggs = grumpies.keyArray("id");
    for (let o = 0; o < ggs.length; o++) {
      let mute = db.get(`mute_${ggs[o]}`);
      let guy = message.guild.members.cache.find(m => m.nickname === mute);
      if (guy.roles.cache.has(alive.id)) {
        dayChat.send(
          "<:ggmute:766684344647417936> The Grumpy Grandma muted **" +
            guy.nickname +
            " " +
            guy.user.username +
            "**!"
        );
        dayChat.updateOverwrite(guy.id, {
          SEND_MESSAGES: false
        });
      }
    }

    db.set(`isDay_${message.guild.id}`, "yes");
    db.set(`isNight_${message.guild.id}`, "no");
    db.add(`dayCount_${message.guild.id}`, 1);
  }
};
