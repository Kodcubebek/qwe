const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

  let kxp = await db.fetch(`xp_${message.author.id}_${message.guild.id}`)
  let klvl = await db.fetch(`seviyem_${message.author.id}_${message.guild.id}`)
  var user = message.mentions.users.first() || message.author;
  
  let kontrol;
  if(klvl == null) kontrol = '0'
  else kontrol = kxp
  
  let kontrol2;
  if(klvl == null) kontrol2 = '0'
  else kontrol2 = klvl
  

const embed = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle(`${client.user.username} - Seviye Sistemi`)
.setColor('BLACK')
.setDescription(`Seviyem: **${kontrol2}** \n XP Değerim: **${kontrol}**`)
.setThumbnail(user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(embed) 

}
exports.conf = {
  name: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'seviyem'
}