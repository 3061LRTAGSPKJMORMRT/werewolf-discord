const db = require("quick.db");

module.exports = {
  name: "revive",
  aliases: ["rev", "resurrect"],
  run: async (message, args, client) => {
    if (message.channel.name == "priv-medium") {
      let t;
      let abil = await db.get(`med_${message.channel.id}`);
      if (abil == "yes") {
        return (t = message.channel
          .send(
            "Yes. You want unlimited revives. Let me see if i can hack that..."
          )
          .then(msg => {
            setTimeout(function() {
              msg.edit(
                "Auhh, I don't have the unlimited revive bug like in the app dummy. Now shut up sike."
              );
            }, 5000);
          }));
      }
      if (!args)
        return await message.reply(
          "Yes. Very smart. Reviving no one. Well if you wanted to be a moron, well, Congratulations."
        );
      let guy = message.guild.members.cache.find(m => m.nickname === args[0]);
      let ownself = message.guild.members.cache.find(
        m => m.nickname === message.member.nickname
      );
      if (!guy)
        return await message.channel.send(
          `**${message.author.username}**: Hmmm, lets search a player that doesn't exist.\n**Bot**: YAAAAAAAAAAAAAAWWWWWWWWWWWWWWWWWWWWWWWNNNNNNNNNNNNNNNNNNN.\n**${message.author.username}**: What?\n**Bot**: Oh i said YAWN cause that plan puts me to sleep.\n**${message.author.username}**: But i wasn't trying to be funny\n**Bot**: Oh well, Congratulations.`
        );
      if (guy == ownself)
        return await message.channel.send(
          `**${message.author.username}**: Should I revive myself?\n**Bot**: Sure, why not`
        );
      if (
        !guy.roles.cache.has("606131202814115882") ||
        !ownself.roles.cache.has("606140092213624859")
      )
        return await message.channel.send(
          "Hmm reviving an alive player or reviving while dead, HEY THAT'S A GREAT IDEA! Now let's just...... SIKE you can't do this..."
        );
      let night = await db.fetch(`isNight_${message.guild.id}`)
      if (night != "yes") return await message.channel.send("SuRe LeT'S rEvIvE iN tHe MoRninG.") 
      db.set(`revive_${message.channel.id}`, args[0])
      message.react('767252118788243456')
    }
  }
};
