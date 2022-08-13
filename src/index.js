import { config } from "../config";
import { Client, Collection } from "discord.js";
import { readdirSync } from "fs";

export const client = new Client({
  intents: config.intents,
  ws: { properties: { $browser: config.properties.browser } },
});

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
