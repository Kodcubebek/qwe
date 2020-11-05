const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`<a:dikkat:707520390242631804>Bu Komudu Kullanabilmen İçin \`Sunucuyu Yönet\` Yetkisine Sahip Olmalısın ! `);

if (args[0] === 'sıfırla') {
  let seviyelog = db.fetch(`seviyexp_${message.guild.id}`)
  if (!seviyelog) return message.channel.send(
new discord.MessageEmbed()
.setColor('RANDOM')
.setDescription(`Mesaj Başına Verilecek Xp Değeri Ayarlanmadığı İçin Sıfırlayamazsın<a:dikkat:707520390242631804>`)
)
  message.channel.send(
new discord.MessageEmbed()
.setColor('RANDOM')
.setDescription(`Mesaj Başına Xp Değeri Sıfırlandı!<a:tiks:743841333692727378>`)
)
  db.delete(`seviyexp_${message.guild.id}`)
  return;
}

let kanal = args[0]
if(!kanal) return message.channel.send(
new discord.MessageEmbed()
.setColor('RANDOM')
.setDescription(`Mesaj Başına Verilecek  Xp Değerini Belirtin!<a:dikkat:707520390242631804>`)
)

db.set(`seviyexp_${message.guild.id}`, kanal)

message.channel.send(
new discord.MessageEmbed()
.setColor('RANDOM')
.setDescription(`Mesaj Başına Verilecek Xp Değeri \`${kanal}\` Olarak Ayarlandı!<a:tiks:743841333692727378>`)
)
  
}
exports.conf = {
  name: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'seviye-xp'
}