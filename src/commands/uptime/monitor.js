const { MessageEmbed, Message, Client } = require("discord.js");
const { default: fetch } = require("node-fetch");
const { config, emotes } = require("../../../config");
const db = require("../../../db/linkler");
const db2 = require("../../../db/vip");
module.exports = {
  name: "uptime",
  aliases: [],
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
          new MessageEmbed()
            .setColor(config.color)
            .setDescription(
              emotes.carpi +
                `Bu komutu kullanabilmen için sunucumuza katılman gerek\n [DISCORD](${config.uptime.guildInvite})`
            ),
        ],
      });
    const rol = sunucu.roles.cache.get(config.uptime.roleID);
    if (!durum.roles.cache.get(config.uptime.roleID))
      return message.reply({
        allowedMentions: { repliedUser: false },
        embeds: [
          new MessageEmbed()
            .setColor(config.color)
            .setDescription(
              emotes.carpi +
                `Bu komudu kullanabilmek ${rol}\`${rol.name}\` rolü olması lazım`
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
            new MessageEmbed()
              .setColor(config.color)
              .setDescription(emotes.carpi + "Bir link belirt"),
          ],
        });
      const isim = args.slice(2).join(" ");
      if (!isim)
        return message.channel.send({
          content: `${message.author}`,
          embeds: [
            new MessageEmbed()
              .setColor(config.color)
              .setDescription(emotes.carpi + "Bir isim belirt"),
          ],
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
                    new MessageEmbed()
                      .setColor(config.color)
                      .setDescription(
                        emotes.carpi +
                          "Bu link sen ya da başka birisi tarafından eklenmiş"
                      ),
                  ],
                });
              await new db({
                name: isim,
                userID: message.author.id,
                URL: x.url,
              })
                .save()
                .then((x) => {
                  const wbclient = new WebhookClient({
                    url: config.uptime.webhookURL,
                  });
                  wbclient.send({
                    embeds: [
                      new MessageEmbed()
                        .setColor(config.color)
                        .setDescription(
                          emotes.tik +
                            `<@${x.userID}> tarafından **${x.name}** adlı websitesi eklendi!`
                        ),
                    ],
                  });
                  message.channel.send({
                    content: `${message.author}`,
                    embeds: [
                      new MessageEmbed()
                        .setColor(config.color)
                        .setDescription(emotes.tik + "URL Başarıyla eklendi"),
                    ],
                  });
                });
            });
          } catch {
            message.channel.send({
              content: `${message.author}`,
              embeds: [
                new MessageEmbed()
                  .setColor(config.color)
                  .setDescription(emotes.carpi + "Lütfen doğru bir url verin"),
              ],
            });
          }
        } else {
          const nopvip = await db.find({ userID: message.author.id });
          if (nopvip.length >= 5)
            message.channel.send({
              content: `${message.author}`,
              embeds: [
                new MessageEmbed()
                  .setColor(config.color)
                  .setDescription(
                    emotes.carpi +
                      "En fazla 5 tane link ekleyebilirsin \n Eğer daha fazla link eklemek istiyorsan **VIP** üyeliğine ne dersin?"
                  ),
              ],
            });
          try {
            fetch(link).then(async (x) => {
              const tarama = await db.findOne({ URL: x.url });
              if (tarama)
                return message.channel.send({
                  content: `${message.author}`,
                  embeds: [
                    new MessageEmbed()
                      .setColor(config.color)
                      .setDescription(
                        emotes.carpi +
                          "Bu link sen ya da başka birisi tarafından eklenmiş"
                      ),
                  ],
                });
              await new db({
                name: isim,
                userID: message.author.id,
                URL: x.url,
              })
                .save()
                .then((x) => {
                  const wbclient = new WebhookClient({
                    url: config.uptime.webhookURL,
                  });
                  wbclient.send({
                    embeds: [
                      new MessageEmbed()
                        .setColor(config.color)
                        .setDescription(
                          emotes.tik +
                            `<@${x.userID}> tarafından **${x.name}** adlı websitesi eklendi!`
                        ),
                    ],
                  });
                  message.channel.send({
                    content: `${message.author}`,
                    embeds: [
                      new MessageEmbed()
                        .setColor(config.color)
                        .setDescription(emotes.tik + "URL Başarıyla eklendi"),
                    ],
                  });
                });
            });
          } catch {
            message.channel.send({
              content: `${message.author}`,
              embeds: [
                new MessageEmbed()
                  .setColor(config.color)
                  .setDescription(emotes.carpi + "Lütfen doğru bir url verin"),
              ],
            });
          }
        }
      }
    } else if (değer === "sil") {
      message.delete();
      const link = args[1];
      if (!link)
        return message.channel.send({
          content: `${message.author}`,
          embeds: [
            new MessageEmbed()
              .setColor(config.color)
              .setDescription(emotes.carpi + "Bir link belirt"),
          ],
        });
      try {
        fetch(link).then(async (x) => {
          const tarama = await db.findOne({
            userID: message.author.id,
            URL: x.url,
          });
          if (tarama) {
            await db.deleteOne({ userID: message.author.id, URL: x.url });
            const wbclient = new WebhookClient({
              url: config.uptime.webhookURL,
            });
            wbclient.send({
              embeds: [
                new MessageEmbed()
                  .setColor(config.color)
                  .setDescription(
                    emotes.tik +
                      `<@${tarama.userID}> tarafından **${tarama.name}** adlı websitesi kaldırıldı!`
                  ),
              ],
            });
            message.channel.send({
              content: `${message.author}`,
              embeds: [
                new MessageEmbed()
                  .setColor(config.color)
                  .setDescription(emotes.tik + "Başarıyla link silindi"),
              ],
            });
          } else {
            message.channel.send({
              content: `${message.author}`,
              embeds: [
                new MessageEmbed()
                  .setColor(config.color)
                  .setDescription(
                    emotes.carpi + "Databasede böyle bir link bulamadım"
                  ),
              ],
            });
          }
        });
      } catch {
        message.channel.send({
          content: `${message.author}`,
          embeds: [
            new MessageEmbed()
              .setColor(config.color)
              .setDescription(emotes.carpi + "Hata çıktı ,Böyle bir URL yok"),
          ],
        });
      }
    } else if (değer === "liste") {
      const değer = args[1];
      if (değer === "tüm") {
        if (!config.admins.includes(message.author.id))
          return message.reply({
            embeds: [
              new MessageEmbed()
                .setColor("RED")
                .setDescription(
                  emotes.carpi + "Bu komut botun adminlerine özel"
                ),
            ],
            allowedMentions: { repliedUser: false },
          });
        const link = await db.find();
        const map = link
          .map((x) => `${x.URL} -> <@${x.userID}>\`${x.userID}\` -> ${x.name}`)
          .join("\n");
        message.member
          .send({
            embeds: [
              new MessageEmbed()
                .setColor(config.color)
                .setDescription(map ? map : "Link bulunamadı"),
            ],
          })
          .then((x) => {
            message.reply({
              embeds: [
                new MessageEmbed()
                  .setColor(config.color)
                  .setDescription("DM'ye bak"),
              ],
            });
          })
          .catch((x) => {
            message.reply({
              embeds: [
                new MessageEmbed()
                  .setColor(config.color)
                  .setDescription(
                    "DM'ye atamıyorum , Burası güvenli değil, DM'ye açtıktan sonra atabilirim"
                  ),
              ],
            });
          });
      } else {
        const link = await db.find({ userID: message.author.id });
        const map = link.map((x) => x.URL).join("\n");
        message.member
          .send({
            embeds: [
              new MessageEmbed()
                .setColor(config.color)
                .setDescription(map ? map : "Link bulunamadı"),
            ],
          })
          .then((x) => {
            message.reply({
              embeds: [
                new MessageEmbed()
                  .setColor(config.color)
                  .setDescription("DM'ye bak"),
              ],
            });
          })
          .catch((x) => {
            message.reply({
              embeds: [
                new MessageEmbed()
                  .setColor(config.color)
                  .setDescription(
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
          new MessageEmbed()
            .setColor(config.color)
            .setDescription(
              emotes.carpi +
                `Yanlış kullanım\nDoğru kullanım:**${config.prefix}uptime <ekle/sil/liste>**`
            ),
        ],
      });
    }
  },
};
