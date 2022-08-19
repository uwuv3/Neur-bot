const { MessageEmbed, Message, Client } = require("discord.js");
const { readdirSync } = require("fs");
const { config } = require("../../../config");
const prefix = config.prefix;

module.exports = {
  name: "yardım",
  aliases: [],
  cooldown: 5000,
  adminOnly: false,
  /**
   *
   * @param {Message} message
   * @param {Client} client
   * @param {String[]} args
   */
  run: async (message, client, args) => {
    if (!args[0]) {
      const ignored = ["bot", "template.js"];
      let categories = [];
      readdirSync("./src/commands/").forEach((dir) => {
        if (ignored.includes(dir.toLowerCase())) return;
        const command = readdirSync(`./src/commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const name = `${dir.toUpperCase()}`;
        let cats = new Object();
        let cmds = [];
        for (let file of command) {
          let pull = require(`../${dir}/${file}`);
          if (pull.name) {
            cmds.push(pull.name);
          } else {
            continue;
          }
        }
        cats = {
          name: name,
          value: `\`${cmds.join("\n")}\``,
          inline: true,
        };

        categories.push(cats);
      });
      const embed = new MessageEmbed()
        .setTitle("Yardım menüsü")
        .addFields(categories)
        .setFooter({
          text: `${message.author.tag} istedi`,
          iconURL: message.author.displayAvatarURL({
            dynamic: true,
          }),
        })
        .setTimestamp()
        .setThumbnail(
          client.user.displayAvatarURL({
            dynamic: true,
          })
        )
        .setColor(config.color);
      message.reply({ embeds: [embed] });
    }
  },
};
