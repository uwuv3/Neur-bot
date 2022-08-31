const client = require("../../index");
const RadioRepeater = require("../../scripts/radyo/yayın");
client.on("ready", async () => {
  client.guilds.cache.map((x) => {
    RadioRepeater(client, x.id);
    setInterval(() => RadioRepeater(client, x.id), Math.max(3600000));
  });
});
