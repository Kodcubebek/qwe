const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`<a:dikkat:707520390242631804>Bu Komudu Kullanabilmen İçin \`Sunucuyu Yönet\` Yetkisine Sahip Olmalısın!`);

if (args[0] === 'sıfırla') {
  let seviyelog = db.fetch(`bototorol_${message.guild.id}`)
  if (!seviyelog) return message.channel.send(`Bot Otorol Ayarlanmadığı için Sıfırlayamazsın<a:dikkat:707520390242631804>`)
  message.channel.send(`Bot Otorolü Sıfırlandı!<a:tiks:743841333692727378>`)
  db.delete(`bototorol_${message.guild.id}`)
  db.delete(`bototorollog_${message.guild.id}`)  
  return;
}

let kanal = message.mentions.channels.first()
if(!kanal) return message.channel.send(`Bot Otorol Logunu Belirtin!<a:dikkat:707520390242631804>`)
  
let rol = message.mentions.roles.first()
if(!rol) return message.channel.send(`Bolara Verilecek Rolü Belirtin!<a:dikkat:707520390242631804>`)

db.set(`bototorollog_${message.guild.id}`, kanal.id)
db.set(`bototorol_${message.guild.id}`, rol.id)

message.channel.send(`Bot Otorol Ayarlandı!<a:tiks:743841333692727378>`)
  
}
exports.conf = {
  name: true,
  guildonly: false,
  aliases: ['bototorol'],
  permlevel: 0
}
exports.help = {
  name: 'bot-oto-rol'
}