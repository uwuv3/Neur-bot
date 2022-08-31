const { MessageEmbed, Message, Client } = require("discord.js");
const { Database } = require("nukleon");
const { errorEmbed, succesEmbed } = require("../../scripts/embeds");
const db = new Database("/db/radyo.json");
module.exports = {
  name: "setkanal",
  aliases: [],
  usage: "undefined",
  permission: ["MANAGE_CHANNELS"],
  cooldown: 1000,
  adminOnly: false,
  /**
   *
   * @param {Message} message
   * @param {Client} client
   * @param {String[]} args
   */
  run: async (message, client, args) => {
    const sesli = message.member.voice.channel;
    if (!sesli)
      return message.reply({
        embeds: [await errorEmbed("Bir sesli kanala gir")],
      });
    await db.set(`radyochannel_${message.guild.id}`, sesli.id);
    message.reply({
      embeds: [await succesEmbed(`Radyo Kanalı ${sesli} olarak ayarlandı`)],
    });
  },
};
