const { config } = require("../config"); //! config.js de olan ayarlar
const { Client, Collection } = require("discord.js"); //! Bot kurulumu için gerekli modül
const { readdirSync } = require("fs"); //! Function dosya görme modülü
const logs = require("discord-logs"); //! Bot kurulumu  - Log atma modülü
const modals = require("discord-modals"); //! Bot kurulumu - Modal gösterme modülü
const client = new Client({
  intents: config.client.intents,
  partials: config.client.partials,
  ws: { properties: { $browser: config.client.properties.browser } },
});
modals(client);
logs(client);
module.exports = client; //! client(bot) gösterimi

global.cmd_cooldown = new Map(); //! Komut cooldown
global.commands = new Collection(); //! Komut kaydetme
global.aliases = new Collection(); //! Komut - diğer seçenekler kaydetme
global.events = new Collection(); //! Event kaydetme

client.login(process.env.TOKEN); //! client(bot) giriş tokeni

const handler = readdirSync("./src/functions").filter((file) =>
  file.endsWith(".js")
);
for (file of handler) {
  require(`./functions/${file}`)(client);
}
