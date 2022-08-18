const config = {
  mongodburl:
    "mongodb+srv://uwuv3:rkzgkHg8FMcL2mal@cluster0.hktzrvl.mongodb.net/?retryWrites=true&w=majority",
  intents:  131071, //https://ziad87.net/intents/
  prefix: "?",
  dmmsgchnl: "977846930975633438",
  color: "DARK_RED",
  admins: [
    "984439714851479593", //N๏ ภค๓є#8841
    "830008975335489567", //яєαм#8015
  ],
  properties: {
    browser: "Discord Android", // default : discord.js
  },
  presence: {
    status: "", //online,idle,dnd,offline
    activities: [`@NEUR - ?yardım`, "@NEUR - v0.0.7_BETA"],
    type: "Playing", //,Streaming,Listening,Watching,Custom,Competing
    changes: 10000,
  },
};
const emotes = {
  carpi: "<:no:1007310697341911040>",
  tik: "<:yes:1007310699904643163>",
  boost: "<a:boost:1008029593355161650>",
};
module.exports = { config, emotes };
