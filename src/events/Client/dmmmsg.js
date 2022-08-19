const client = require("../../index");
const { MessageEmbed, MessageAttachment } = require("discord.js");
const { config } = require("../../../config");
client.on("messageCreate", async (message) => {
  if (message.channel.type === "DM") {
    if (message.author.bot) return;
    message.reply("Mesajınızı ilettik ...");
    const dmsg = new MessageEmbed()
      .setTitle(`${client.user.username} - DM mesaj`)
      .setColor(config.color)
      .addFields([
        { name: "Mesajı gönderen :", value: message.author.tag },
        {
          name: "Gönderilen mesaj:",
          value: message.content ? message.content : "Bir mesaj yok",
        },
      ])
      .setThumbnail(message.author.avatarURL());
    let files = [];
    if (message.attachments > 0) message.attachments;
    message.attachments.map((x) => files.push(x.url));
    client.channels.cache
      .get(config.dmmsgchnl)
      .send({
        embeds: [dmsg],
        content: `Gönderdiği dosyalar :\n${files.join("\n")}`,
      });
  }
});
