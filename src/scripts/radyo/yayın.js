const {
  createAudioResource,
  joinVoiceChannel,
  createAudioPlayer,
  StreamType,
} = require("@discordjs/voice");
require("../../../db/radyo");
async function RadioRepeater(client, value) {
  const { channelID, radyoURL } = (await db.findOne({ guildID: value })) || {
    channelID: null,
    radyoURL: null,
  };
  if (!channelID || !radyoURL || !value) return;
  let Channel = client.channels.cache.get(channelID);

  try {
    var streamURL = radyoURL;
    const player = createAudioPlayer();
    const resource = createAudioResource(streamURL, {
      inputType: StreamType.Arbitrary,
      silencePaddingFrames: 5,
      inlineVolume: false,
    });
    const con = joinVoiceChannel({
      channelId: Channel.id,
      guildId: Channel.guildId,
      selfDeaf: true,
      selfMute: false,
      adapterCreator: Channel.guild.voiceAdapterCreator,
    });
    player.play(resource);
    con.subscribe(player);
  } catch {
    console.log("Radyo Yayın istemcisinde Hata Oluştu!");
  }
}
module.exports = RadioRepeater;
