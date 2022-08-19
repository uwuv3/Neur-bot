const config = {
  topggtoken: "",
  mongodburl:
    "mongodb+srv://uwuv3:rkzgkHg8FMcL2mal@cluster0.hktzrvl.mongodb.net/?retryWrites=true&w=majority", //! MOngodb bağlanması için URL
  //TODO: Boş bırakma bot çalışmaz
  prefix: "?", //! Botun prefixi
  //TODO: !,?,> koyabilirsin
  dmmsgchnl: "977846930975633438", //! Dmden mesaj gelince mesajı kanala gönderme
  //TODO : Kanal id yerleştir
  color: "DARK_RED", //! Embed rengi
  //TODO: Renk kodu da koyabilirsin
  admins: [
    "984439714851479593", //* N๏ ภค๓є#8841
    "830008975335489567", //* яєαм#8015
  ], //! Botun adminleri
  //TODO: Buraya kendi idni koy
  client: {
    intents: 131071, //TODO: intent ayarlamaları :-https://ziad87.net/intents/
    partials: [
      "CHANNEL", //! Kanal görme
      "MESSAGE", //! Mesaj görme
      "GUILD_MEMBER", //! Sunucu üyesi görme
      "GUILD_SCHEDULED_EVENT", //! Suncucu event görme
      "REACTION", //! Mesaj tepkileri görme
      "USER", //! Kullanıcı görme
    ],
    properties: {
      browser: "Discord Android", //! Botun durumunu telefonda gösterme
      //TODO: Eğer istemiyorsan : "discord.js" koy
    },
  }, //! Bot için gerekli olanlar

  presence: {
    status: "", //!Kullanıcı durumu
    //TODO: online,idle,dnd,offline
    activities: [`@NEUR - ?yardım`, "@NEUR - v0.0.7.23_BETA"], //! Botun oynuyor kısmı
    //TODO: Boş bırakma hata verir
    type: "Playing", //! Oynuyor kısmının type'ı
    //TODO: Playing,Streaming,Listening,Watching,Custom,Competing
    changes: 10000, //! Botun oynuyor kısmı değiştirme süresi
    //TODO: Ms değeri gir
  },
};
const emotes = {
  carpi: "<:no:1007310697341911040>",
  tik: "<:yes:1007310699904643163>",
  boost: "<a:boost:1008029593355161650>",
};
module.exports = { config, emotes };
