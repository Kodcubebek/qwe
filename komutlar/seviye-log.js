const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {
if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`Bu Komudu Kullanabilmen İçin \`Sunucuyu Yönet\` Yetkisine Sahip Olmalısın!`);
if (args[0] === 'sıfırla') {
  let seviyelog = db.fetch(`seviyelog_${message.guild.id}`)
  if (!seviyelog) return message.channel.send(`Seviye Log Ayarlanmadığı için Sıfırlayamazsın!<<a:dikkat:707520390242631804>`)
  message.channel.send(`Seviye Log Kanalı Sıfırlandı!<a:tiks:743841333692727378>`)
  db.delete(`seviyelog_${message.guild.id}`)
  return;
}

let kanal = message.mentions.channels.first()
if(!kanal) return message.channel.send(`Seviye Logu Belirtin!<a:dikkat:707520390242631804>`)

db.set(`seviyelog_${message.guild.id}`, kanal.id)

message.channel.send(`Seviye Logu Ayarlandı!<a:tiks:743841333692727378>`)
  
}
exports.conf = {
  name: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'seviye-log'
}