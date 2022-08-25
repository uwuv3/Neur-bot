const { MessageEmbed, Message, Client } = require("discord.js");
const { config, emotes } = require("../../../config");
const { succesEmbed } = require("../../scripts/embeds");
const generateUUID = require("../../scripts/generateUUID");
module.exports = {
  name: "uuid",
  aliases: [],
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
    const uuid = await generateUUID();
    message.member
      .send({ content: `\`\`\`\n${uuid}\n\`\`\`` })
      .then(() => {
        message.reply({
          embeds: [
           await succesEmbed("Güvenlik için DM kanalına attım")
          ],
        });
      })
      .catch(() => {
        message.reply({ content: `\`\`\`\n${uuid}\n\`\`\`` });
      });
  },
};
