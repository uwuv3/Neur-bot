const { MessageEmbed, Message, Client } = require("discord.js");
const { Database } = require("nukleon");
const { succesEmbed } = require("../../scripts/embeds");
const db = new Database("/db/radyo.json");
module.exports = {
  name: "oynatılan",
  aliases: [],
  usage: "undefined",
  permission: ["SEND_MESSAGES"],
  cooldown: 1000,
  adminOnly: false,
  /**
   *
   * @param {Message} message
   * @param {Client} client
   * @param {String[]} args
   */
  run: async (message, client, args) => {
    const fm = {
      kralpop: "Kral Pop",
      kralpm: "Kral FM",
      powerfm: "Power FM",
      bestfm: "Best FM",
      fenomen: "Fenomen",
    };
    message.reply({
      embeds: [
        await succesEmbed(
          `Şuanda ${fm[radyolar[db.get(`radyo_${message.guild.id}`)]]} çalıyor`
        ),
      ],
    });
  },
};
