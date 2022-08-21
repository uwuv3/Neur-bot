const {
  MessageButton,
  MessageEmbed,
  MessageActionRow,
  Message,
  Client,
} = require("discord.js");
const { emotes, config } = require("../../../config");
const db = require("../../../db/sayac");

module.exports = {
  name: "sayaç",
  aliases: ["sayac"],
  permission: ["ADMINISTRATOR"],
  cooldown: 5000,
  adminOnly: false,
  /**
   *
   * @param {Message} message
   * @param {Client} client
   * @param {String[]} args
   */
  run: async (message, client, args) => {
    if (args[0] == "ayarla") {
      const { channelID, number } = (await db.findOne({
        guildID: message.guild.id,
      })) || {
        channelID: null,
        number: null,
      };
      if (channelID || number) {
        message.reply({
          embeds: [
            new MessageEmbed()
              .setColor(config.color)
              .setDescription(
                emotes.carpi +
                  "Databaseye göre bu sunucya ait bir sayaç kanalı var"
              ),
          ],
          allowedMentions: { repiledUser: false },
        });
      } else {
        let kanal = message.mentions.channels.first();
        if (!kanal)
          return message.reply({
            embeds: [
              new MessageEmbed()
                .setColor(config.color)
                .setDescription(emotes.carpi + "Bir kanal seç"),
            ],
            allowedMentions: { repiledUser: false },
          });
        if (!kanal.type === "GUILD_TEXT")
          return message.reply({
            embeds: [
              new MessageEmbed()
                .setColor(config.color)
                .setDescription(
                  emotes.carpi + "Seçtiğin kanal bir yazı kanalı olmalı"
                ),
            ],
            allowedMentions: { repiledUser: false },
          });
        const number = args[2];
        if (!number)
          return message.reply({
            allowedMentions: { repliedUser: false },
            embeds: [
              new MessageEmbed()
                .setColor(config.color)
                .setDescription(emotes.carpi + "Bir sayı yaz"),
            ],
          });
        if (isNaN(number))
          return message.reply({
            allowedMentions: { repliedUser: false },
            embeds: [
              new MessageEmbed()
                .setColor(config.color)
                .setDescription(emotes.carpi + "Bir sayı yaz"),
            ],
          });
        if (number < 100)
          return message.reply({
            allowedMentions: { repliedUser: false },
            embeds: [
              new MessageEmbed()
                .setColor(config.color)
                .setDescription(emotes.carpi + "Sayı en az **100** olmalı"),
            ],
          });
        new db({
          guildID: message.guild.id,
          channelID: kanal.id,
          number: number,
        }).save();
        message.reply({
          embeds: [
            new MessageEmbed()
              .setColor(config.color)
              .setDescription(
                emotes.tik +
                  `Sayaç ayarlandı:\nKanal:**${kanal}**\nSayı:**${number}**`
              ),
          ],
        });
      }
    } else if (args[0] == "sıfırla") {
      let deneme = await db.findOne({ guildID: message.guild.id });
      if (!deneme)
        return message.reply({
          embeds: [
            new MessageEmbed()
              .setColor(config.color)
              .setDescription(
                emotes.carpi + "Databasede bu sunucuya ait bir sayaç yok!"
              ),
          ],
        });
      else {
        await db.deleteOne({ guildID: message.guild.id }).then((x) => {
          message.reply({
            embeds: [
              new MessageEmbed()
                .setColor(config.color)
                .setDescription(emotes.tik + `Sayaç sıfırlandı`),
            ],
          });
        });
      }
    } else {
      message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(config.color)
            .setDescription(
              emotes.carpi +
                `Yanlış kullanım\nDoğru kullanım: **${config.prefix}otorol <ayarla/sıfırla>**`
            ),
        ],
        allowedMentions: { repiledUser: false },
      });
    }
  },
};
