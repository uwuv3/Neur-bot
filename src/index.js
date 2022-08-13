const { config } = require("../config");
const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");

const client = new Client({
  intents: config.intents,
  ws: { properties: { $browser: config.properties.browser } },
});
module.exports = client
client.login(process.env.TOKEN);

const handler = readdirSync("./src/functions").filter((file) =>
  file.endsWith(".js")
);
for (file of handler) {
  require(`./functions/${file}`)(client);
}

global.cmd_cooldown = new Map();
global.commands = new Collection();
global.aliases = new Collection();
global.scommands = new Collection();
global.events = new Collection();
