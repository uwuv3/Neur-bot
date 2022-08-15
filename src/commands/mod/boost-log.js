const { MessageButton, MessageEmbed, MessageActionRow } = require("discord.js");
const { emotes } = require("../../../config");
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
    if (args[0] == "aç") {
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
          content:
            emotes.carpi +
            "Databaseye göre bu sunucya ait bir boostlog kanalı var",
          components: [button],
          allowedMentions: { repiledUser: false },
        });
      } else {
        let kanal = message.mentions.channels.first();
        if (!kanal)
          return message.reply({
            content: emotes.carpi + "Bir kanal seç!",
            allowedMentions: { repiledUser: false },
          });
        if (!kanal.type === "GUILD_TEXT")
          return message.reply({
            content: emotes.carpi + "Seçtiğin kanal bir yazı kanalı olmalı",
            allowedMentions: { repiledUser: false },
          });

        new db({
          guildID: message.guild.id,
          channelID: kanal.id,
        }).save();
        message.reply({
          embeds: [
            new MessageEmbed()
              .setColor("GREEN")
              .setDescription(
                emotes.tik + `Boost log kanalı başarıyla ${kanal} ayarlandı!`
              ),
          ],
        });
      }
    } else if (args[0] == "kapat") {
      let deneme = await db.findOne({ guildID: message.guild.id });
      if (!deneme)
        return message.reply({
          content:
            emotes.carpi + "Databasede bu sunucuya ait bir boostlog yok!",
        });
      else {
        await db.deleteOne({ guildID: message.guild.id }).then((x) => {
          message.reply({
            embeds: [
              new MessageEmbed()
                .setColor("GREEN")
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
        content: emotes.carpi + "Bir değer seç `aç`**/**`kapat`",
        components: [button],
        allowedMentions: { repiledUser: false },
      });
    }
  },
};
