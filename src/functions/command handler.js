const { readdirSync } = require("fs"); //! Komut görme modülü
module.exports = (client) => {
  readdirSync("./src/commands/").forEach((dir) => {
    if (dir.endsWith(".js")) return;
    const commands = readdirSync(`./src/commands/${dir}/`).filter((file) =>
      file.endsWith(".js")
    );
    for (let file of commands) {
      let pull = require(`../commands/${dir}/${file}`);
      if (pull.name) {
        global.commands.set(pull.name, pull);
      } else {
        continue;
      }
      if (pull.aliases && Array.isArray(pull.aliases))
        pull.aliases.forEach((alias) => global.aliases.set(alias, pull.name));
    }
  });
};
