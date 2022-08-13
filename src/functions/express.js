const express = require("express");
const app = express();
const PORT = process.env.PORT || "8080";
module.exports = (client) => {
  client.on("ready", async () => {
    app.get("/", function (req, res) {
      res.render("./index.ejs", {
        avatarURL: client.user.avatarURL(),
        name: client.user.username,
        ping: client.ws.ping,
        users: client.users.cache.size,
      });
    });
    appCreate();
  });
  function appCreate() {
    app.listen(PORT, function (err) {
      if (err) {
        console.log(
          `├─────────┬\n│ EXPRESS │ -> There was an error while preparing\n├─────────•`
        );
        console.error(err);
        appCreate;
      } else {
        console.log(
          `├─────────┬\n│ EXPRESS │ -> Prepared with ${PORT} port\n├─────────•`
        );
      }
    });
  }
};
