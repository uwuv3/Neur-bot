const config = {
  mongodburl:"mongodb+srv://uwuv3:rkzgkHg8FMcL2mal@cluster0.hktzrvl.mongodb.net/?retryWrites=true&w=majority",
  intents: 131071, //https://ziad87.net/intents/
  prefix: "?",
  admins: ["984439714851479593"],
  properties: {
    browser: "Discord Android", // default : discord.js
  },
  presence: {
    status: "dnd", //online,idle,dnd,offline
    activities: [
      "Aktifim olm ne bakıyon",
      "Bir zamanlar discord...",
      "v0.0.6.83_BETA",
    ],
    type: "Competing", //Playing,Streaming,Listening,Watching,Custom,Competing
    changes: 10000,
  },
};
module.exports = { config };
