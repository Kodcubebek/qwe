const Discord = require('discord.js')
const db = require('quick.db');

exports.run = async (client, message, args) => {
  
 if (!message.member.hasPermission("MANAGE_MESSAGES")) {
  const bilgi = new Discord.MessageEmbed()
  .setDescription('<a:dikkat:707520390242631804>Bu komutu kullanabilmek için **Mesajları Yönet** yetkisine sahip olmanız gerek.')
  .setColor("0000A0")
  if (!args[0]) return message.channel.send('<a:dikkat:707520390242631804>**Ban Log sistemi -ban-log #kanal**')
return message.channel.sendEmbed(bilgi).then(m => m.delete(150000)); return
       }
  let mlog = message.mentions.channels.first()
  let sıfırla = db.fetch(`mlogg_${message.guild.id}`)
if(args[0] === "sıfırla") {
    if(!sıfırla) {
      message.channel.send(`<a:dikkat:707520390242631804>Ban Log Kanalı zaten ayarlı değil.`)                 
      return
    }
    db.delete(`mlogg_${message.guild.id}`)
    message.channel.send(`<a:tiks:743841333692727378>Ban Log Kanalı başarıyla sıfırlandı.`)        
    return
  }
  if (!mlog) {
    return message.channel.send(
    `<a:dikkat:707520390242631804>>Ban Log Olacak Kanalı etiketlemelisin.`)                       
  }
  db.set(`mlogg_${message.guild.id}`, mlog.id)    
    message.channel.send(`<a:tiks:743841333692727378>Ban Log Kanalı başarıyla ${mlog} olarak ayarlandı.`)
  };
    

exports.conf = {
    enabled : true,
    guildOnly : false,
    aliases : [],
    permLevel : 0
}

exports.help = {
  name: 'ban-log',
  description : '',
  usage : ''
}
