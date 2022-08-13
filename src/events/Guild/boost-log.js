const client = require("../../");
const { Database } = require("nukleon");
const { MessageEmbed } = require("discord.js");
const db = new Database("db/boostlog.json");
client.on("guildMemberBoost", async (member) => {
  const x = await db.has(`${member.guild.id}`);
  if (x) {
    const boostchannel = await db.get(`${member.guild.id}`);
    client.channels.cache.get(boostchannel).send({
      embeds: [
        new MessageEmbed()
          .setColor("GREEN")
          .setDescription(
            "<a:boost:1008029593355161650> Birisi bu sunucuya boost attı"
          )
          .setFooter({ text: `\`${member.user.tag}\` attı` }),
      ],
    });
  } else {
  }
});
client.on("guildMemberUnboost", async (member) => {
  const x = await db.has(`${member.guild.id}`);
  if (x) {
    const boostchannel = await db.get(`${member.guild.id}`);
    client.channels.cache.get(boostchannel).send({
      embeds: [
        new MessageEmbed()
          .setColor("RED")
          .setDescription(
            "<a:boost:1008029593355161650> Birisi bu sunucudan boostunu çekti"
          )
          .setFooter({ text: `\`${member.user.tag}\` çekti` }),
      ],
    });
  } else {
  }
});
client.on("guildBoostLevelUp", async (guild, oldLevel, newLevel) => {
  const x = await db.has(`${guild.id}`);
  if (x) {
    const boostchannel = await db.get(`${guild.id}`);
    client.channels.cache.get(boostchannel).send({
      embeds: [
        new MessageEmbed()
          .setColor("GREEN")
          .setDescription(
            "<a:boost:1008029593355161650> Sunucunun leveli yükseldi"
          )
          .setFooter({ text: `${oldLevel}'den ${newLevel}'e yükseldi!` }),
      ],
    });
  } else {
  }
});
client.on("guildBoostLevelDown", async (guild, oldLevel, newLevel) => {
    const x = await db.has(`${guild.id}`);
    if (x) {
      const boostchannel = await db.get(`${guild.id}`);
      client.channels.cache.get(boostchannel).send({
        embeds: [
          new MessageEmbed()
            .setColor("RED")
            .setDescription(
              "<a:boost:1008029593355161650> Sunucunun leveli düştü"
            )
            .setFooter({ text: `${oldLevel}'den ${newLevel}'e düştü!` }),
        ],
      });
    } else {
    }
  });
  