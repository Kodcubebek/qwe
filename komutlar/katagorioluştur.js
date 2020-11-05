const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
exports.run = (client, message, args) => {
 
  let knaladi = args[0]
  if(!knaladi) return message.channel.send(`<a:dikkat:727446342514901082> Katagori Oluşturmam İçin Bir İsim Girmelisin. ${ayarlar.prefix}katagori-oluştur <adı>`)
 
message.guild.channels.create(knaladi, {type: 'category'})
 
  message.channel.send(`<a:tik:727414557508632577> Başarıyla \`${knaladi}\` adında bir katagori oluşturuldu.`)
 
};
//codare
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kategorioluştur'],
  permLevel: 0
};
 
exports.help = {
 name: 'kategori-oluştur',
 description: 'Katagori Oluşturusun',
 usage: ''
};
