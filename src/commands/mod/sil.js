const { MessageEmbed, Message, Client } = require("discord.js");
const { config, emotes } = require("../../../config");
module.exports = {
  name: "sil",
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
    try {
      let amonut = args[0];
      if (!amonut)
        return message.reply({
          embeds: [
            new MessageEmbed()
              .setColor(config.color)
              .setDescription(
                emotes.carpi +
                  `Yanlış kullanım\nDoğru kullanım: **${config.prefix}sil <sayı>**`
              ),
          ],
          allowedMentions: { repliedUser: false },
        });
      if (isNaN(amonut))
        return message.reply({
          embeds: [
            new MessageEmbed()
              .setColor(config.color)
              .setDescription(
                emotes.carpi +
                  `Yanlış kullanım\nDoğru kullanım: **${config.prefix}sil <sayı>**`
              ),
          ],
          allowedMentions: { repliedUser: false },
        });
      if (amonut < 5)
        return message.reply({
          embeds: [
            new MessageEmbed()
              .setColor(config.color)
              .setDescription(emotes.carpi + `Sayı değeri en az **5**`),
          ],
          allowedMentions: { repliedUser: false },
        });

      if (amonut > 99)
        return message.reply({
          embeds: [
            new MessageEmbed()
              .setColor(config.color)
              .setDescription(emotes.carpi + `Sayı değeri en fazla **99**`),
          ],
          allowedMentions: { repliedUser: false },
        });
      await message.channel.bulkDelete(amonut);
      message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(config.color)
            .setDescription(
              `${emotes.tik} Başarılı\n**${amonut}** kadar mesaj silme komudu emredildi`
            ),
        ],
      });
    } catch (err) {}
  },
};
