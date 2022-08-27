const { MessageEmbed, Message, Client } = require("discord.js");
module.exports = {
  name: "",
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
  run: async (message, client, args) => {},
};
