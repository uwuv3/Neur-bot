const { Schema, model } = require("mongoose");
module.exports = model(
  "otorol",
  new Schema({
    guildID: String,
    channelID: String,
    roleID: String,
  })
);
