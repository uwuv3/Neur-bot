const { Schema, model } = require("mongoose");
module.exports = model(
  "sayac",
  new Schema({
    guildID: String,
    channelID: String,
    number: Number,
  })
);
