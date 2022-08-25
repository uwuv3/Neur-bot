const { MessageEmbed, Message, Client } = require("discord.js");
const { emotes, config } = require("../../../config");
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
        embeds: [
          new MessageEmbed()
            .setDescription(
              emotes.tik + "Başarılı\n Otomatik mesaj silme açıldı"
            )
            .setColor(config.color),
        ],
      });
    } else if (args[0] === "kapat") {
      client.msgsil.delete(`${message.channel.id}`);
      message.channel.send({
        embeds: [
          new MessageEmbed()
            .setDescription(
              emotes.tik + "Başarılı\n Otomatik mesaj silme kapatıldı"
            )
            .setColor(config.color),
        ],
      });
    } else {
      message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(config.color)
            .setDescription(
              emotes.carpi +
                `Yanlış kullanım\nDoğru kullanım: **${config.prefix}oto-sil <aç/kapat>**`
            ),
        ],
      });
    }
  },
};
