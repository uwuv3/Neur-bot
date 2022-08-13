const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "sil",
  aliases: [""],
  permission: ["SEND_MESSAGES", "MANAGE_MESSAGES"],
  cooldown: 10000,
  adminOnly: false,
  /**
   *
   * @param {Message} message
   * @param {Client} client
   * @param {String[]} args
   */
  run: async (message, client, args) => {
    let sil_args = args;
    if (!sil_args)
      return message.reply({
        content: "Bir değer gir",
        allowedMentions: { repiledUser: false },
      });
    if (isNaN(sil_args))
      return message.reply({
        content: "Girdiğin değer bir sayı olmalı!",
        allowedMentions: { repiledUser: false },
      });
    if (sil_args > 100)
      return message.reply({
        content: "Girdiğin değer 100 den fazla olmamalı!",
        allowedMentions: { repiledUser: false },
      });
    message.channel.bulkDelete(sil_args);
    message.channel.send({
      embeds: [
        new MessageEmbed()
          .setColor("GREEN")
          .setDescription(`Chat ${message.author} tarafından silindi!`)
          .setFooter({ text: `100 mesaj silme istendi.` }),
      ],
    });
  },
};
