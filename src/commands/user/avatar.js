const { MessageButton, MessageEmbed } = require("discord.js");
exports = {
  name: "avatar",
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
    let user = message.mentions.users.first();
    if (!user) user = message.author;
    const embed = new MessageEmbed()
      .setTitle(`avatar of\`${user.tag}\``)
      .addField(
        "PNG",
        `[**\`LINK\`**](${user.displayAvatarURL({ format: "png" })})`,
        true
      )
      .addField(
        "JPG",
        `[**\`LINK\`**](${user.displayAvatarURL({ format: "jpg" })})`,
        true
      )
      .addField(
        "WEBP",
        `[**\`LINK\`**](${user.displayAvatarURL({ format: "webp" })})`,
        true
      )
      .setImage(user.displayAvatarURL({ format: "jpg" }));
    message.reply({ embeds: [embed], allowedMentions: { repiledUser: true } });
  },
};
