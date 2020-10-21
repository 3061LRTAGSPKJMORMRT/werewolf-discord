const shuffle = require("shuffle-array");
const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "srole",
  run: async (message, args, client) => {
    let alive = message.guild.roles.cache.find(r => r.name === "Alive");
    let mininarr = message.guild.roles.cache.find(
      r => r.name === "Narrator Trainee"
    );
    let narrator = message.guild.roles.cache.find(r => r.name === "Narrator");
    let wwsChat = message.guild.channels.cache.find(
      c => c.name === "werewolves-chat"
    );
    let dayChat = message.guild.channels.cache.find(c => c.name === "day-chat");
    let gamlobi = message.guild.channels.cache.find(
      c => c.name === "game-lobby"
    );
    let sib = message.guild.channels.cache.find(c => c.name === "sibling-chat")
    
    let bandits = message.guild.channels.cache.find(c => c.name === "bandits")
    
    let zomb = message.guild.channels.cache.find(c => c.name === "zombies")
    
    
    if (
      !message.member.roles.cache.has(mininarr.id) &&
      !message.member.roles.cache.has(narrator.id)
    )
      return;

    if (args[0] == "quick") {
    } else if (args[0] == "sandbox") {
    } else if (args[0] == "ranked") {
    } else if (args[0] == "custom") {
      for (let i = 1; i < args.length; i++) {
        let ch = message.guild.channels.cache.find(
          c => c.name === `priv-${args[i]}`
        );
        if (!ch)
          return message.channel.send(
            "I couldn't find the channel / role " + args[i]
          );
      }

      for (let i = 1; i <= alive.members.size; i++) {
        let guy = message.guild.members.cache.find(
          m => m.nickname === i.toString()
        );
        
        if (!guy)
          return message.channel.send(
            "I couldn't find the player that has the nickname of " +
              i.toString()
          );
      }

      if (args.length - 1 != alive.members.size)
        return message.channel.send(
          "The number of players does not match to the number of roles given"
        );
      let uwu = []
      for (let abc = 1; abc < args.length; abc++) {
        uwu.push(args[abc])
      }
      
      shuffle(uwu)
      
      for (let i = 0; i < args.length - 1; i++) {
        let kk = message.guild.channels.cache
          .filter(c => c.name === `priv-${uwu[i]}`)
          .keyArray("id");
        let mm = message.guild.channels.cache.get(kk[i]);
        let guy;
        for (let y = 0; y < kk.length; y++) {
          for (let o = 1; o < alive.members.size; o++) {
            guy = message.guild.members.cache.find(
              m => m.nickname === o.toString()
            );
            if (
              mm
                .permissionsFor(guy)
                .has(["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"])
            ) {
              mm = message.guild.channels.cache.find(c => c.id === kk[y + 1]);
            }
          }
        }
        mm.updateOverwrite(guy.id, {
          SEND_MESSAGES: true,
          READ_MESSAGE_HISTORY: true,
          VIEW_CHANNEL: true
        });
        if (mm.name.includes("wolf")) {
          wwsChat.updateOverwrite(guy.id, {
            SEND_MESSAGES: true,
            READ_MESSAGE_HISTORY: true,
            VIEW_CHANNEL: true
          });
        }
        if (mm.name.includes("sibling")) {
          sib.updateOverwrite(guy.id, {
            SEND_MESSAGES: true,
            READ_MESSAGE_HISTORY: true,
            VIEW_CHANNEL: true
          });
        }
        if (mm.name.includes("bandit")) {
          bandits.updateOverwrite(guy.id, {
            SEND_MESSAGES: true,
            READ_MESSAGE_HISTORY: true,
            VIEW_CHANNEL: true
          });
        }
        if (mm.name.includes("zombie")) {
          zomb.updateOverwrite(guy.id, {
            SEND_MESSAGES: true,
            READ_MESSAGE_HISTORY: true,
            VIEW_CHANNEL: true
          });
        }
      }
    }
  }
};
