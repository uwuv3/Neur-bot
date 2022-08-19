module.exports = (client) => {
  process.on("unhandledRejection", async (reason, promise) => {
    console.log(
      `├────────────┬\n│ ANTI CRASH │ -> unhandledRejection\n├────────────• `
    );
    console.log(reason, promise);
  });

  process.on("uncaughtExceptionMonitor", async (err, origin) => {
    console.log(
      `├────────────┬\n│ ANTI CRASH │ -> uncaughtExceptionMonitor\n├────────────• `
    );
    console.log(err, origin);
  });
  process.on("uncaughtException", async (err, origin) => {
    console.log(
      `├────────────┬\n│ ANTI CRASH │ -> uncaughtException\n├────────────• `
    );
    console.log(err, origin);
  });
  process.on("warning", async (error) => {
    return console.log(`├─────────┬\n│ WARNING │ -> Process \n├─────────•`);
  });
  var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
  client.on("warn", async (error) => {
    console.log(
      `├─────────┬\n│ WARNING │ -> Discord.js \n├─────────• ` + error
    );
  });
  client.on("error", async (error) => {
    console.log(
      `├────────────┬\n│ ANTI CRASH │ -> Client\n├────────────•` + error
    );
  });
  client.on("shardError", async (error) => {
    console.log(
      `├────────────┬─•\n│ ANTI CRASH │ -> Shard\n├────────────•` + error
    );
  });
  //! deprecated : https://nodejs.org/api/process.html#event-multipleresolves
};
