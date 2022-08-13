import { readdirSync } from "fs";
exports = (client) => {
  readdirSync("./src/events/").forEach((dir) => {
    const events = readdirSync(`./src/events/${dir}`).filter((file) =>
      file.endsWith(".js")
    );

    for (let file of events) {
      let pull = require(`../events/${dir}/${file}`);

      if (pull.name) {
        global.events.set(pull.name, pull);
      } else {
        continue;
      }
    }
  });
};
