import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import { readdirSync } from "fs"
exports = (client) => {
  let token;
  token = process.env.token;
  const appId = process.env.appId;
  const commands = [];
  readdirSync("./src/slashcommands/").forEach((dir) => {
    const scommands = readdirSync(`./src/slashcommands/${dir}/`).filter(
      (file) => file.endsWith(".js")
    );

    for (const file of scommands) {
      const pull = require(`../slashcommands/${dir}/${file}`);
      global.scommands.set(pull.data.name, pull);
      commands.push(pull.data.toJSON());
    }
  });
  const rest = new REST({ version: "10" }).setToken(token);
  (async () => {
    try {
      await rest
        .put(Routes.applicationCommands(appId), {
          body: commands,
        })
        .then(() =>
          console.log(
            `├─────────┬\n│ Handler │ -> Succes reloaded (/) commands\n├─────────•`
          )
        );
    } catch (error) {
      console.error(error);
    }
  })();
};
