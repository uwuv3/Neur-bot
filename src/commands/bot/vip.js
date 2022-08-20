const { MessageEmbed, Message, Client } = require("discord.js");
const { config, emotes } = require("../../../config");
const db = require("../../../db/vip");

module.exports = {
  name: "vip",
  aliases: [],
  permission: ["SEND_MESSAGES"],
  cooldown: 1000,
  adminOnly: true,
  /**
   *
   * @param {Message} message
   * @param {Client} client
   * @param {String[]} args
   */
  run: async (message, client, args) => {
    const değer = args[0];
    if (değer === "ekle") {
      const kullanıcı = message.mentions.users.first();
      if (!kullanıcı)
        return message.reply({
          allowedMentions: { repliedUser: false },
          embeds: [
            new MessageEmbed()
              .setColor(config.color)
              .setDescription(emotes.carpi + "Bir kullanıcı etiketle"),
          ],
        });
      await new db({ userID: kullanıcı.id }).save().then((x) => {
        message.reply({
          embeds: [
            new MessageEmbed()
              .setColor(config.color)
              .setDescription(emotes.tik + "Başarılı"),
          ],
        });
        kullanıcı.send({
          content: `Tebrikler, ${message.author} sana VIP yetkisi verdi`,
        });
      });
    } else if (değer === "sil") {
      const kullanıcı = message.mentions.users.first();
      if (!kullanıcı)
        return message.reply({
          allowedMentions: { repliedUser: false },
          embeds: [
            new MessageEmbed()
              .setColor(config.color)
              .setDescription(emotes.carpi + "Bir kullanıcı etiketle"),
          ],
        });
      await db.deleteOne({ userID: kullanıcı.id }).then((x) => {
        message.reply({
          embeds: [
            new MessageEmbed()
              .setColor(config.color)
              .setDescription(emotes.tik + "Başarılı"),
          ],
        });
        kullanıcı.send({
          content: `Üzgünüm, ${message.author} senden VIP yetkisini aldı`,
        });
      });
    }
  },
};
