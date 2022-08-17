const botversion = require("../../../package.json").version;
const {
  version: discordjsVersion,
  MessageEmbed,
  Message,
  Client,
} = require("discord.js");
const os = require("os");
module.exports = {
  name: "istatistik",
  aliases: [""],
  permission: ["SEND_MESSAGES"],
  cooldown: 1000,
  adminOnly: true,
  /**
   *
   * @param {Message} message
   * @param {Client} client
   * @param {String[]} args
   */
  run: async (message, client, args) => {
    let Ping = `[ ${Math.round(client.ws.ping)}ms ]`;
    let Servers = `[ ${client.guilds.cache.size} ]`;
    let Channels = `[ ${client.channels.cache.size} ]`;
    let Users = `[ ${client.users.cache.size} ]`;
    let Name = `[ ${client.user.tag} ]`;
    let ID = `[ ${client.user.id} ]`;
    let nodeJS = `[ ${process.version} ]`;
    let djs = `[ ${discordjsVersion} ]`;
    let Arch = `[ ${process.arch} ]`;
    let Platform = `[ ${process.platform} ]`;
    let cpuModel = `[ ${os.cpus()[0].model} ]`;
    let core = `[ ${os.cpus().length} ]`;
    let BotVersion = `[ ${botversion} ]`;
    let UpTime = `[ ${timeCon(process.uptime())} ]`;
    let Process_Info = `[ PID: ${process.pid} at ${process.cwd()}]`;
    let Process_Memory_Usage = `[ ${Math.ceil(
      process.memoryUsage().heapTotal / 1000000
    )}MB ]`;
    let System_Memory_Usage = `[ ${Math.ceil(
      (os.totalmem() - os.freemem()) / 1000000
    )}MB of ${Math.ceil(os.totalmem() / 1000000)}MB ]`;
    let RAM_Usage = `[ ${(process.memoryUsage().rss / 1048576).toFixed()}MB ]`;
    let Memory_Usage = `[ ${formatBytes(process.memoryUsage().heapUsed)} ]`;

    const embed = new MessageEmbed()
      .setColor("BLUE")
      .addFields([
        { name: `Ping`, value: `${Ping}` },
        { name: `Sunucular`, value: `${Servers}` },
        { name: `Kanallar`, value: `${Channels}` },
        { name: `Kullanıcılar`, value: `${Users}` },
        { name: `Adı`, value: `${Name}` },
        { name: `ID`, value: `${ID}` },
        { name: `nodeJS versiyon`, value: `${nodeJS}` },
        { name: `discordJS versiyon`, value: `${djs}` },
        { name: `Package versiyon`, value: `${BotVersion}` },
        { name: `Arch`, value: `${Arch}` },
        { name: `Platform`, value: `${Platform}` },
        { name: `cpu Modeli`, value: `${cpuModel}` },
        { name: `Çekirdek`, value: `${core}` },
        { name: `Bot uptime`, value: `${UpTime}` },
        { name: `İşlemci bilgisi`, value: `${Process_Info}` },
        { name: `İşlemci kullanımı`, value: `${Process_Memory_Usage}` },
        { name: `Sistem kullanımı`, value: `${System_Memory_Usage}` },
        { name: `RAM kullanımı`, value: `${RAM_Usage}` },
        { name: `Depolama kullanımı`, value: `${Memory_Usage}` },
      ])
      .setTimestamp();
    await message.reply({ embeds: [embed] });
  },
};
function formatBytes(a, b) {
  if (0 == a) return "0 Bytes";
  let c = 1024,
    d = b || 2,
    e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    f = Math.floor(Math.log(a) / Math.log(c));

  return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f];
}

function timeCon(time) {
  let days = Math.floor((time % 31536000) / 86400);
  let hours = Math.floor(((time % 31536000) % 86400) / 3600);
  let minutes = Math.floor((((time % 31536000) % 86400) % 3600) / 60);
  let seconds = Math.round((((time % 31536000) % 86400) % 3600) % 60);
  days = days > 9 ? days : "0" + days;
  hours = hours > 9 ? hours : "0" + hours;
  minutes = minutes > 9 ? minutes : "0" + minutes;
  seconds = seconds > 9 ? seconds : "0" + seconds;
  return `${days > 0 ? `${days}:` : ""}${
    (hours || days) > 0 ? `${hours}:` : ""
  }${minutes}:${seconds}`;
}
