const { Schema, model } = require("mongoose");
module.exports = model(
  "link",
  new Schema({
    name: String,
    userID: String,
    URL: String,
  })
);
