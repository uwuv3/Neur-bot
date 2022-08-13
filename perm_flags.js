module.exports = [
  "CREATE_INSTANT_INVITE", // (create invitations to the guild)
  "KICK_MEMBERS",
  "BAN_MEMBERS",
  "ADMINISTRATOR", // (implicitly has all permissions, and bypasses all channel overwrites)
  "MANAGE_CHANNELS", // (edit and reorder channels)
  "MANAGE_GUILD", // (edit the guild information, region, etc.)
  "ADD_REACTIONS", // (add new reactions to messages)
  "VIEW_AUDIT_LOG",
  "PRIORITY_SPEAKER",
  "STREAM",
  "VIEW_CHANNEL",
  "SEND_MESSAGES",
  "SEND_TTS_MESSAGES",
  "MANAGE_MESSAGES", // (delete messages and reactions)
  "EMBED_LINKS", //(links posted will have a preview embedded)
  "ATTACH_FILES",
  "READ_MESSAGE_HISTORY", //(view messages that were posted prior to opening Discord)
  "MENTION_EVERYONE",
  "USE_EXTERNAL_EMOJIS", // (use emojis from different guilds)
  "VIEW_GUILD_INSIGHTS",
  "CONNECT", // (connect to a voice channel)
  "SPEAK", // (speak in a voice channel)
  "MUTE_MEMBERS", // (mute members across all voice channels)
  "DEAFEN_MEMBERS", // (deafen members across all voice channels)
  "MOVE_MEMBERS", // (move members between voice channels)
  "USE_VAD", // (use voice activity detection)
  "CHANGE_NICKNAME",
  "MANAGE_NICKNAMES", // (change other members' nicknames)
  "MANAGE_ROLES",
  "MANAGE_WEBHOOKS",
  "MANAGE_EMOJIS_AND_STICKERS",
  "USE_APPLICATION_COMMANDS",
  "REQUEST_TO_SPEAK",
  "MANAGE_EVENTS",
  "MANAGE_THREADS",
  "USE_PUBLIC_THREADS", // (deprecated)
  "CREATE_PUBLIC_THREADS",
  "USE_PRIVATE_THREADS", // (deprecated)
  "CREATE_PRIVATE_THREADS",
  "USE_EXTERNAL_STICKERS", // (use stickers from different guilds)
  "SEND_MESSAGES_IN_THREADS",
  "START_EMBEDDED_ACTIVITIES",
  "MODERATE_MEMBERS",
];
