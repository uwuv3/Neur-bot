const { MessageEmbed, Message, Client } = require("discord.js");
const { emotes } = require("../../../config");
module.exports = {
  name: "nuke",
  aliases: [""],
  permission: ["MANAGE_CHANNELS"],
  cooldown: 5000,
  adminOnly: false,
  /**
   *
   * @param {Message} message
   * @param {Client} client
   * @param {String[]} args
   */
  run: async (message, client, args) => {
    const channel = message.channel;
    message.channel.clone("Nuked").then(async (chnl) => {
      await chnl.setPosition(channel.position);
      await channel.delete();
      await chnl.send({
        embeds: [
          new MessageEmbed()
            .setDescription(
              emotes.tik + `Kanala ${message.author} tarafından nuke atıldı`
            )
            .setColor("GREEN"),
        ],
      });
    });
  },
};
