const { MessageEmbed } = require("discord.js");
const { config } = require("../../config");

async function errorEmbed(message) {
  if (message) {
    const msg = message.replaceAll("{{prefix}}", config.prefix);
    const embed = new MessageEmbed()
      .setDescription(`${msg}`)
      .setColor(config.color);
    return embed;
  } else {
    const embed = new MessageEmbed()
      .setDescription(`Bir hata oluştu`)
      .setColor(config.color);
    return embed;
  }
}
async function succesEmbed(message) {
  if (message) {
    const msg = message.replaceAll("{{prefix}}", config.prefix);
    const embed = new MessageEmbed()
      .setDescription(`${msg}`)
      .setColor(config.color);
    return embed;
  } else {
    const embed = new MessageEmbed()
      .setDescription(`Başarılı!`)
      .setColor(config.color);
    return embed;
  }
}
module.exports = { errorEmbed, succesEmbed };
