//aşagıdaki kodları komutlara
const db = require('quick.db')
const Discord = require('discord.js')

exports.run = async (bot, message, args) => {
  
  
  if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('<a:dikkat:707520390242631804>Bu komudu kullanabilmek için `Sunucuyu Yönet` yetkisine sahip olmalısın!')
  if (!args[0]) return message.channel.send('<a:dikkat:707520390242631804>**Sa-as yazısını açmak için `-sa-as aç veya kapat`**')
  
  if (args[0] == 'aç') {
    db.set(`saas_${message.guild.id}`, 'açık')  
      message.channel.send(`<a:tiks:743841333692727378>**Başarıyla \`sa-as Sistemini\` Açtınız, Artık Bot \`sa\` Yazıldığında Cevap Verecek.**`)
    
  }
  if (args[0] == 'kapat') {
    db.set(`saas_${message.guild.id}`, 'kapali')
    
      message.channel.send(`<a:tiks:743841333692727378>**Başarıyla \`sa-as Sistemini\` Kapattınız, Artık Bot \`sa\` Yazıldığında Cevap Vermeyecek.**`)
    
  }

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'sa-as',
  description: 'Selamün aleyküm, Aleyküm selam',
  usage: '!sa-as'
};
