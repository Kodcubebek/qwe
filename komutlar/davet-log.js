const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

if (args[0] === 'sıfırla') {
  let seviyelog = db.fetch(`davetlog_${message.guild.id}`)
  if (!seviyelog) return message.channel.send(`Davet Log Ayarlanmadığı için Sıfırlayamazsın!<a:dikkat:707520390242631804>`)
  message.channel.send(`Davet Log Kanalı Sıfırlandı<a:tiks:743841333692727378>`)
  db.delete(`davetlog_${message.guild.id}`)
  return;
}

let kanal = message.mentions.channels.first()
if(!kanal) return message.channel.send(`Davet Logu Belirtin!<a:dikkat:707520390242631804>`)

db.set(`davetlog_${message.guild.id}`, kanal.id)

message.channel.send(`Davet Logu ${kanal} Olarak Ayarlandı<a:tiks:743841333692727378>`)
  
}
exports.conf = {
  name: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'davet-log'
}