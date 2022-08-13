const config = {
  intents: 131071, //https://ziad87.net/intents/
  prefix: "?",
  properties: {
    browser: "Discord Android", // default : discord.js
  },
  presence: {
    status: "dnd", //online,idle,dnd,offline
    activities: [
      "Aktifim olm ne bakıyon",
      "Bir zamanlar discord...",
      "v0.0.6.50_BETA",
    ],
    type: "Competing", //Playing,Streaming,Listening,Watching,Custom,Competing
    changes: 10000,
  },
};
module.exports = { config };
