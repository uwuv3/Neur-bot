const { MessageEmbed, Message, Client, DMChannel } = require("discord.js");
const { Database } = require("nukleon");
const { errorEmbed, succesEmbed } = require("../../scripts/embeds");
const db = new Database("/db/radyo.json");
const yayınlar = require("../../scripts/radyo/radyolar.json");
const radyo = require("../../scripts/radyo/yayın");
module.exports = {
  name: "radyo",
  aliases: [],
  usage: "undefined",
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
    const test = await db.has(`radyochannel_${message.guild.id}`);
    const keys = Object.keys(yayınlar);
    if (!test)
      return message.reply({
        allowedMentions: { repliedUser: false },
        embeds: [
          await errorEmbed("Beni buga mı sokmaya çalışıyon önce bir kanal seç"),
        ],
      });

    const val = args[0];
    if (!val)
      return message.reply({
        allowedMentions: { repliedUser: false },
        embeds: [await errorEmbed(`Şunlardan birini seç \n**${keys}**`)],
      });

    if (!yayınlar[val])
      //Value
      return message.reply({
        allowedMentions: { repliedUser: false },
        embeds: [await errorEmbed(`Şunlardan birini seç \n**${keys}**`)],
      });
    db.set(`radyo_${message.guild.id}`, yayınlar[val]);
    message.reply({
      embeds: [await succesEmbed(`**${val}** isimli Radyo Dinleniyor!`)],
    });
    radyo(client, message.guild.id);
  },
};
