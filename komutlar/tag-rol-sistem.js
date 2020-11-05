const Discord = require('discord.js');
const data = require('quick.db');
const ayarlar = require ('../ayarlar.json')
var prefix = ayarlar.prefix
exports.run = async (client, message, args) => {

message.channel.send(new Discord.MessageEmbed()
.setTitle('Matessa Tag Rol & Kanal')
.setDescription(`\`${prefix}rol-tag 🚀\`
**Lütfen tag ayarlayınız başlamadan önce**

\`${prefix}tag-rol @rolEtiket\`
Sunucunuz da **Tag** alan üyeye verilecek rolü etiketle

\`${prefix}tag-log #kanalEtiket\`
**Tag** alan & çıkaran üyeleri kanala bilgi olarak gönderir

\`\`\`Sıfırlama Komutları\`\`\`
\`${prefix}tag-rol-sil\`
**Tagın ayarlı olan rolü siler**

\`${prefix}tag-log-kapat\`
**Ayarladığınız tag kanalı sıfırlar**

📢 Sistem Nasıl Çalışır?
**Buradaki herşeyi kurduktan sonra, \`Tag\` alan veya cıkartanın sunucunuz da herhangi bir kanala msj yazması durumunda alıp vermektedir.**
`)
.setThumbnail(message.author.avatarURL() ? message.author.avatarURL({dynamic: true}) : ''))

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'tag-rol-sistem'
};