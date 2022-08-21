const { MessageEmbed } = require("discord.js");
const client = require("../..");
const { config } = require("../../../config");
const db = require("../../../db/sayac");
client.on("guildMemberAdd", async (member) => {
  const { channelID, number } = (await db.findOne({
    guildID: member.guild.id,
  })) || {
    channelID: null,
    number: null,
  };
  if (channelID) {
    const sunucusize = await member.guild.memberCount;
    if (sunucusize > number)
      await db.updateOne({
        guildID: member.guild.id,
        channelID: channelID,
        number: number + 50,
      });
    const kalan = number - sunucusize;
    client.channels.cache.get(channelID).send({
      embeds: [
        new MessageEmbed()
          .setColor(config.color)
          .setDescription(
            `${member} kişisi sunucuya katıldı ve ${number} kişi olmamıza **${kalan}** kişi kaldı`
          ),
      ],
    });
  }
});
client.on("guildMemberRemove", async (member) => {
  const { channelID, number } = (await db.findOne({
    guildID: member.guild.id,
  })) || {
    channelID: null,
    number: null,
  };
  if (channelID) {
    const sunucusize = await member.guild.memberCount;
    const kalan = number - sunucusize;
    client.channels.cache.get(channelID).send({
      embeds: [
        new MessageEmbed()
          .setColor(config.color)
          .setDescription(
            `${member} kişisi sunucuya katıldı ve ${number} kişi olmamıza **${kalan}** kişi kaldı`
          ),
      ],
    });
  }
});
