const { MessageEmbed, Message, Client } = require("discord.js");
module.exports = {
  name: "oto-sil",
  aliases: [],
  permission: ["MANAGE_MESSAGES"],
  cooldown: 1000,
  adminOnly: false,
  /**
   *
   * @param {Message} message
   * @param {Client} client
   * @param {String[]} args
   */
  run: async (message, client, args) => {
    if (args[0] === "aç") {
      client.msgsil.add(`${message.channel.id}`);
      message.channel.send({
        content: "Başarıyla açıldı",
      });
    } else if (args[0] === "kapat") {
      client.msgsil.delete(`${message.channel.id}`);
      message.channel.send({ content: "Başarıyla kapatıldı" });
    }
  },
};
