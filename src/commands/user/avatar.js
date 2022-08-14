const { MessageButton, MessageEmbed } = require("discord.js");
module.exports = {
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
      .setTitle(`\`${user.tag}\` adlı kişinin avatarı`)
      .addFields([
        { name: `PNG`, value: `[**\`LINK\`**](${user.displayAvatarURL({ format: "png" })})`},
        { name: `JPG`, value: `[**\`LINK\`**](${user.displayAvatarURL({ format: "jpg" })})`},
        { name: `WEBP`, value: `[**\`LINK\`**](${user.displayAvatarURL({ format: "webp" })})`},
        { name: `GIF`, value: `[**\`LINK\`**](${user.displayAvatarURL({ format: "gif" })})`}
      ])
      .setImage(user.displayAvatarURL({ format: "jpg" }));
    message.reply({ embeds: [embed], allowedMentions: { repiledUser: true } });
  },
};
