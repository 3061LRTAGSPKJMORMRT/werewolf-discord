const db = require("quick.db");

module.exports = {
  name: "eat",
  run: async (message, args, client) => {
    if (message.channel.name == "priv-cannibal") {
      let hunger = await db.fetch(`hunger_${message.channel.id}`);
      console.log(hunger)
      let alive = message.guild.roles.cache.find(r => r.name === "Alive");
      let ownself = message.guild.members.cache.find(
        m => m.nickname === message.member.nickname
      );
      if (!ownself.roles.has(alive.id))
        return await message.channel.send(
          "Eating when deas is impossible. Since you asked, let me give you the full theory of eating while dead. A recurrent symbolic theme in the north Indian mortuary rites is that of eating not only on behalf of the deceased, but also some aspect of the deceased himself. His own ghost, the chief mourner, the impure Funeral Priests and the pure Brahmans are all successively represented as consuming his substance. Why? Digestion is thought to distil the good and nourishing part of food from the bad waste products; and it is employed as a metaphor in a wide range of cultural contexts. It is argued that by ingesting and digesting the deceased his impure sins are eliminated, while his pure essence is distilled and translated by the 'digestive fire' of the stomach to the stomach to the other world-as the corpse is transmitted vy the fire of cremation and offerings to the gods by the sacrificial fire. As sexual fluid is distilled out of the good part of food, so this purified ancestral essence becomes the source of progeny. The digestive process thus provides a way of conceptualising and getting a purchase on more abstract ideas about the proper processes of circulation and transformation which maintain the cosmic and social orders. Improper circulation is expressed in the language of digestive malfunction. "
        );
      if (hunger == null) {
        db.set(`hunger_${message.channel.id}`, 1);
        hunger = 1;
      }
      if (!args[0])
        return await message.channel.send(
          "Hey moron, try adding an argument first. "
        );
      let toEat = [];
      function eat(a) {
        if (args.length == a) {
          if (hunger < a)
            return message.channel.send(
              "Eating more than you can will slowly kill you. Here's a hint: +suicide"
            );
          for (let i = 0; i < args.length; i++) {
            let guy = message.guild.members.cache.find(m => m.nickname === args[i]);
            if (!guy)
              return message.channel.send(`Invalid Target at ${args[i]}!`);
            if (!guy.roles.has(alive.id))
              return message.channel.send(
                "It doesn't work for dead player idiot."
              );
            toEat.push(args[i]);
          }
        }
      }
      eat(1);
      eat(2);
      eat(3);
      eat(4);
      eat(5);
      db.set(`toEat_${message.channel.id}`, toEat);
    }
  }
};
