const { MessageButton, MessageEmbed } = require("discord.js");
const { Database } = require("nukleon");
const db = new Database("db/boostlog.json");

module.exports = {
  name: "boost-log",
  aliases: [""],
  permission: ["SEND_MESSAGES"],
  cooldown: 5000,
  adminOnly: false,
  /**
   *
   * @param {Message} message
   * @param {Client} client
   * @param {String[]} args
   */
  run: async (message, client, args) => {
    if (args == "aç") {
      db.set(`${message.guild.id}`, `${message.channel.id}`);
      message.reply({
        embeds: [
          new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`Boost log kanalı başarıyla ${message.channel} ayarlandı!`),
        ],
      });
    } else if (args == "kapat") {
      db.remove(`${message.guild.id}`);
      message.reply({
        embeds: [
          new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`Boost log kanalı başarıyla null ayarlandı!`),
        ],
      });
    } else {
      message.reply({
        content: "Bir değer seç `aç`**/**`kapat`",
        allowedMentions: { repiledUser: false },
      });
    }
  },
};
