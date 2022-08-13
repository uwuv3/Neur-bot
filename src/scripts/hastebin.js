const fetch = require("node-fetch");
async function hastebin(text) {
  const f = fetch("https://hastebin.uwuv3.repl.co/script", {
    headers: { "Content-Type": "text/plain" },
    body: text,
    method: "POST",
  })
    .then((res) => res.json())
    .then((d) => {
      return d.html;
    });
  return f;
}
module.exports = hastebin;
