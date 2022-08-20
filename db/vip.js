const { Schema, model } = require("mongoose");
module.exports = model(
  "vip",
  new Schema({
    userID: String,
  })
);
