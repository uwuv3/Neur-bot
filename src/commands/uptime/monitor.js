const {
  MessageEmbed,
  Message,
  Client,
  WebhookClient,
  Webhook,
} = require("discord.js");
const { default: fetch } = require("node-fetch");
const { config, emotes } = require("../../../config");
const db = require("../../../db/linkler");
const db2 = require("../../../db/vip");
const { errorEmbed, succesEmbed } = require("../../scripts/embeds");
const generateUUID = require("../../scripts/generateUUID");
module.exports = {
  name: "uptime",
  aliases: [],
  usage: "ekle <link> - sil <uuid> - liste",
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
    const sunucu = client.guilds.cache.get(config.uptime.guildID);
    const durum = sunucu.members.cache.get(message.author.id);
    if (!durum)
      return message.reply({
        allowedMentions: { repliedUser: false },
        embeds: [
          await errorEmbed(
            `Bu komudu kullanabilmek için **\`[DISCORD](${config.uptime.guildURL})\`** sunucumuza katılmanız lazım`
          ),
        ],
      });
    const değer = args[0];
    if (değer === "ekle") {
      message.delete();
      const link = args[1];
      if (!link)
        return message.channel.send({
          content: `${message.author}`,
          embeds: [
            await errorEmbed(
              "Yanlış kullanım\nDoğru kullanım **{{prefix}}uptime ekle <link>**"
            ),
          ],
        });
      const uuid = await generateUUID();
      if (!uuid)
        return message.channel.send({
          content: `${message.author}`,
          embeds: [await errorEmbed()],
        });
      else {
        /*  if(link.indexOf("http://") == -1 || link.indexOf("https://") == -1)
               {
                   interaction.reply({content:`Lütfen bir geçerli link belirtin!`,ephemeral:true});
                    return;
               }
               else {*/
        const viptest = await db2.findOne({ userID: message.author.id });
        if (viptest) {
          try {
            fetch(link).then(async (x) => {
              const tarama = await db.findOne({ URL: x.url });
              if (tarama)
                return message.channel.send({
                  content: `${message.author}`,
                  embeds: [
                    await errorEmbed(
                      "Bu link sen ya da başka birisi tarafından eklenmiş"
                    ),
                  ],
                });
              await new db({
                UUID: uuid,
                userID: message.author.id,
                URL: x.url,
              })
                .save()
                .then(async (x) => {
                  const wbclient = new WebhookClient({
                    url: config.uptime.webhookURL,
                  });
                  wbclient.send({
                    embeds: [
                      await succesEmbed(
                        `<@${x.userID}> tarafından **${uuid}** uuidli websitesi eklendi!`
                      ),
                    ],
                  });
                  message.channel.send({
                    content: `${message.author}`,
                    embeds: [
                      await succesEmbed(
                        `**${uuid}** uuidli websiten başarıyla eklendi!`
                      ).then((embed) =>
                        embed.setFooter({
                          text: "Link'ler silme işleminde geçersizdir",
                        })
                      ),
                    ],
                  });
                });
            });
          } catch {
            message.channel.send({
              content: `${message.author}`,
              embeds: [await errorEmbed("Geçerli bir URL girin")],
            });
          }
        } else {
          const nopvip = await db.find({ userID: message.author.id });
          if (nopvip.length >= 5)
            message.channel.send({
              content: `${message.author}`,
              embeds: [
                await errorEmbed(
                  "Görünüşe bakılırsa **5** adet URL ekleme sınırına ulaşmışsın\nEğer daha fazla URL eklemek istiyorsan **VIP**'ye ne dersin?"
                ),
              ],
            });
          try {
            const tarama = await db.findOne({ URL: x.url });
            if (tarama)
              return message.channel.send({
                content: `${message.author}`,
                embeds: [
                  await errorEmbed(
                    "Bu link sen ya da başka birisi tarafından eklenmiş"
                  ),
                ],
              });
            await new db({
              UUID: uuid,
              userID: message.author.id,
              URL: x.url,
            })
              .save()
              .then(async (x) => {
                const wbclient = new WebhookClient({
                  url: config.uptime.webhookURL,
                });
                wbclient.send({
                  embeds: [
                    await succesEmbed(
                      `<@${x.userID}> tarafından **${uuid}** uuidli websitesi eklendi!`
                    ),
                  ],
                });
                message.channel.send({
                  content: `${message.author}`,
                  embeds: [
                    await succesEmbed(
                      `**${uuid}** uuidli websiten başarıyla eklendi!`
                    ).then((embed) =>
                      embed.setFooter({
                        text: "Link'ler silme işleminde geçersizdir",
                      })
                    ),
                  ],
                });
              });
          } catch {
            message.channel.send({
              content: `${message.author}`,
              embeds: [await errorEmbed("Geçerli bir URL girin")],
            });
          }
        }
      }
    } else if (değer === "sil") {
      const uuid = args[1];
      if (!uuid)
        return message.channel.send({
          content: `${message.author}`,
          embeds: [
            await errorEmbed(
              "Yanlış kullanım\nDoğru kullanım **{{prefix}}uptime sil <uuid>**"
            ),
          ],
        });
      if (config.admins.includes(message.author.id)) {
        try {
          const tarama = await db.findOne({
            UUID: uuid,
          });
          if (tarama) {
            await db.deleteOne({ UUID: uuid });
            const wbclient = new WebhookClient({
              url: config.uptime.webhookURL,
            });
            wbclient.send({
              content: `<@${tarama.userID}>`,
              embeds: [
                await succesEmbed(
                  `<@${message.author.id}> tarafından **${tarama.UUID}** uuidli websitesi silindi!`
                ),
              ],
            });
            message.channel.send({
              content: `${message.author}`,
              embeds: [
                await succesEmbed(
                  `**${tarama.UUID}** uuidli websitsi silindi!`
                ),
              ],
            });
          } else {
            message.channel.send({
              content: `${message.author}`,
              embeds: [await errorEmbed("Böyle bir link bulamadım")],
            });
          }
        } catch {
          message.channel.send({
            content: `${message.author}`,
            embeds: [await errorEmbed()],
          });
        }
      } else {
        try {
          const tarama = await db.findOne({
            userID: message.author.id,
            UUID: uuid,
          });
          if (tarama) {
            await db.deleteOne({ userID: message.author.id, UUID: uuid });
            const wbclient = new WebhookClient({
              url: config.uptime.webhookURL,
            });
            wbclient.send({
              embeds: [
                await succesEmbed(
                  `<@${tarama.userID}> tarafından **${tarama.UUID}** uuidli websitesi silindi!`
                ),
              ],
            });
            message.channel.send({
              content: `${message.author}`,
              embeds: [
                await succesEmbed(
                  `**${tarama.UUID}** uuidli websiten silindi!`
                ),
              ],
            });
          } else {
            message.channel.send({
              content: `${message.author}`,
              embeds: [await errorEmbed("Böyle bir link bulamadım")],
            });
          }
        } catch {
          message.channel.send({
            content: `${message.author}`,
            embeds: [await errorEmbed()],
          });
        }
      }
    } else if (değer === "liste") {
      const değer = args[1];
      if (değer === "tüm") {
        if (config.admins.includes(message.author.id)) {
          const link = await db.find();
          const map = link
            .map((x) => `${x.URL} -> <@${x.userID}> -> ${x.UUID}`)
            .join("\n\n");
          message.member
            .send({
              embeds: [await succesEmbed(map ? map : "Link bulunamadı")],
            })
            .then(async (x) => {
              message.reply({
                embeds: [await succesEmbed("DM'ye bak")],
              });
            })
            .catch(async (x) => {
              message.reply({
                embeds: [
                  await errorEmbed(
                    "DM'ye atamıyorum , Burası güvenli değil, DM'ye açtıktan sonra atabilirim"
                  ),
                ],
              });
            });
        }
      } else {
        const link = await db.find({ userID: message.author.id });
        const map = link.map((x) => `${x.URL} -> ${x.UUID}`).join("\n");
        message.member
          .send({
            embeds: [await succesEmbed(map ? map : "Link bulunamadı")],
          })
          .then(async (x) => {
            message.reply({
              embeds: [await succesEmbed("DM'ye bak")],
            });
          })
          .catch(async (x) => {
            message.reply({
              embeds: [
                await errorEmbed(
                  "DM'ye atamıyorum , Burası güvenli değil, DM'ye açtıktan sonra atabilirim"
                ),
              ],
            });
          });
      }
    } else {
      message.reply({
        allowedMentions: { repliedUser: false },
        embeds: [
          await errorEmbed(
            "Yanlış kullanım\nDoğru kullanım:**{{prefix}}uptime <ekle/sil/liste>**"
          ),
        ],
      });
    }
  },
};
