const db = require("quick.db");
const Discord = require("discord.js");

module.exports = {
  name: "check",
  run: async (message, args, client) => {
    let shaman1 = await db.fetch(`shaman_606157077705916426`);
    let shaman2 = await db.fetch(`shaman_606156636704473098`);
    let shaman3 = await db.fetch(`shaman_606157075927662741`);
    let shaman4 = await db.fetch(`shaman_606157077315846146`);

    let alive = message.guild.roles.cache.find(r => r.name === "Alive");
    let dead = message.guild.roles.cache.find(r => r.name === "Dead");
    if (message.channel.name == "priv-aura-seer") {
      if (args[0] == message.member.nickname) {
        return await message.reply("You cannot check yourself!");
      } else if (
        parseInt(args[0]) >
          parseInt(alive.members.size) + parseInt(dead.members.size) ||
        parseInt(args[0]) < 1
      ) {
        return await message.reply("Invalid target!");
      }
      let guy = message.guild.members.cache.find(m => m.nickname === args[0]);
      let ownself = message.guild.members.cache.find(
        m => m.nickname === message.member.nickname
      );
      if (
        !guy.roles.cache.has("606140092213624859") ||
        !ownself.roles.cache.has("606140092213624859")
      ) {
        return await message.reply("Your or your target is not alive");
      } else {
        let ability = await db.fetch(`auraCheck_${message.channel.id}`);
        if (ability == "yes") {
          return await message.reply(
            `You have already used your ability for tonight!`
          );
        } else {
          let aura;
          let role = await db.fetch(`role_${guy.id}`);
          aura == "Unknown"
          if (
            role == "Villager" ||
            role == "Forger" ||
            role == "Loudmouth" ||
            role == "Santa Claus" ||
            role == "Doctor" ||
            role == "Bodyguard" ||
            role == "Tough Guy" ||
            role == "Red Lady" ||
            role == "Priest" ||
            role == "Seer" ||
            role == "Aura Seer" ||
            role == "Spirit Seer" ||
            role == "Seer Apprentice" ||
            role == "Detective" ||
            role == "Sheriff" ||
            role == "Mayor" ||
            role == "Avenger" ||
            role == "Pacifist" ||
            role == "Flower Child" ||
            role == "Grumpy Grandma" ||
            role == "Cupid" ||
            role == "President" ||
            role == "Cursed" ||
            role == "Loudmouth" ||
            role == "Wise Man" ||
            role == "Sibling" ||
            role == "Idiot" ||
            role == "Handsome Prince" ||
            role == "Drunk" ||
            role == "Doppelganger"
          ) {
            aura = "Good"
          } else if (
            role == "Werewolf" ||
            role == "Lone Wolf" ||
            role == "Junior Werewolf" ||
            role == "Wolf Pacifist" ||
            role == "Wolf Shaman" ||
            role == "Wolf Seer" ||
            role == "Shadow Wolf" ||
            role == "Wolf Pacifist" ||
            role == "Nightmare Werewolf" ||
            role == "Werewolf Berserk" ||
            role == "Kitten Wolf" ||
            role == "Guardian Wolf" ||
            role == "Sorcerer"
          ) {
            aura = "Evil"
          } 
          if (
            shaman1 == args[0] ||
            shaman2 == args[0] ||
            shaman3 == args[0] ||
            shaman4 == args[0]
          )
            aura = "Evil";
          db.set(`auraCheck_${message.channel.id}`, "yes");
          message.channel.send(
            `You checked **${args[0]} ${guy.user.username} (${aura})**`
          );
        }
      }
    } else if (message.channel.name == "priv-seer") {
      let guy = message.guild.members.cache.find(m => m.nickname === args[0]);
      let ownself = message.guild.members.cache.find(
        m => m.nickname === message.member.nickname
      );
      if (!guy || guy == ownself) return await message.reply("Invalid Target");
      if (
        !guy.roles.cache.has("606140092213624859") ||
        !ownself.roles.cache.has("606140092213624859")
      )
        return await message.channel.send("You or your target is not alive!");
      let checked = await db.fetch(`seer_${message.channel.id}`);
      if (checked == "yes")
        return await message.channel.send(
          "You already used your ability for tonight!"
        );
      let role = await db.fetch(`role_${guy.id}`);
      if (
        shaman1 == args[0] ||
        shaman2 == args[0] ||
        shaman3 == args[0] ||
        shaman4 == args[0]
      )
        role = "Wolf Shaman";
      message.channel.send(
        `You checked **${args[0]} ${guy.user.username} (${role})**!`
      );
      db.set(`seer_${message.channel.id}`, "yes");
    } else if (message.channel.name == "priv-detective") {
      if (args.length != 2)
        return await message.channel.send(
          "Honey, as Detective you need to select 2 players. This won't work. Come back to me when you have learned the basics."
        );
      let guy1 = message.guild.members.cache.find(m => m.nickname === args[0]);
      let guy2 = message.guild.members.cache.find(m => m.nickname === args[1]);
      let ownself = message.guild.members.cache.find(
        m => m.nickname === message.member.nickname
      );
      if (!guy1 || !guy2 || guy1 == ownself || guy2 == ownself || guy1 == guy2)
        return await message.reply("Invalid Target");
      if (
        !guy1.roles.cache.has("606140092213624859") ||
        !guy2.roles.cache.has("606140092213624859") ||
        !ownself.roles.cache.has("606140092213624859")
      )
        return await message.channel.send(
          "Yeah sure. Checking a dead player or checking while being dead. 1000000iq. Very smart. If you are smart, you can figure your information by yourself."
        );
      let ability = await db.fetch(`detCheck_${message.channel.id}`);
      if (ability == "yes")
        return await message.reply(
          `You have already used your ability for tonight!`
        );

      let role1 = await db.fetch(`role_${guy1.id}`);
      let role2 = await db.fetch(`role_${guy2.id}`);
      let team1;
      let team2;
      if (
        role1 == "Villager" ||
        role1 == "Doctor" ||
        role1 == "Bodyguard" ||
        role1 == "Tough Guy" ||
        role1 == "Red Lady" ||
        role1 == "Gunner" ||
        role1 == "Jailer" ||
        role1 == "Priest" ||
        role1 == "Marksman" ||
        role1 == "Seer" ||
        role1 == "Aura Seer" ||
        role1 == "Spirit Seer" ||
        role1 == "Seer Apprentice" ||
        role1 == "Detective" ||
        role1 == "Medium" ||
        role1 == "Mayor" ||
        role1 == "Witch" ||
        role1 == "Avenger" ||
        role1 == "Beast Hunter" ||
        role1 == "Pacifist" ||
        role1 == "Grumpy Grandma" ||
        role1 == "Cupid" ||
        role1 == "President" ||
        role1 == "Cursed" ||
        role1 == "Loudmouth" ||
        role1 == "Flower Child" ||
        role1 == "Sheriff" ||
        role1 == "Fortune Teller" ||
        role1 == "Forger"
      ) {
        team1 = "Village";
      } else if (
        role1 == "Werewolf" ||
        role1 == "Junior Werewolf" ||
        role1 == "Wolf Pacifist" ||
        role1 == "Shadow Wolf" ||
        role1 == "Wolf Seer" ||
        role1 == "Kitten Wolf" ||
        role1 == "Wolf Shaman" ||
        role1 == "Alpha Werewolf" ||
        role1 == "Werewolf Berserk" ||
        role1 == "Nightmare Werewolf" ||
        role1 == "Guardian Wolf" ||
        role1 == "Kitten Wolf" ||
        role1 == "Sorcerer"
      ) {
        team1 = "Werewolf";
      } else {
        team1 = "Solo";
      }

      if (
        role2 == "Villager" ||
        role2 == "Doctor" ||
        role2 == "Bodyguard" ||
        role2 == "Tough Guy" ||
        role2 == "Red Lady" ||
        role2 == "Gunner" ||
        role2 == "Jailer" ||
        role2 == "Priest" ||
        role2 == "Marksman" ||
        role2 == "Seer" ||
        role2 == "Aura Seer" ||
        role2 == "Spirit Seer" ||
        role2 == "Seer Apprentice" ||
        role2 == "Detective" ||
        role2 == "Medium" ||
        role2 == "Mayor" ||
        role2 == "Witch" ||
        role2 == "Avenger" ||
        role2 == "Beast Hunter" ||
        role2 == "Pacifist" ||
        role2 == "Grumpy Grandma" ||
        role2 == "Cupid" ||
        role2 == "President" ||
        role2 == "Cursed" ||
        role2 == "Loudmouth" ||
        role2 == "Flower Child" ||
        role2 == "Sheriff" ||
        role2 == "Fortune Teller" ||
        role2 == "Forger"
      ) {
        team2 = "Village";
      } else if (
        role2 == "Werewolf" ||
        role2 == "Junior Werewolf" ||
        role2 == "Wolf Pacifist" ||
        role2 == "Wolf Seer" ||
        role2 == "Kitten Wolf" ||
        role2 == "Wolf Shaman" ||
        role2 == "Shadow Wolf" ||
        role2 == "Alpha Werewolf" ||
        role2 == "Werewolf Berserk" ||
        role2 == "Nightmare Werewolf" ||
        role2 == "Guardian Wolf" ||
        role2 == "Kitten Wolf" ||
        role2 == "Sorcerer"
      ) {
        team2 = "Werewolf";
      } else {
        team2 = "Solo";
      }
      if (
        shaman1 == args[0] ||
        shaman2 == args[0] ||
        shaman3 == args[0] ||
        shaman4 == args[0]
      ) {
        team1 = "Werewolf";
      }
      if (
        shaman1 == args[1] ||
        shaman2 == args[1] ||
        shaman3 == args[1] ||
        shaman4 == args[1]
      ) {
        team2 = "Werewolf";
      }
      let result = "";
      if (team1 == "Solo" || team2 == "Solo") {
        result = "different teams";
      } else {
        if (team1 == team2) {
          result = "the same team";
        } else if (team1 != team2) {
          result = "different teams";
        }
      }
      message.channel.send(
        `**${args[0]} ${guy1.user.usename}** and **${args[1]} ${
          guy2.user.username
        }** have ${result}!`
      );
      db.set(`detCheck_${message.channel.id}`, "yes");
    } else if (message.channel.name == "priv-wolf-seer") {
      let dead = message.guild.roles.cache.find(r => r.name === "Dead");
      let alive = message.guild.roles.cache.find(r => r.name === "Alive");
      let guy = message.guild.members.cache.find(m => m.nickname === args[0]);
      let ability = await db.fetch(`wwseer_${message.channel.id}`);
      if (ability == "yes")
        return await message.channel.send(
          "Yup, cheating to win. That's the norm these days rite?"
        );
      if (message.member.roles.cache.has(dead.id))
        return await message.channel.send(
          "Yes. Checking while dead. Dude, you can't even tell the wolves your check."
        );
      if (message.member == guy || !guy)
        return await message.channel.send("Invalid Target");
      if (guy.roles.cache.has(dead.id))
        return await message.channel.send(
          "Sure, why not? Checking a dead player. You can become the best pro player."
        );
      let role = await db.fetch(`role_${guy.id}`);
      let roles = role.toLowerCase();
      if (roles.includes("wolf") || role == "Sorcerer")
        return await message.channel.send(
          "Ah yes. Checking a teammate. Gamethrowing is the best option mate."
        );
      let ye = "no";
      for (let i = 1; i <= alive.members.size + dead.members.size; i++) {
        console.log(i);
        let tt = message.guild.members.cache.find(
          m => m.nickname === message.member.nickname
        );
        let h = message.guild.members.cache.find(m => m.nickname === i.toString());
        if (h.roles.cache.has(alive.id)) {
          let rolet = await db.fetch(`role_${h.id}`);
          console.log(rolet);
          let roleh = rolet.toLowerCase();
          console.log(roleh);
          console.log(roleh.includes("wolf") && h != tt);
          if (roleh.includes("wolf") && h != tt) {
            ye = "yes";
          }
        }
      }
      if (ye != "yes")
        return await message.channel.send(
          "You probably forgot that you are the last wolf alive smartass"
        );
      let wwchat = message.guild.channels.cache.find(
        c => c.name == "werewolves-chat"
      );
      message.channel.send(
        `You checked **${args[0]} ${guy.user.username} (${role})**!`
      );
      wwchat.send(
        `The Wolf Seer checked **${args[0]} ${guy.user.username} (${role})**!`
      );
      db.set(`wwseer_${message.channel.id}`, "yes");
    } else if (message.channel.name == "priv-sorcerer") {
      let ability = await db.fetch(`sorcerer_${message.channel.id}`);
      let isNight = await db.fetch(`isNight_${message.guild.id}`);
      let ownself = message.guild.members.cache.find(
        m => m.nickname === message.member.nickname
      );
      let guy = message.guild.members.cache.find(m => m.nickname === args[0]);
      if (!guy || guy == ownself)
        return await message.channel.send("Invalid Target!");
      if (!guy.roles.cache.has(alive.id) || !ownself.roles.cache.has(alive.id))
        return await message.channel.send("Bruh, I rather you gamethrow");
      if (!isNight == "yes")
        return await message.channel.send(
          "Hmm, i think you should be a bot. You will 100% not fail this job. ||Not||"
        );
      if (!ability == "no")
        return await message.channel.send("Yes, why not check every time... ");
      let rol = await db.fetch(`role_${guy.id}`);
      let role = rol.toLowerCase();
      if (role.includes("wolf"))
        return await message.channel.send(
          "I know you are a type of seer, but stop checking your teammates dumb."
        );
      message.channel.send(
        "You checked **" +
          args[0] +
          " " +
          guy.user.username +
          " (" +
          role +
          ")**! "
      );
      db.set(`sorcerer_${message.channel.id}`);
    }
  }
};
