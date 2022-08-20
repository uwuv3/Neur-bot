const {
  MessageButton,
  MessageEmbed,
  MessageActionRow,
  Message,
  Client,
} = require("discord.js");
const { emotes, config } = require("../../../config");
const db = require("../../../db/otorol");

module.exports = {
  name: "otorol",
  aliases: [""],
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
      const { channelID, roleID } = (await db.findOne({
        guildID: message.guild.id,
      })) || {
        channelID: null,
        roleID: null,
      };
      if (channelID || roleID) {
        message.reply({
          embeds: [
            new MessageEmbed()
              .setColor(config.color)
              .setDescription(
                emotes.carpi +
                  "Databaseye göre bu sunucya ait bir otorol kanalı var"
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
        const role = message.mentions.roles.first();
        if (!role)
          return message.reply({
            allowedMentions: { repliedUser: false },
            embeds: [
              new MessageEmbed()
                .setColor(config.color)
                .setDescription(emotes.carpi + "Bir rol seç"),
            ],
          });
        if (role.position > message.member.roles.highest.position)
          return message.reply({
            allowedMentions: { repliedUser: false },
            embeds: [
              new MessageEmbed()
                .setColor(config.color)
                .setDescription(
                  emotes.carpi + "Rolün pozisyonu seninkinden üstün"
                ),
            ],
          });
        if (role.position > message.guild.me.roles.highest.position)
          return message.reply({
            allowedMentions: { repliedUser: false },
            embeds: [
              new MessageEmbed()
                .setColor(config.color)
                .setDescription(
                  emotes.carpi + "Rolün pozisyonu benimkinden üstün"
                ),
            ],
          });
        new db({
          guildID: message.guild.id,
          channelID: kanal.id,
          roleID: role.id,
        }).save();
        message.reply({
          embeds: [
            new MessageEmbed()
              .setColor(config.color)
              .setDescription(
                emotes.tik +
                  `Otorol ayarlandı:\nKanal:**${kanal}**\nRol:**${role}**`
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
                emotes.carpi + "Databasede bu sunucuya ait bir otorol yok!"
              ),
          ],
        });
      else {
        await db.deleteOne({ guildID: message.guild.id }).then((x) => {
          message.reply({
            embeds: [
              new MessageEmbed()
                .setColor(config.color)
                .setDescription(emotes.tik + `Otorol sıfırlandı`),
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
