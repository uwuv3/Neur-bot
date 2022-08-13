module.exports = {
    name: "ping",
    aliases: [""],
    permission: ["SEND_MESSAGES"],
    cooldown: 5000,
    adminOnly: false,
    /**
     *
     * @param {Message} message
     * @param {Client} client
     * @param {String[]} args
     */
    run: async (message, client, args) => {
        message.reply({content:`${client.ws.ping}ms`})
    }}