const {
  createAudioResource,
  joinVoiceChannel,
  createAudioPlayer,
  StreamType,
} = require("@discordjs/voice");
const { Database } = require("nukleon");
const db = new Database("/db/radyo.json");
async function RadioRepeater(client, element) {
  let radyo = await db.get(`radyo_${element}`);
  let kanal = await db.get(`radyochannel_${element}`);
  let Channel = client.channels.cache.get(kanal);
  if (!radyo || !kanal || !Channel) return;

  try {
    var streamURL = radyo;
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
