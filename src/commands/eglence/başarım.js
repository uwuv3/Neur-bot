const {
  MessageAttachment,
  MessageEmbed,
  Message,
  Client,
} = require("discord.js");
const fetch = require("node-fetch");
const { emotes, config } = require("../../../config");
const { errorEmbed } = require("../../scripts/embeds");
module.exports = {
  name: "başarım",
  aliases: ["basarim", "mc-başarım", "mc-basarım", "mc-başarım"],
  cooldown: 5000,
  adminOnly: false,
  /**
   *
   * @param {Message} message
   * @param {Client} client
   * @param {String[]} args
   */
  run: async (message, client, args) => {
    let [title, contents] = args.join(" ").split("|");
    if (!title && !contents)
      message
        .reply({
          embeds: [
            await errorEmbed(
              "Yanlış kullanım \n Doğru kullanım **{{prefix}}başarım <title|content>**"
            ),
          ],
        })
        .then((msg) =>
          setTimeout(() => {
            msg.delete();
          }, 5000)
        );
    if (!contents) {
      [title, contents] = ["Yeni basarim kazanildi", title];
    }
    if (!title)
      return message
        .reply({
          embeds: [
            await errorEmbed(
              "Yanlış kullanım\nDoğru kullanım **{{prefix}}başarım <title|content>**"
            ),
          ],
        })
        .then((msg) =>
          setTimeout(() => {
            msg.delete();
          }, 5000)
        );
    let rnd = Math.floor(Math.random() * 39 + 1);
    if (args.join(" ").toLowerCase().includes("grass")) rnd = 1;
    if (args.join(" ").toLowerCase().includes("diamond")) rnd = 2;
    if (args.join(" ").toLowerCase().includes("burn")) rnd = 38;
    if (args.join(" ").toLowerCase().includes("cookie")) rnd = 21;
    if (args.join(" ").toLowerCase().includes("cake")) rnd = 10;

    if (title.length > 22 || contents.length > 22)
      return message
        .reply({
          embeds: [
            await errorEmbed(
              "`Title | Content` arasında en fazla 22 karakter kullanabilirsin"
            ),
          ],
        })
        .then((msg) =>
          setTimeout(() => {
            msg.delete();
          }, 5000)
        );
    const url = `https://www.minecraftskinstealer.com/achievement/a.php?i=${rnd}&h=${encodeURIComponent(
      title
    )}&t=${encodeURIComponent(contents)}`;
    const img = await fetch(url).then((img) => {
      return img.body;
    });
    const image = new MessageAttachment(img, "neur.png");
    message.reply({ files: [image] });
  },
};
