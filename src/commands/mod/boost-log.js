const {
  MessageButton,
  MessageEmbed,
  MessageActionRow,
  Message,
  Client,
} = require("discord.js");
const { emotes, config } = require("../../../config");
const db = require("../../../db/boostlog");
const { errorEmbed, succesEmbed } = require("../../scripts/embeds");

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
            await errorEmbed(
              "Zaten databasede bir boostlog kanalı var \nSıfırlamak için **{{prefix}}boost-log sıfırla**"
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
              await errorEmbed(
                "Ynalış kullanım\nDoğru kullanım **{{prefix}}boost-log ayarla <kanal>**"
              ),
            ],
            allowedMentions: { repiledUser: false },
          });
        if (!kanal.type === "GUILD_TEXT")
          return message.reply({
            embeds: [await errorEmbed()],
            allowedMentions: { repiledUser: false },
          });

        new db({
          guildID: message.guild.id,
          channelID: kanal.id,
        }).save();
        message.reply({
          embeds: [
            await succesEmbed(
              `Başarıyla boost-log kanalı ayarlandı\nKanal:${kanal}`
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
              "Databasede boost-log kanalı bulamadım \nAyarlamak için **{{prefix}}boost-log ayarla**"
            ),
          ],
        });
      else {
        await db.deleteOne({ guildID: message.guild.id }).then(async (x) => {
          message.reply({
            embeds: [
              await succesEmbed("Başarıyla boost-log kanalı sıfırlandı"),
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
          await errorEmbed(
            "Yanlış kullanım\nDoğru kullanım **{{prefix}}boost-log <ayarla-sıfırla>**"
          ),
        ],
        components: [button],
        allowedMentions: { repiledUser: false },
      });
    }
  },
};
