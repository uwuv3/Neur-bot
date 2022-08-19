const express = require("express"); //! Express modülü
const app = express(); //! Express to web
const PORT = process.env.PORT || "8080"; //! Web port
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
    app.set("view engine", "ejs");
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
