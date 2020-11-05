const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

let yetkili = db.fetch(`muteyetkilirol_${message.guild.id}`)

if(!message.member.roles.cache.has(yetkili)) return message.channel.send(`Bu Komudu Kullanabilmen İçin <@&${yetkili}> Rolüne Sahip Olmalısın!`)

let muterol = db.fetch(`muterol_${message.guild.id}`)

let kullanıcı = message.mentions.members.first()
if (!kullanıcı) return message.channel.send(`Mutesini Kladıracağın Kullanıcıyı Belirtmelisin!`)

kullanıcı.roles.remove(muterol)

message.channel.send(`${kullanıcı} Adlı Kullanıcının Mutesi Kaldırıldı!`)

db.delete(`mutelimi_${message.guild.id}_${kullanıcı.id}`)
  
}
exports.conf = {
  name: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'unmute'
}