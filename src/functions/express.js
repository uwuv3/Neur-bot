const express = require("express"); //! Express modülü
const { config } = require("../../config"); //! Ayarlar modülü
const app = express(); //! Express to web
const PORT = process.env.PORT || "8080"; //! Web port
app.use(express.static(`${process.cwd()}/assets`));
module.exports = (client) => {
  client.on("ready", async () => {
    app.get("/", function (req, res) {
      res.render("./index.ejs", {
        botavatarURL: client.user.avatarURL(),
        botname: client.user.username,
        color: config.color,
        description: config.desc,
        ping: client.ws.ping,
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
