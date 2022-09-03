const { Schema, model } = require("mongoose");
module.exports = model(
  "radyo",
  new Schema({
    guildID: String,
    channelID: String,
    radyoURL: String,
  })
);
