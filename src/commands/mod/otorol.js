const {
  MessageButton,
  MessageEmbed,
  MessageActionRow,
  Message,
  Client,
} = require("discord.js");
const { emotes, config } = require("../../../config");
const db = require("../../../db/otorol");
const { errorEmbed, succesEmbed } = require("../../scripts/embeds");

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
            await errorEmbed(
              "Databasede otorol kanalı var\nSıfırlamak için **{{prefix}}otorol sıfırla**"
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
                "Yanlış kullanım\nDoğru kullanım **{{prefix}}otorol ayarla <kanal>**"
              ),
            ],
            allowedMentions: { repiledUser: false },
          });
        if (!kanal.type === "GUILD_TEXT")
          return message.reply({
            embeds: [await errorEmbed()],
            allowedMentions: { repiledUser: false },
          });
        const role = message.mentions.roles.first();
        if (!role)
          return message.reply({
            allowedMentions: { repliedUser: false },
            embeds: [
              await errorEmbed(
                "Yanlış kullanım\nDoğru kullanım **{{prefix}}otorol ayarla kanal <rol>**"
              ),
            ],
          });
        if (role.position > message.member.roles.highest.position)
          return message.reply({
            allowedMentions: { repliedUser: false },
            embeds: [await errorEmbed("Rolün pozisyonu seninkinden üstün")],
          });
        if (role.position > message.guild.me.roles.highest.position)
          return message.reply({
            allowedMentions: { repliedUser: false },
            embeds: [await errorEmbed("Rolün pozistonu benimkinden üstün")],
          });
        new db({
          guildID: message.guild.id,
          channelID: kanal.id,
          roleID: role.id,
        }).save();
        message.reply({
          embeds: [
            await succesEmbed(`Otorol ayarlandı\nKanal:${kanal}\nRol:${rol}`),
          ],
        });
      }
    } else if (args[0] == "sıfırla") {
      let deneme = await db.findOne({ guildID: message.guild.id });
      if (!deneme)
        return message.reply({
          embeds: [
            await errorEmbed(
              "Databasede otorol ayarlı değil\nAyarlamak için **{{prefix}}otorol ayarla**"
            ),
          ],
        });
      else {
        await db.deleteOne({ guildID: message.guild.id }).then((x) => {
          message.reply({
            embeds: [
             await succesEmbed("Başarılya otorol sıfırlandı")
            ],
          });
        });
      }
    } else {
      message.reply({
        embeds: [
         await errorEmbed("Yanlış kullanım\nDoğru kullanım **{{prefix}}otorol <ayarla-sıfırla>")
        ],
        allowedMentions: { repiledUser: false },
      });
    }
  },
};
