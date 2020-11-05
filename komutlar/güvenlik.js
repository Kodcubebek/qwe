const Discord = require('discord.js');
const db = require('quick.db')


exports.run = async (bot, message,args) => {
  
  
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`<a:dikkat:707520390242631804>Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
if (!args[0]) return message.channel.send('<a:dikkat:707520390242631804>**Güvenlik Sistemi açmak için -güvenlik #kanal**')
let logk = message.mentions.channels.first();  
  
let logkanal = await db.fetch(`guvenlik${message.guild.id}`)
  
  if (args[0] === "sıfırla" || args[0] === "kapat") {   
    if(!logkanal) return message.channel.send(`<a:dikkat:707520390242631804>Güvenliği kapatmak için \`güvenlik kanalının\` seçili olması lazım örnek kullanım: \`-güvenlik #kanal\``);
    
   db.delete(`guvenlik${message.guild.id}`)  
    
   message.channel.send(`<a:tiks:743841333692727378>Güvenlik başarıyla kapatıldı.`);   
    
  
    return
  }  
  
if (!logk) return message.channel.send('<a:dikkat:707520390242631804>Güvenlik kanalını bulamadım  Kullanım `-güvenlik #kanal`');  
 

   db.set(`guvenlik${message.guild.id}`, logk.id)

message.channel.send(`<a:tiks:743841333692727378>Güvenlik başarıyla ${logk} olarak ayarlandı`);  

}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['gks','güvenlik'],
  permLevel: 3
};

module.exports.help = {
  name: 'güvenlik',
  description: 'güvenlik sağlar',
  usage: 'güvenlik'
};
   