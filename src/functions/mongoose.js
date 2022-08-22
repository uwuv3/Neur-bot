const mongoose = require("mongoose"); //! Database modülü
const { config } = require("../../config"); //! config.js de olan ayarlar
module.exports = (client) => {
  mongoose
    .connect(config.mongodburl)
    .then(() =>
      console.log(
        `├─────────┬\n│ MONGODB │ -> Connected to mongodb\n├─────────•`
      )
    )
    .catch((err) => {
      console.log(
        `├─────────┬\n│ MONGODB │ -> Error connecting to mongodb\n├─────────•`
      );
      console.error(err);
    });
};
