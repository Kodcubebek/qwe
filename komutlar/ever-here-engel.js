const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`<a:dikkat:707520390242631804>Bu Komudu Kullanabilmen İçin \`Sunucuyu Yönet\` Yetkisine Sahip Olmalısın!`);

if (!args[0]) return message.channel.send(`<a:dikkat:707520390242631804> Everyone Here Korumasını Açmak İçin \`-everyone-here-engel aç\`Kapatmak için \`-everyone-here-engel kapat\` `)

if (args[0] === 'aç') {
  message.channel.send(`Everyone Here Koruması Açıldı<a:tiks:743841333692727378>`)
db.set(`everyone_${message.guild.id}`, 'açık')
  return;
}

if (args[0] === 'kapat') {
  message.channel.send(`Everyone Here Koruması Kapatıldı<a:tiks:743841333692727378>`)
db.set(`everyone_${message.guild.id}`, 'kapat')
  return;
}
  
}
exports.conf = {
  name: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'everyone-here-engel'
}