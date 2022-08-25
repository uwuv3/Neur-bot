const { MessageEmbed, WebhookClient, Webhook } = require("discord.js");
const { config, emotes } = require("../../../config");
const db = require("../../../db/linkler");
const client = require("../../index");
const fetch = require("node-fetch");
const { succesEmbed, errorEmbed } = require("../../scripts/embeds");
setInterval(() => {
  db.find({}, (err, res) => {
    res.forEach(async (b) => {
      await uptime(b);
    });
  });
}, 180000);
const nukleon = require("nukleon");
const nukleondb = new nukleon.Database("db/errors.json");
async function uptime(b) {
  const list = nukleondb.get(`${b.URL}`);
  if (list === 10) {
    db.deleteOne({ URL: b.URL }).then(async (x) => {
      const wbclient = new WebhookClient({
        url: config.uptime.webhookURL,
      });
      wbclient.send({
        embeds: [
          await succesEmbed(
            `<@${client.user.id}> tarafından **${b.UUID}** uuidli websitesi silindi!`
          ),
        ],
      });
      nukleondb.remove(`${b.URL}`);
    });
  }
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
      nukleondb.add(`${b.URL}`, 1);
      wbclient.send({
        embeds: [
          await errorEmbed(
            `<@${b.userID}> kişisinin **${b.UUID}** UUIDli websiteni uptime edemedim\n Sebep: **${x}**`
          ),
        ],
      });
    });
  } catch (x) {
    const wbclient = new WebhookClient({
      url: config.uptime.webhookURL,
    });
    nukleondb.add(`${b.URL}`, 1);
    wbclient.send({
      embeds: [
        await errorEmbed(
          `<@${b.userID}> kişisinin **${b.UUID}** UUIDli websiteni uptime edemedim\n Sebep: **${x}**`
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
