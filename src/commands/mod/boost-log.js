const { MessageButton, MessageEmbed } = require("discord.js");
const db = require("../../../db/boostlog");

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
      new db({
        guildID: message.guild.id,
        channelID: message.channel.id,
      }).save();
      message.reply({
        embeds: [
          new MessageEmbed()
            .setColor("GREEN")
            .setDescription(
              `Boost log kanalı başarıyla ${message.channel} ayarlandı!`
            ),
        ],
      });
    } else if (args == "kapat") {
      let deneme = await db.findOne({ guildID: message.guild.id });
      if (!deneme)
        return message.reply({
          content: "Databasede bu sunucuya ait bir boostlog yok!",
        });
      else {
        await db.deleteOne({ guildID: message.guild.id }).then((x) => {
          message.reply({
            embeds: [
              new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`Boost log kanalı başarıyla null ayarlandı!`),
            ],
          });
        });
      }
    } else {
      message.reply({
        content: "Bir değer seç `aç`**/**`kapat`",
        allowedMentions: { repiledUser: false },
      });
    }
  },
};
