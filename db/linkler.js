const { Schema, model } = require("mongoose");
module.exports = model(
  "link",
  new Schema({
    UUID: String,
    userID: String,
    URL: String,
  })
);
