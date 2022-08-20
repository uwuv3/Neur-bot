const client = require("../../index");
const db = require("../../../db/otorol");
const { config } = require("../../../config");
const { MessageEmbed } = require("discord.js");
client.on("guildMemberAdd", async (member) => {
  const { channelID, roleID } = (await db.findOne({
    guildID: member.guild.id,
  })) || {
    channelID: null,
    roleID: null,
  };
  if (roleID) {
    try {
      member.roles.add(roleID);
      if (channelID) {
        const rol = client.guilds.cache
          .get(member.guild.id)
          .roles.cache.get(roleID);

        client.channels.cache.get(channelID).send({
          embeds: [
            new MessageEmbed()
              .setColor(config.color)
              .setDescription(
                `${member} sunucuya katıldı ve ${rol} adlı rolü aldı`
              ),
          ],
        });
      } else {
      }
    } catch (error) {
      await db.deleteOne({ guildID: member.guild.id }); // ! Hata alırsa dbden silmesi
    }
  } else {
  }
});
