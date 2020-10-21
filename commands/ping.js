module.exports = {
  name: "ping",
  description: "Replies with bot ping.",
  aliases: ["heartbeat", "response"],
  cooldown: 15,
  show: true,
  run: async (message, args) => {
    message.channel.send(`Pong! ${Math.ceil(message.client.ping)} ms.`);
  }
};
