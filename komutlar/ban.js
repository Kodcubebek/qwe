const Discord = require('discord.js');
const moment = require('moment')
const talkedRecently = new Set();
const db = require("quick.db");
exports.run = async (bot, message, args) => {

  let guild = message.guild
let modlog = await db.fetch(`mlogg_${message.guild.id}`) 
  if (!modlog) return message.channel.send("<a:dikkat:707520390242631804> Ayarlı Bir Ban Log Kanalı Yok! Ayarlamak İçin \`-ban-log #kanal\` !")   
    if(message.channel.type == "dm")  return;
  if(message.channel.type !== "text") return;
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("<a:dikkat:707520390242631804> Bu komudu kullanabilmek için `Ban` yetkisine sahip olmanız gerek.");
    let reason = args.slice(1).join(' ')
    if (!args[0]) return message.channel.send("<a:dikkat:707520390242631804> Yasaklamak istediğiniz kullanıcıyı etiketleyiniz.")
    let user = message.mentions.users.first() || bot.users.cache.get(args[0])
    if (!user) return message.channel.send(`<a:dikkat:707520390242631804> Etiketlediğin kullanıcıyı sunucuda bulamadım.`)
    let member = message.guild.member(user)
    if (!member) return message.channel.send(`<a:dikkat:707520390242631804> Etiketlediğin kullanıcıyı sunucuda bulamadım.`)
    if (member.hasPermission("BAN_MEMBERS")) return message.channel.send(`Etiketlediğin Kişi Sunucuda Yetkili!`)
if(!args[1]) return message.channel.send("Bir Sebep Girmedin!")
    user.send(`**${message.guild.name}** adlı sunucudan **banlandınız!**\n*Sebep:* \`\`\`${reason}\`\`\``)    
     guild.members.ban(user, { reason: reason + ` | Yetkili: ${message.author.tag} - ${message.author.id}` })  
                message.channel.send(`**${user.tag}** adlı kullanıcı sunucudan yasaklandı.`)
 let embed = new Discord.MessageEmbed()
 
  .setThumbnail(user.avatarURL()||user.defaultAvatarURL())
    .setColor("RANDOM")
    .setTimestamp()
 .setAuthor(`<a:tik:727414557508632577> Başarılı! ${user .username} adlı kişi Banlandı!.`,
               user.avatarURL() || user.displayAvatarURL())
    .addField('Eylem:', '\`Ban\`')
    .addField('Kullanıcı:', `\`${user.username}#${user.discriminator}\` (${user.id})`)
    .addField('Yetkili:', `\`${message.author.username}#${message.author.discriminator}\``)
    .addField('Sebep', `\`${reason}\``);
 let mlogg = await db.fetch(`mlogg_${message.guild.id}`) 
   
   message.guild.channels.cache.get(mlogg).send({ embed: embed }); 
  
  
  
  
}

exports.conf = {
    enabled : true,
    guildOnly : false,
    aliases : [],
    permLevel : 0
}

exports.help = {
  name: 'ban',
  description : '',
  usage : ''
};
