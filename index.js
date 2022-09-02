console.clear(); //TODO:Konsolun temizlenmesini istemiyorsan kapat
const { ShardingManager } = require("discord.js"); //! Shard için gerekli modül
const { config } = require("dotenv");
config(); //! .env modülü
const manager = new ShardingManager("./src/index.js", {
  token: process.env.TOKEN,
}); //! Shard kurulumu
setInterval(() => {
  manager.respawnAll();
  console.log(
    `├──────────┬\n│ SHARDING │ -> Tüm shardlar yenilendi\n├──────────•`
  );
}, 86400000); //! Günlük shard yenilenmesini gerçekleşitirir

manager.on("shardCreate", (shard) =>
  console.log(
    `├──────────┬\n│ SHARDING │ -> ${shard.id} idli shard başlatıldı\n├──────────•`
  )
); //! Shard aktif olunca loga mesaj atmasını sağlar

manager.spawn(); //! Shard aktifleştirir
setTimeout(()=>process.exit(),Math.max(5400000))
