const client = require("../../index");
client.msgsil = new Set();

client.on("ready", async () => {
  setInterval(() => {
    client.channels.cache.each((Kanal) => {
      if (client.msgsil.has(`${Kanal.id}`)) {
        Kanal.bulkDelete(1);
      }
    });
  }, 10000);
});
