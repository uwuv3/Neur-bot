const { MessageEmbed, Message, Client } = require("discord.js");
const { config, emotes } = require("../../../config");
const { errorEmbed, succesEmbed } = require("../../scripts/embeds");
module.exports = {
  name: "sil",
  aliases: [],
  usage: "<sayı>",
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
            await errorEmbed(
              "Yanlış kullanım\nDoğru kullanım **{{prefix}}sil <sayı>**"
            ),
          ],
          allowedMentions: { repliedUser: false },
        });
      if (isNaN(amonut))
        return message.reply({
          embeds: [
            await errorEmbed(
              "Yanlış kullanım\nDoğru kullanım **{{prefix}}sil <sayı>**"
            ),
          ],
          allowedMentions: { repliedUser: false },
        });
      if (amonut < 5)
        return message.reply({
          embeds: [await errorEmbed("En az **5** tane mesaj silebilirim ")],
          allowedMentions: { repliedUser: false },
        });

      if (amonut > 99)
        return message.reply({
          embeds: [await errorEmbed("En fazla **99** mesaj silebilirim")],
          allowedMentions: { repliedUser: false },
        });
      await message.channel.bulkDelete(amonut);
      message.reply({
        embeds: [
          await succesEmbed(
            `Başarılı\n**${amonut}** kadar mesaj silme komudu emredildi`
          ),
        ],
      });
    } catch (err) {
      message.channel.send({
        embeds: [
          await errorEmbed(
            "Discord 14 günden fazla olan mesajları silmeme izin vermiyor"
          ),
        ],
      });
    }
  },
};
