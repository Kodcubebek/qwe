const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

if (args[0] === 'sıfırla') {
let fakehesaprol = db.fetch(`fakehesaprol_${message.guild.id}`)
if (!fakehesaprol) return message.channel.send(`<a:dikkat:707520390242631804>Fake Hesap Koruması Ayarlanmadığı İçin Sıfırlanamaz!`)
   if(!db.has(`fakehesaprol_${message.guild.id}`)) return message.channel.send(`<a:dikkat:707520390242631804>Sistem zaten kapalı.`)
message.channel.send(`Fake Hesap Koruması Başarıyla Sıfırlandı!<a:tiks:743841333692727378>`)
  db.delete(`fakehesap_${message.guild.id}`)
  db.delete(`fakehesaprol_${message.guild.id}`)
  return;
}

let rol = message.mentions.roles.first()
if(db.has(`fakehesaprol_${message.guild.id}`)) return message.channel.send(`<a:dikkat:707520390242631804>Sistem zaten açık.`)
if(!rol) return message.channel.send(`<a:dikkat:707520390242631804>Sunucuya Gelen Fake Hesaplara  Verilecek Rolü Belirtmeyi Unuttun!`)

let kanal = message.mentions.channels.first()
if (!kanal) return message.channel.send(`<a:dikkat:707520390242631804>Fake Hesap Logunu AYarlamayı Unuttun!`)

db.set(`fakehesaprol_${message.guild.id}`, rol.id)
db.set(`fakehesap_${message.guild.id}`, kanal.id)

message.channel.send(`<a:tiks:743841333692727378>Fake Hesap Koruması Başarıyla Ayarlandı ! \n Not Alınacak Rol Otomatik Olarak Oto Rol Ayarlanmıştır`)  
}
exports.conf = {
  name: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'fake-hesap-koruma'
}
