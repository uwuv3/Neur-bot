const client = require("../../index");
client.msgsil = new Set();

client.on("messageCreate", async (message) => {
  if (client.msgsil.has(`${message.channelId}`)) {
    setTimeout(() => {
      message.delete().catch(() => {});
    }, 10000);
  }
});
