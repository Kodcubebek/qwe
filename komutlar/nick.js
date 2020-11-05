const discord = require('discord.js')


exports.run = async(client, message, args) => {

 if (!message.member.hasPermission('MANAGE_NICKNAMES')) return message.channel.send(`Bu Komudu Kullanabilmen İçin \`Kullanıcı Adlarını Yönet\` Yetkisine Sahip Olmalısın!`);
  
let kullanıcı = message.mentions.members.first()
if (!kullanıcı) return message.channel.send(`İsmini Değiştireceğin Kullanıcıyı Belirtmelisin!`)

let isim = args.slice(1).join(' ')
if (!isim) return message.channel.send(`Değiştireceğiniz İsmi Giriniz!`)

kullanıcı.setNickname(isim)

message.channel.send(`${kullanıcı} Adlı Kullanıcının Yeni İsmi \`${isim}\` Olarak Ayarlandı!<a:tiks:743841333692727378>`)

}
exports.conf = {
  name: true,
  guildonly: false,
  aliases: ['nick', 'isimdegistir', 'isimdeğiştir'],
  permlevel: 0
}
exports.help = {
  name: 'isim-değiştir'
}