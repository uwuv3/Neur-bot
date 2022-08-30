const client = require("../../index");
const { config } = require("../../../config");
const { joinVoiceChannel } = require("@discordjs/voice");
client.on("ready", async () => {
  const channel = await client.channels.cache.get(config.voicechannelID);
  voice();
  function voice() {
    const con = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      selfDeaf: true,
      selfMute: true,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });

    if (con.disconnect) return setTimeout(() => voice(), 5000);
    if (con.destroy) con.rejoin();
  }
});
