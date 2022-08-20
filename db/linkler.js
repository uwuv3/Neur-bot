const { Schema, model } = require("mongoose");
module.exports = model(
  "link",
  new Schema({
    userID: String,
    URL: String,
  })
);
