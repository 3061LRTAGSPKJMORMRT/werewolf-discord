const db = require("quick.db");

module.exports = {
  name: "joingame",
  run: async (message, args, client) => {
    if (
      args[0] == "started" &&
      (message.member.roles.cache.has("606139219395608603") ||
        message.member.roles.cache.has("606276949689499648"))
    ) {
      db.set("started", "yes");
      message.react("👍");
    } else if (
      args[0] == "ended" &&
      (message.member.roles.cache.has("606139219395608603") ||
        message.member.roles.cache.has("606276949689499648"))
    ) {
      db.set("started", "no");
      message.react("👍");
    } else {
      if (db.get("started") == "yes")
        return await message.reply("Game has started!");
      let alive = message.guild.roles.cache.find(r => r.name === "Alive");

      message.member.roles.add(alive.id);
      await message.member.setNickname((alive.members.size + 1).toString());
      let mininarr = message.guild.roles.cache.find(
        r => r.name === "Narrator Trainee"
      );
      let narrator = message.guild.roles.cache.find(r => r.name === "Narrator");
      let spec = message.guild.roles.cache.find(r => r.name === "Spectator");

      if (message.member.roles.cache.has(mininarr.id))
        message.member.roles.remove(mininarr.id);
      if (message.member.roles.cache.has(narrator.id))
        message.member.roles.remove(narrator.id);
      if (message.member.roles.cache.has(spec.id))
        message.member.roles.remove(spec.id);
    }
  }
};
