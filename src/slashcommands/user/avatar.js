import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";

exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Get user avatar")
    .addUserOption((option) => option.setName("user").setDescription("user?")),
  permission: ["SEND_MESSAGES"],
  cooldown: 5000,
  /**
   *
   * @param {Interaction} interaciton
   * @param {Client} _
   */
  run: async (interaction, _) => {
    let user = interaction.options.getUser("user");
    if (!user) user = interaction.member;
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
    interaction.reply({
      embeds: [embed],
    });
  },
};
