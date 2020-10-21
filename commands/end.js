module.exports = {
  name: "end",
  run: async (message, args, client) => {
    if (message.guild.id == "472261911526768642") {
      console.log("5");
      if (message.member.hasPermission("KICK_MEMBERS")) {
        console.log("50");
        let chan = message.guild.channels.cache.filter(c =>
          c.name.startsWith("priv")
        );
        //console.log(chan)
        let chann = chan.keyArray("id");
        console.log(chann);
        console.log("51");
        for (let i = 0; i < chann.length; i++) {
          let channe = message.guild.channels.cache.find(c => c.id === chann[i]);
          
          channe.messages.fetch()
  .then(messages => messages.filter(m => !m.pinned).bulkDelete(messages.size))
  .catch(console.error);
        }
        console.log("52");
      }
    }
  }
};
