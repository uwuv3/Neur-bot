const { config, emotes } = require("../../../config");
const client = require("../../index");
const PermissionsFlags = require("../../../perm_flags");
const { MessageEmbed } = require("discord.js");
const prefix = config.prefix;
const command_cooldowns = global.cmd_cooldown;

client.on("messageCreate", async (message) => {
  //other
  const etiketler = [`<@${client.user.id}>`, `<@!${client.user.id}>`];
  if (message.author.bot) return;
  if (etiketler.includes(message.content))
    return message.reply({
      embeds: [
        new MessageEmbed()
          .setColor("DARK_RED")
          .setDescription("Prefixim :`" + prefix + "`"),
      ],
    });
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).split(/ +/);

  const cmd = args.shift().toLowerCase();
  if (cmd.length == 0) return;
  let command = global.commands.get(cmd);
  if (!command) command = global.commands.get(global.aliases.get(cmd));
  if (!command)
    return message
      .reply({
        embeds: [
          new MessageEmbed()
            .setColor("RED")
            .setDescription(emotes.carpi + "Böyle bir komudum yok"),
        ],
        allowedMentions: { repliedUser: false },
      })
      .then((x) => {
        setTimeout(() => {
          x.delete();
        }, 5000);
      });
  if (!message.member) client.users.cache.get(message.author.id);
  //Only
  if (command.adminOnly === true) {
    if (!config.admins.includes(message.author.id))
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor("RED")
            .setDescription(emotes.carpi + "Bu komut botun adminlerine özel"),
        ],
        allowedMentions: { repliedUser: false },
      });
  }
  //perm
  if (!command) return;
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
     * @param {Message} message
     * @param {Client} client
     * @param {String[]} args
     */
    await command.run(message, client, args);
  }
});
