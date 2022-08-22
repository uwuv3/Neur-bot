function Delete(client) {
  if (!client) {
    console.log("Bir client belirt");
    process.exit(0);
  }
  const { REST } = require("@discordjs/rest");
  const { Routes } = require("discord-api-types/v10");
  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
  rest
    .put(Routes.applicationCommands(process.env.appId), { body: [] })
    .then(() => console.log("Successfully deleted all application commands."))
    .catch(console.error);
  client.guilds.cache.map((x) => {
    rest
      .put(Routes.applicationGuildCommands(process.env.appId, x.id), {
        body: [],
      })
      .then(() =>
        console.log(
          "Successfully deleted all applicationGuild commands for " +
            x.name +
            "."
        )
      )
      .catch(console.error);
  });
}
module.exports = Delete;
