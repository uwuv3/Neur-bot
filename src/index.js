const { config } = require("../config");
const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const logs = require('discord-logs');
const modals = require("discord-modals");
const client = new Client({
  intents: config.intents,
  ws: { properties: { $browser: config.properties.browser } },
});
modals(client);
logs(client);
module.exports = client;

global.cmd_cooldown = new Map();
global.commands = new Collection();
global.aliases = new Collection();
global.scommands = new Collection();
global.events = new Collection();

client.login(process.env.TOKEN);

const handler = readdirSync("./src/functions").filter((file) =>
  file.endsWith(".js")
);
for (file of handler) {
  require(`./functions/${file}`)(client);
}
