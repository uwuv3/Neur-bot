const { Schema, model } = require("mongoose");
module.exports = model(
  "boostlog",
  new Schema({
    guildID: String,
    channelID: String,
  })
);
