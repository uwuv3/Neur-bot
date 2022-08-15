const config = {
  mongodburl:
    "mongodb+srv://uwuv3:rkzgkHg8FMcL2mal@cluster0.hktzrvl.mongodb.net/?retryWrites=true&w=majority",
  intents: 131071, //https://ziad87.net/intents/
  prefix: "?",
  admins: [
    "984439714851479593", //N๏ ภค๓є#8841
    "1008369675484278905", //яєαм#8015
  ],
  properties: {
    browser: "Discord Android", // default : discord.js
  },
  presence: {
    status: "dnd", //online,idle,dnd,offline
    activities: [
      "Aktifim olm ne bakıyon",
      "Bir zamanlar discord...",
      "v0.0.6.85_BETA",
    ],
    type: "Competing", //Playing,Streaming,Listening,Watching,Custom,Competing
    changes: 10000,
  },
};
const emotes = {
  carpi: "<:no:1007310697341911040>",
  tik: "<:yes:1007310699904643163>",
  boost: "<a:boost:1008029593355161650>",
};
module.exports = { config, emotes };
