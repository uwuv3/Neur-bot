const { MessageEmbed } = require("discord.js");
const { config, emotes } = require("../../../config");
const db = require("../../../db/linkler");
const client = require("../../index");
const fetch = require("node-fetch");
client.on("ready", async () => {
  setInterval(() => {
    db.find({}, (err, res) => {
      res.forEach(async (b) => {
        try {
          await fetch(b.URL).catch(async () => {
            await db.deleteOne({ userID: b.userID, URL: b.URL }).then(() => {
              client.users.cache.get(b.userID).send({
                embeds: [
                  new MessageEmbed()
                    .setColor(config.color)
                    .setDescription(
                      emotes.carpi +
                        `\`${b.URL}\` linkin bozulmuş gibi gözüküyor \n E ben bozuk linki napıyım`
                    ),
                ],
              });
            });
          });
        } catch {
          await db.deleteOne({ userID: b.userID, URL: b.URL }).then(() => {
            client.users.cache.get(b.userID).send({
              embeds: [
                new MessageEmbed()
                  .setColor(config.color)
                  .setDescription(
                    emotes.carpi +
                      `\`${b.URL}\` linkin bozulmuş gibi gözüküyor \n E ben bozuk linki napıyım`
                  ),
              ],
            });
          });
        }
      });
    });
  }, 60000);
});
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
