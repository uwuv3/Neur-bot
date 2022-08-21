const {
  MessageButton,
  MessageEmbed,
  MessageActionRow,
  Message,
  Client,
} = require("discord.js");
const { emotes, config } = require("../../../config");
const db = require("../../../db/boostlog");

module.exports = {
  name: "boost-log",
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
      const { channelID } = (await db.findOne({
        guildID: message.guild.id,
      })) || {
        channelID: null,
      };
      let id;
      if (channelID) id = channelID;
      let name;
      if (id) name = await client.channels.cache.get(id).name;
      if (!name) name = "null";
      const button = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId(message.author.id)
          .setDisabled(true)
          .setStyle("SECONDARY")
          .setLabel(`Şu anki kanal: ${name}`)
      );
      if (channelID) {
        message.reply({
          embeds: [
            new MessageEmbed()
              .setColor(config.color)
              .setDescription(
                emotes.carpi +
                  "Databaseye göre bu sunucya ait bir boostlog kanalı var"
              ),
          ],
          components: [button],
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

        new db({
          guildID: message.guild.id,
          channelID: kanal.id,
        }).save();
        message.reply({
          embeds: [
            new MessageEmbed()
              .setColor(config.color)
              .setDescription(
                emotes.tik + `Boost log kanalı başarıyla ${kanal} ayarlandı!`
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
                emotes.carpi + "Databasede bu sunucuya ait bir boostlog yok!"
              ),
          ],
        });
      else {
        await db.deleteOne({ guildID: message.guild.id }).then((x) => {
          message.reply({
            embeds: [
              new MessageEmbed()
                .setColor(config.color)
                .setDescription(
                  emotes.tik + `Boost log kanalı başarıyla null ayarlandı!`
                ),
            ],
          });
        });
      }
    } else {
      const { channelID } = (await db.findOne({
        guildID: message.guild.id,
      })) || {
        channelID: null,
      };
      let id;
      if (channelID) id = channelID;
      let name;
      if (id) name = await client.channels.cache.get(id).name;
      if (!name) name = "null";
      const button = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId(message.author.id)
          .setDisabled(true)
          .setStyle("SECONDARY")
          .setLabel(`Şu anki kanal: ${name}`)
      );
      message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(config.color)
            .setDescription(
              emotes.carpi +
                `Yanlış kullanım\nDoğru kullanım: **${config.prefix}boost-log <ayarla/sıfırla>**`
            ),
        ],
        components: [button],
        allowedMentions: { repiledUser: false },
      });
    }
  },
};
