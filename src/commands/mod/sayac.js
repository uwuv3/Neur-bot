const {
  MessageButton,
  MessageEmbed,
  MessageActionRow,
  Message,
  Client,
} = require("discord.js");
const { emotes, config } = require("../../../config");
const db = require("../../../db/sayac");
const { errorEmbed, succesEmbed } = require("../../scripts/embeds");

module.exports = {
  name: "sayaç",
  aliases: ["sayac"],
  usage: "ayarla <kanal> <sayı> - sıfırla",
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
            await errorEmbed(
              "Databasede sayaç kanalı var\nSıfırlamak için **{{prefix}}sayaç sıfırla"
            ),
          ],
          allowedMentions: { repiledUser: false },
        });
      } else {
        let kanal = message.mentions.channels.first();
        if (!kanal)
          return message.reply({
            embeds: [
              await errorEmbed(
                "Yanlış kullanım\nDoğru kullanım **{{prefix}}sayaç ayarla <kanal>**"
              ),
            ],
            allowedMentions: { repiledUser: false },
          });
        if (!kanal.type === "GUILD_TEXT")
          return message.reply({
            embeds: [await errorEmbed()],
            allowedMentions: { repiledUser: false },
          });
        const number = args[2];
        if (!number)
          return message.reply({
            allowedMentions: { repliedUser: false },
            embeds: [
              await errorEmbed(
                "Yanlış kullanım\nDoğru kullanım **{{prefix}}sayaç ayarla kanal <sayı>**"
              ),
            ],
          });
        if (isNaN(number))
          return message.reply({
            allowedMentions: { repliedUser: false },
            embeds: [
              await errorEmbed(
                "Yanlış kullanım\nDoğru kullanım **{{prefix}}sayaç ayarla kanal <sayı>**"
              ),
            ],
          });
        if (number < 100)
          return message.reply({
            allowedMentions: { repliedUser: false },
            embeds: [
              await errorEmbed("Sayı en fazla **100** olmalı").setFooter({
                text: "100 kişiye ulaştığında +50 eklenir",
              }),
            ],
          });
        new db({
          guildID: message.guild.id,
          channelID: kanal.id,
          number: number,
        }).save();
        message.reply({
          embeds: [
            await succesEmbed(
              `Sayaç ayarlandı\nKanal:${kanal}\nSayı:${number}`
            ),
          ],
        });
      }
    } else if (args[0] == "sıfırla") {
      let deneme = await db.findOne({ guildID: message.guild.id });
      if (!deneme)
        return message.reply({
          embeds: [
            await errorEmbed(
              "Databasede bu sunucuya ait bir sayaç kanalı,sayısı yok\nAyarlamak için **{{prefix}}sayaç ayarla**"
            ),
          ],
        });
      else {
        await db.deleteOne({ guildID: message.guild.id }).then(async (x) => {
          message.reply({
            embeds: [await succesEmbed("Sayaç sıfırlandı")],
          });
        });
      }
    } else {
      message.reply({
        embeds: [
          await errorEmbed(
            "Yanlış kullanım\nDoğru kullanım **{{prefix}}sayaç <ayarla-sıfırla>**"
          ),
        ],
        allowedMentions: { repiledUser: false },
      });
    }
  },
};
