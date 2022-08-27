const {
  MessageButton,
  MessageEmbed,
  MessageActionRow,
  Message,
  Client,
} = require("discord.js");
const { config } = require("../../../config");
module.exports = {
  name: "avatar",
  aliases: [""],
  usage: "<@user>",
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
    const png = user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 1024,
    });

    const jpg = user.displayAvatarURL({
      dynamic: true,
      format: "jpg",
      size: 1024,
    });

    const webp = user.displayAvatarURL({
      dynamic: true,
      format: "webp",
      size: 1024,
    });

    const jpeg = user.displayAvatarURL({
      dynamic: true,
      format: "jpeg",
      size: 1024,
    });

    const gif = user.displayAvatarURL({
      dynamic: true,
      format: "gif",
      size: 1024,
    });
    const row = new MessageActionRow().addComponents(
      new MessageButton().setStyle("LINK").setLabel("PNG").setURL(`${png}`),
      new MessageButton().setStyle("LINK").setLabel("JPG").setURL(`${jpg}`),
      new MessageButton().setStyle("LINK").setLabel("JPEG").setURL(`${jpeg}`),
      new MessageButton().setStyle("LINK").setLabel("WEBP").setURL(`${webp}`),
      new MessageButton().setStyle("LINK").setLabel("GIF").setURL(`${gif}`)
    );
    const embed = new MessageEmbed()
      .setTitle(`\`${user.tag}\` adlı kişinin avatarı`)
      .setDescription(
        `[**\`PNG\`**](${png}) | [**\`JPG\`**](${jpg}) | [**\`JPEG\`**](${png}) | [**\`WEBP\`**](${webp}) | [**\`GIF\`**](${gif}) `
      )
      .setImage(user.displayAvatarURL())
      .setColor(config.color);
    message.reply({
      embeds: [embed],
      components: [row],
      allowedMentions: { repiledUser: true },
    });
  },
};
