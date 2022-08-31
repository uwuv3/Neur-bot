const { MessageEmbed, Message, Client, DMChannel } = require("discord.js");
const { Database } = require("nukleon");
const { errorEmbed, succesEmbed } = require("../../scripts/embeds");
const db = new Database("/db/radyo.json");
const yayınlar = require("../../scripts/radyo/radyolar.json");
const radyo = require("../../scripts/radyo/yayın");
module.exports = {
  name: "radyo",
  aliases: [],
  usage: "<ad>",
  permission: ["CHANGE_NICKNAME"],
  cooldown: 1000,
  adminOnly: false,
  /**
   *
   * @param {Message} message
   * @param {Client} client
   * @param {String[]} args
   */
  run: async (message, client, args) => {
    if (message.channel.type !== "GUILD_VOICE")
      return message.reply({
        allowedMentions: { repliedUser: false },
        embeds: [await errorEmbed("Bu komudu sesli sohbette kullanabilirsin")],
      });
    const sesli = message.member.voice.channel;
    if (!sesli)
      return message.reply({
        embeds: [await errorEmbed("Bir sesli kanala gir")],
      });
    const keys = Object.keys(yayınlar);
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
    await db.set(`radyochannel_${message.guild.id}`, sesli.id);
    message.reply({
      embeds: [await succesEmbed(`**${val}** isimli radyo dinleniyor!`)],
    });
    radyo(client, message.guild.id);
  },
};
