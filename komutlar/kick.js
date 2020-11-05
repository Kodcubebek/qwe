const Discord = require('discord.js');
const db = require('quick.db');
//DevTr. Mr.ı
exports.run = async(client, message, args) => {
	let mrlog = db.fetch(`kicklog_${message.guild.id}`)
	if(!mrlog) return message.channel.send('<a:dikkat:707520390242631804>kick log sistemi ayarlanmamış')
    let user = message.mentions.users.first()
    let sebep = args.slice(1).join(' ') || "Belirtilmemiş."
     if(!user) return message.channel.send('<a:dikkat:707520390242631804>Bir kişi etiketlemelisin.')
     if(user.id === message.author.id) return message.channel.send('<a:dikkat:707520390242631804>Kendini kickleyemezsin.')
     if(user.id === client.user.id) return message.channel.send('<a:dikkat:707520390242631804>Botu kickleyemezsin.')
  if(user.id === message.guild.ownerID) return message.channel.send('<a:dikkat:707520390242631804>Sunucu sahibini kickleyemezsin.')
    if (!message.guild.member(user).bannable) return message.reply('<a:dikkat:707520390242631804>Bu kişinin rolü senden üstte veya `Üyeleri at` yetkisine sahip.');
//DevTr. Mr.ı
   message.channel.send('<@'+ user.id + '> Kişisini **'+ sebep+ '** Sebebiyle kicklemek istediğine eminmisin ?').then(async m => {
   	 m.react('✅').then(r =>{ 

   const tamam = (reaction,user) => reaction.emoji.name == '✅' && user.id == message.author.id;
      const tamam2 = m.createReactionCollector(tamam)

   tamam2.on('collect', async (r)=>{
  message.guild.members.cache.get(user.id).kick({
  	reason: `${sebep}`
          })
      let mrembed = new Discord.MessageEmbed()
    .setColor('0x36393E')
    .setTitle('Kişi kicklendi')
    .addField('Yetkili', `${message.author.tag}`)
    .addField('Kicklenen kişi', user)
    .addField('Sebep', sebep)
    client.channels.cache.get(mrlog).send(mrembed)
       })
    })
    await m.react('❌').then(r =>{ 

   const tamam = (reaction,user) => reaction.emoji.name == '❌' && user.id == message.author.id;
      const tamam2 = m.createReactionCollector(tamam)

   tamam2.on('collect', async (r)=>{
     m.delete()
message.channel.send('Kickleme işlemi iptal edildi.')
      })
    })
 })
} 
 
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases:[],
	permlevel: 0
};

exports.help = {
	name: "kick",
        description: "",
       usage: ""
}