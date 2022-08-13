const fetch = require("node-fetch");
const client = require("../..");
const hastebin = require("../../scripts/hastebin");
const {
  Client,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  ButtonInteraction,
} = require("discord.js");
const {
  Modal,
  showModal,
  TextInputComponent,
  SelectMenuComponent,
} = require("discord-modals");
client.on("modalSubmit", async (modal) => {
  if (modal.customId === "bot-modal") {
    const name = modal.getTextInputValue("id");
    const code = modal.getTextInputValue("prefix");
    const version = modal.getSelectMenuValues("onay");
    const page = await client.channels.cache.get("1005176913268068453").send({
      embeds: [
        new MessageEmbed()
          .setTitle("Yeni...")
          .setDescription(
            `Yapımcı : ${modal.user}\`(${modal.user.id})\`
Bot id : ${name}
Prefix : ${code}
Bot onaylı mı? : ${version}
`
          )
          .addField(
            `0 perm davet linki`,
            `[TIKLA](https://discord.com/api/oauth2/authorize?client_id=${name}&permissions=0&scope=bot)`
          )
          .addField(
            `8 perm davet linki`,
            `[TIKLA](https://discord.com/api/oauth2/authorize?client_id=${name}&permissions=8&scope=bot)`
          ),
      ],
      components: [
        new MessageActionRow().setComponents(
          new MessageButton()
            .setCustomId(`onay_${name}_${modal.user.id}`)
            .setLabel("Onayla")
            .setStyle("SUCCESS"),
          new MessageButton()
            .setCustomId(`red_${name}_${modal.user.id}`)
            .setLabel("Reddet")
            .setStyle("DANGER")
        ),
      ],
    });
    await modal.reply({
      content:
        "Botun yetkiliere iletildi en kısa sürede onay verirler inşallah",
      ephemeral: true,
    });
    const filter = (i) =>
      !i.member.bot || i.member.roles.cache.get("1007621580769214505");
    const collector = await page.createMessageComponentCollector({
      filter,
    });
    collector.on("collect", async (i) => {
      if (i.customId === `onay_${name}_${modal.user.id}`) {
        page.delete();
        modal.member
          .createDM()
          .then((c) => c.send(`Tebrikler **${name}** idli botun onaylandı!`))
          .catch((err) => console.log("Hata olmaması için uğraşıyorum"));
        await modal.member.roles.add("1007601540648927264");
        client.channels.cache
          .get("1005176910826979339")
          .send({
            content: `${modal.user},<@&1005176874575614034>`,
            embeds: [
              new MessageEmbed()
                .setColor("GREEN")
                .setDescription(
                  `<@${modal.user.id}> kişisinin **${name}** idli botu <@${i.member.id}> adlı kişi tarafından onaylandı`
                ),
            ],
          })
          .then((x) => x.react("<:tik:1007310699904643163>"));
      } else if (i.customId === `red_${name}_${modal.user.id}`) {
        page.delete();
        modal.member
          .createDM()
          .then((c) => c.send(`Üzgünüm ama **${name}** idli botun reddedildi!`))
          .catch((err) => console.log("Hata olmaması için uğraşıyorum"));
        client.channels.cache
          .get("1005176910826979339")
          .send({
            content: `${modal.user},<@&1005176874575614034>`,
            embeds: [
              new MessageEmbed()
                .setColor("RED")
                .setDescription(
                  `<@${modal.user.id}> kişisinin ${name} idli botu <@${i.member.id}> adlı kişi tarafından reddedildi`
                ),
            ],
          })
          .then((x) => {
            x.startThread({ name: "Neden?" }).then(async (x) => {
              x.send({ content: "Burada neden reddedildiğini yazabilirsiniz" });
              await x.setArchived();
            });
          });
      }
    });
  } else if (modal.customId === "kod-modal") {
    const name = modal.getTextInputValue("name");
    const code = modal.getTextInputValue("code");
    const version = modal.getSelectMenuValues("version");
    let codee = await hastebin(code);
    modal.channel
      .clone(`${version} - ${name}`, { reason: "Null" })
      .then(async (chnl) => {
        chnl.setName(`${version} - ${name}`);
        chnl.setPosition(modal.channel.position);
        await modal.channel.setPosition(0);
        await chnl.send({
          embeds: [
            new MessageEmbed()
              .setTitle(modal.user.tag)
              .setDescription(`<${codee}>`),
          ],
        });
        modal.reply({ content: `${chnl}`, ephemeral: true });
      });
  }
});
client.on("interactionCreate", async (int) => {
  if (int.isButton()) {
    if (int.customId === "kod") {
      let role = int.member.roles.cache.get("1007218091563962400");
      if (!role)
        return int.reply({
          content: `Kod paylaşabilmek için <@&1007218091563962400> Rolüne sahip olman gerek \n Almak için <#1006569615767384157> kanalına bakınız`,
          ephemeral: true,
        });
      const modal = new Modal()
        .setCustomId("kod-modal")
        .setTitle("Kodlama paneli")
        .addComponents(
          new TextInputComponent()
            .setCustomId("name")
            .setMaxLength(50)
            .setMinLength(10)
            .setLabel("Kodun adı?")
            .setStyle("SHORT")
            .setRequired(true),
          new TextInputComponent()
            .setCustomId("code")
            .setMaxLength(3500)
            .setMinLength(35)
            .setLabel("Kod?")
            .setStyle("LONG")
            .setRequired(true),
          new SelectMenuComponent()
            .setCustomId("version")
            .setPlaceholder("Versiyon?")
            .setMaxValues(1)
            .addOptions(
              {
                label: "v14",
                description: "Discord.js verison 14",
                value: "v14",
              },
              {
                label: "v13",
                description: "Discord.js verison 13",
                value: "v13",
              },
              {
                label: "v12",
                description: "Discord.js verison 12",
                value: "v12",
              },
              {
                label: "v11",
                description: "Discord.js verison 11",
                value: "v11",
              }
            )
        );
      showModal(modal, {
        client: client,
        interaction: int,
      });
    } else if (int.customId === "bot") {
      const modal = new Modal()
        .setCustomId("bot-modal")
        .setTitle("Bot paylaşma paneli")
        .addComponents(
          new TextInputComponent()
            .setCustomId("id")
            .setMinLength(18)
            .setMaxLength(18)
            .setLabel("Botun id?")
            .setStyle("SHORT")
            .setPlaceholder("1234567890123456789")
            .setRequired(true),
          new TextInputComponent()
            .setCustomId("prefix")
            .setMaxLength(3)
            .setMinLength(1)
            .setLabel("Botun prefixi")
            .setStyle("SHORT")
            .setPlaceholder("!,/,?")
            .setRequired(true),
          new SelectMenuComponent()
            .setCustomId("onay")
            .setPlaceholder("Bot onaylı mı?")
            .setMaxValues(1)
            .addOptions(
              {
                label: "hayır",
                description: "Discord tarafondan onaysız",
                value: "hayir",
              },
              {
                label: "evet",
                description: "Discord tarafondan onaylı",
                value: "evet",
              }
            )
        );
      showModal(modal, {
        client: client,
        interaction: int,
      });
    }
  }
});
