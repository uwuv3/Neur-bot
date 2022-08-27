const { config, emotes } = require("../../../config"); //! config.js de olan ayarlar ve emojiler
const client = require("../../index"); //! client(bot) gösterme
const PermissionsFlags = require("../../../perm_flags"); //! Bot yetki listesi
const { MessageEmbed } = require("discord.js"); //! Mesaj embed modülü
const vip = require("../../../db/vip");
const { errorEmbed } = require("../../scripts/embeds");
const prefix = config.prefix;
const command_cooldowns = global.cmd_cooldown;

client.on("messageCreate", async (message) => {
  if (!message.inGuild()) return;
  //other
  const etiketler = [`<@${client.user.id}>`, `<@!${client.user.id}>`];
  if (message.author.bot) return;
  if (etiketler.includes(message.content))
    return message.reply({
      embeds: [
        new MessageEmbed()
          .setColor(config.color)
          .setDescription("Prefixim :`" + prefix + "`"),
      ],
    });
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).split(/ +/g);

  const cmd = args.shift().toLowerCase();
  if (cmd.length == 0) return;
  let command = global.commands.get(cmd);
  if (!command) command = global.commands.get(global.aliases.get(cmd));
  const nocmd = await errorEmbed(
    "Böyle bir komudum yok\nTüm komutlarımı öğrenmek için {{prefix}}yardım"
  );
  if (!command)
    return message
      .reply({
        embeds: [nocmd],
        allowedMentions: { repliedUser: false },
      })
      .then((x) => {
        setTimeout(() => {
          x.delete();
        }, 5000);
      });
  if (!message.member) client.users.cache.get(message.author.id);
  //Only
  if (command.adminOnly) {
    if (!config.admins.includes(message.author.id))
      return message
        .reply({
          embeds: [await errorEmbed("Bu komut botun en üst yetkilerine özel")],
          allowedMentions: { repliedUser: false },
        })
        .then((x) => {
          setTimeout(() => {
            x.delete();
          }, 5000);
        });
  }
  if (command.vipOnly) {
    const viptest = await vip.findOne({ userID: message.author.id });
    if (!viptest)
      return message
        .reply({
          embeds: [await errorEmbed("Bu komut VIP'lere özel")],
          allowedMentions: { repliedUser: false },
        })
        .then((x) => {
          setTimeout(() => {
            x.delete();
          }, 5000);
        });
  }
  //perm
  if (command.permission && command.permission.length) {
    for (const permission of command.permission) {
      if (!PermissionsFlags.includes(permission)) {
        return console.log(`Invalid Permissions : ${permission}`);
      }
      let invalidUser = [];
      if (!message.member.permissions.has(permission)) {
        invalidUser.push(permission);
      }
      let bot = [];
      if (!message.guild.me.permissions.has(permission)) {
        bot.push(permission);
      }
      if (bot.length > 0) {
        const noPermissionEmbed = new MessageEmbed()
          .setColor("RED")

          .setDescription(`Benim \`${bot}\` yetkisine ihtiyacım var`)
          .setFooter({ text: emotes.carpi });

        return message.reply({
          embeds: [noPermissionEmbed],
          allowedMentions: { repliedUser: false },
        });
      }
      if (invalidUser.length > 0) {
        const noPermissionEmbed = new MessageEmbed()
          .setColor("RED")

          .setDescription(
            `Bu komudu kullanabilmen için \`${invalidUser}\` izinlerine yetkin olmalı`
          )
          .setFooter({ text: emotes.carpi });
        return message.reply({
          embeds: [noPermissionEmbed],
          allowedMentions: { repliedUser: false },
        });
      }
    }
  }
  //cooldown
  if (command.cooldown) {
    if (command_cooldowns.get(`${message.author.id}:${command.name}`)) {
      const embed = new MessageEmbed()
        .setTitle(emotes.carpi)
        .setDescription(
          `\`${command.name}\` komudunda \`${
            command.cooldown / 1000
          }saniye\` cooldown var. Yeniden kullanabilmen için\`${
            command_cooldowns.get(`${message.author.id}:${command.name}`) / 1000
          }saniye\` beklemelisin`
        )
        .setColor("RED");

      return message.reply({
        embeds: [embed],
        allowedMentions: { repliedUser: false },
      });
    } else {
      var cooldown = command.cooldown;
      command_cooldowns.set(`${message.author.id}:${command.name}`, cooldown);

      var interval = setInterval(function () {
        command_cooldowns.set(`${message.author.id}:${command.name}`, cooldown);
        cooldown -= 100;
      }, 100);

      setTimeout(function () {
        clearInterval(interval);
        command_cooldowns.delete(`${message.author.id}:${command.name}`);
      }, command.cooldown);
    }
  }
  if (command) {
    /**
     *
     * @param {message} message
     * @param {client} client
     * @param {String[]} args
     */
    /* const fetch = require("node-fetch");
    await fetch(
      `https://top.gg/api/bots/${client.user.id}/check?userId=${message.author.id}`,
      {
        Headers: {
          Authorization: config.topggtoken,
        },
      }
    ).then(async (response) => {
      var check = response.body.voted;
      if (check === 1) {*/
    await command.run(message, client, args);
    // }
    // });
  }
});
