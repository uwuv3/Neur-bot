const { config } = require("../../../config");
const client = require("../../index");
client.on("ready", async () => {
  client.user.setStatus(config.presence.status.toLowerCase());
  let i = 0;
  let a = config.presence.activities;
  setInterval(() => {
    let b = a[i++ % a.length];
    client.user.setPresence({
      activities: [{ name: b, type: config.presence.type.toUpperCase() }],
    });
  }, config.presence.changes);
  let user = client.user.tag.toLocaleLowerCase().length;
  let arr = new Array(user);
  console.log(
    `├──${arr.join("─")}─┬\n│ ${client.user.tag} │ -> I'm ready\n├──${arr.join(
      "─"
    )}─•`
  );
});
