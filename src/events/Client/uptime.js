const { MessageEmbed, WebhookClient, Webhook } = require("discord.js");
const { config, emotes } = require("../../../config");
const db = require("../../../db/linkler");
const client = require("../../index");
const fetch = require("node-fetch");
client.on("ready", async () => {
  setInterval(() => {
    db.find({}, (err, res) => {
      res.forEach(async (b) => {
        await uptime(b);
      });
    });
  }, 60000);
});
async function uptime(b) {
  try {
    await fetch(b.URL).catch(async (x) => {
      const wbclient = new WebhookClient({
        url: config.uptime.webhookURL,
      });
      wbclient.send({
        content: `<@${b.userID}`,
        embeds: [
          new MessageEmbed().setDescription(
            emotes.carpi + `${b.name} adlı websiteni uptime edemedim`
          ),
        ],
      });
    });
  } catch {
    const wbclient = new WebhookClient({
      url: config.uptime.webhookURL,
    });
    wbclient.send({
      content: `<@${b.userID}`,
      embeds: [
        new MessageEmbed().setDescription(
          emotes.carpi + `${b.name} adlı websiteni uptime edemedim`
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
