const client = require("../../");
const { MessageEmbed } = require("discord.js");
const db = require("../../../db/boostlog");
const { emotes } = require("../../../config");
client.on("guildMemberBoost", async (member) => {
  const { channelID } = (await db.findOne({ guildID: member.guild.id })) || {
    channelID: null,
  };
  if (channelID) {
    try {
      client.channels.cache.get(channelID).send({
        embeds: [
          new MessageEmbed()
            .setColor("GREEN")
            .setDescription("Birisi bu sunucuya boost attı" + emotes.boost)
            .setFooter({ text: `\`${member.user.tag}\` attı` }),
        ],
      });
    } catch (error) {
      await db.deleteOne({ guildID: member.guild.id });
    }
  } else {
  }
});
client.on("guildMemberUnboost", async (member) => {
  const { channelID } = (await db.findOne({ guildID: member.guild.id })) || {
    channelID: null,
  };
  if (channelID) {
    try {
      client.channels.cache.get(channelID).send({
        embeds: [
          new MessageEmbed()
            .setColor("RED")
            .setDescription("Birisi bu sunucudan boostunu çekti" + emotes.boost)
            .setFooter({ text: `\`${member.user.tag}\` çekti` }),
        ],
      });
    } catch (error) {
      await db.deleteOne({ guildID: member.guild.id });
    }
  } else {
  }
});
client.on("guildBoostLevelUp", async (guild, oldLevel, newLevel) => {
  const { channelID } = (await db.findOne({ guildID: member.guild.id })) || {
    channelID: null,
  };
  if (channelID) {
    try {
      client.channels.cache.get(channelID).send({
        embeds: [
          new MessageEmbed()
            .setColor("GREEN")
            .setDescription("Sunucunun leveli yükseldi" + emotes.boost)
            .setFooter({ text: `${oldLevel}'den ${newLevel}'e yükseldi!` }),
        ],
      });
    } catch (error) {
      await db.deleteOne({ guildID: guild.id });
    }
  } else {
  }
});
client.on("guildBoostLevelDown", async (guild, oldLevel, newLevel) => {
  const { channelID } = (await db.findOne({ guildID: member.guild.id })) || {
    channelID: null,
  };
  if (channelID) {
    try {
      client.channels.cache.get(channelID).send({
        embeds: [
          new MessageEmbed()
            .setColor("RED")
            .setDescription("Sunucunun leveli düştü" + emotes.boost)
            .setFooter({ text: `${oldLevel}'den ${newLevel}'e düştü!` }),
        ],
      });
    } catch (error) {
      await db.deleteOne({ guildID: guild.id });
    }
  } else {
  }
});
