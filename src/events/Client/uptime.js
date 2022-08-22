const { MessageEmbed, WebhookClient, Webhook } = require("discord.js");
const { config, emotes } = require("../../../config");
const db = require("../../../db/linkler");
const client = require("../../index");
const fetch = require("node-fetch");
setInterval(() => {
  db.find({}, (err, res) => {
    res.forEach(async (b) => {
      await uptime(b);
    });
  });
}, 180000);
async function uptime(b) {
  const controller = new AbortController();
  const signal = controller.signal;
  setTimeout(() => {
    controller.abort();
  }, 10000);

  try {
    const res = await fetch(b.URL, { signal }).catch(async (x) => {
      const wbclient = new WebhookClient({
        url: config.uptime.webhookURL,
      });
      wbclient.send({
        embeds: [
          new MessageEmbed()
            .setColor(config.color)
            .setDescription(
              emotes.carpi +
                `<@${b.userID}> kişisinin **${b.name}** adlı websiteni uptime edemedim\n Sebep: **${x}**`
            ),
        ],
      });
    });

    if (!res.ok) {
      const wbclient = new WebhookClient({
        url: config.uptime.webhookURL,
      });

      wbclient.send({
        embeds: [
          new MessageEmbed()
            .setColor(config.color)
            .setDescription(
              emotes.carpi +
                `<@${b.userID}> kişisinin **${b.name}** adlı websiteni uptime edemedim\n Sebep: Invalid status:**${res.status}** `
            ),
        ],
      });
    }
  } catch (x) {
    const wbclient = new WebhookClient({
      url: config.uptime.webhookURL,
    });
    wbclient.send({
      embeds: [
        new MessageEmbed()
          .setColor(config.color)
          .setDescription(
            emotes.carpi +
              `<@${b.userID}> kişisinin **${b.name}** adlı websiteni uptime edemedim\n Sebep: **${x}**`
          ),
      ],
    });
  }
}
client.on("guildMemberRemove", async (member) => {
  if (member.guild.id === config.uptime.guildID) {
    const link = await db.find({ userID: member.id });
    link.map(async (x) => {
      await db.deleteOne({ userID: x.userID, URL: x.URL }).then(() => {
        client.users.cache.get(x.userID).send({
          embeds: [
            new MessageEmbed()
              .setColor(config.color)
              .setDescription(
                emotes.carpi +
                  `\`${b.URL}\` linkini sunucudan çıktığın için sildim`
              ),
          ],
        });
      });
    });
  }
});
