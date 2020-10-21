const db = require("quick.db");

module.exports = {
  name: "reset",
  run: async (message, args, client) => {
    if (message.author.id == "552814709963751425") {
      let times = [10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000];
      times = times[Math.floor(Math.random() * times.length)];
      let gunner = message.guild.channels.cache.filter(c => c.name === "priv-gunner").keyArray("id") // gunner
      let grumpy = message.guild.channels.cache.filter(c => c.name === "priv-grumpy-grandma").keyArray("id") // gg
      let seer = message.guild.channels.cache.filter(c => c.name === "priv-seer").keyArray("id") // seer
      let aura = message.guild.channels.cache.filter(c => c.name === "priv-aura-seer").keyArray("id") // aura
      let doctor = message.guild.channels.cache.filter(c => c.name === "priv-doctor").keyArray("id") // doc
      let beasthunter = message.guild.channels.cache.filter(c => c.name === "priv-beast-hunter").keyArray("id") // bh
      let witch = message.guild.channels.cache.filter(c => c.name === "priv-witch").keyArray("id") // witch
      let bodyguard = message.guild.channels.cache.filter(c => c.name === "priv-bodyguard").keyArray("id") // bg
      let det = message.guild.channels.cache.filter(c => c.name === "priv-detective").keyArray("id") // det
      let priest = message.guild.channels.cache.filter(c => c.name === "priv-priest").keyArray("id") // priest
      let paci = message.guild.channels.cache.filter(c => c.name === "priv-pacifist").keyArray("id") // paci
      let flower = message.guild.channels.cache.filter(c => c.name === "priv-flower-child").keyArray("id") // fc
      let guardian = message.guild.channels.cache.filter(c => c.name === "priv-guardian-wolf").keyArray("id") // gww
      let wwpaci = message.guild.channels.cache.filter(c => c.name === "priv-wolf-pacifist").keyArray("id") // wwp
      let wwseer = message.guild.channels.cache.filter(c => c.name === "priv-wolf-seer").keyArray("id") // wws
      let skiller = message.guild.channels.cache.filter(c => c.name === "priv-serial-killer").keyArray("id") // sk
      let arsonist = message.guild.channels.cache.filter(c => c.name === "priv-arsonist").keyArray("id") // arso
      let bomb = message.guild.channels.cache.filter(c => c.name === "priv-bomber").keyArray("id") // bomber
      let secthunter = message.guild.channels.cache.filter(c => c.name === "priv-sect-hunter").keyArray("id") // sect hunter
      let sorcerer = message.guild.channels.cache.filter(c => c.name === "priv-sorcerer").keyArray("id") // sorcerer
      let wwshaman = message.guild.channels.cache.filter(c => c.name === "priv-wolf-shaman").keyArray("id") // wwshaman
      
      for (let i = 0; i < gunner.length ; i++) {
        db.set(`bullets_${gunner[i]}`, 2)
        db.set(`did_${gunner[i]}`,  555)
      }
      
      for (let i = 0; i < grumpy.length ; i++) {
        db.set(`mute_${grumpy[i]}`, null)
      }
      
      for (let i = 0; i < seer.length ; i++) {
        db.set(`seer_${seer[i]}`, "no")
      }
      
      for (let i = 0; i < aura.length ; i++) {
        db.set(`auraCheck_${aura[i]}`, "no")
      }
      
      for (let i = 0; i < doctor.length ; i++) {
        db.set(`heal_${doctor[i]}`, null)
      }
      
      for (let i = 0; i < beasthunter.length; i++) {
        db.set(`setTrap_${message.channel.id}`, null) 
        db.set(`trapActive_${message.channel.id}`, false) 
      }
      
      for (let i = 0; i < witch.length ; i++) {
        db.set(`potion_${witch[i]}`, null)
        db.set(`witch_${witch[i]}`, 0)
        db.set(`witchAbil_${witch[i]}`, 0)
      }
      
      for (let i = 0; i < bodyguard.length; i++) {
        db.set(`guard_${bodyguard[i]}`, null)
        db.set(`lives_${bodyguard[i]}`, 2)
      }
      
      for (let i = 0 ; i < det.length ; i++) {
        db.set(`detCheck_${det[i]}`, null)
      }
      
      for (let i = 0 ; i < priest.length; i++) {
        db.set(`priest_${priest[i]}`, null)
      }
      
      for (let i = 0; i < paci.length ; i++) {
        db.set(`paci_${paci[i]}`, "no")
      }
      
      for (let i = 0; i < flower.length; i++) {
        db.set(`protest_${flower[i]}`, "no")
      }
      
      for (let i = 0; i < guardian.length; i++) {
        db.set(`protest_${guardian[i]}`, "no")
      }
      
      for (let i = 0 ; i < wwpaci.length ; i++) {
        db.set(`paci_${wwpaci[i]}`, "no")
      }
      
      for (let i = 0 ; i < wwseer.length ; i++) {
        db.set(`wwseer_${wwseer[i]}`, "no")
      }
      
      for (let i = 0 ; i < skiller.length ; i++) {
        db.set(`stab_${skiller[i]}`, null)
      }
      
      for (let i = 0; i < arsonist ; i++) {
        db.set(`doused_${arsonist[i]}`, ["1"])
      }
      
      for (let i = 0; i < bomb ; i++) {
        db.set(`bomb_${bomb[i]}`, null)
        db.set(`didCmd_${bomb[i]}`, -1)
      }
      
      for (let i = 0 ; i < secthunter.length ; i++) {
        db.set(`hunt_${message.channel.id}`, null)
      }
      
      for (let i = 0 ; i < sorcerer.length ; i++) {
        db.set(`sorcerer_${sorcerer[i]}`, "no")
      }
      
      for (let i = 0 ; i < wwshaman.length ; i++) {
        db.set(`shaman_${wwshaman[i]}`, null)
      }
      
      message.channel
        .send(
          "Iniating to reset database. Please allow 15 seconds to 1 minute of your time to allow this process to execute."
        )
        .then(msg => {
          setTimeout(function() {
            msg.edit("Database has successfully reset. Happy hunting 🐺");
          }, times);
        });
    }
  }
};
