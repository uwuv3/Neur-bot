const { MessageEmbed, Message, Client } = require("discord.js");
const { Database } = require("nukleon");
const { errorEmbed, succesEmbed } = require("../../scripts/embeds");
const db = new Database("/db/radyo.json");
module.exports = {
  name: "radyosıfırla",
  aliases: [],
  usage: "undefined",
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
    const sesli = message.member.voice.channel;
    if (!sesli)
      return message.reply({
        allowedMentions: { repliedUser: false },
        embeds: [await errorEmbed("Bir sesli kanala gir")],
      });
    if (!sesli.id == message.guild.me.voice.id)
      return message.reply({
        allowedMentions: { repliedUser: false },
        embeds: [await errorEmbed("Girdiğin sesli kanald ben yokum")],
      });
    await db.remove(`radyochannel_${message.guild.id}`);
    await db.remove(`radyo_${message.guild.id}`);
    if (message.guild.me.voice) await message.guild.me.voice.disconnect();
    message.reply({ embeds: [await succesEmbed("Başarıla sıfırlandı")] });
  },
};
