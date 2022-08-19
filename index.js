console.clear(); // * konsol temizlenmesi
const { ShardingManager } = require("discord.js");
const { config } = require("dotenv");
config();
const manager = new ShardingManager("./src/index.js", {
  token: process.env.TOKEN,
});
setInterval(() => {
  manager.respawnAll();
  console.log(
    `├──────────┬\n│ SHARDING │ -> All shards rebooted\n├──────────•`
  );
}, 86400000); // * Günlük shard yenilnmesi

manager.on("shardCreate", (shard) =>
  console.log(
    `├──────────┬\n│ SHARDING │ -> Created shard ${shard.id}\n├──────────•`
  )
);

manager.spawn();
