const discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')

exports.run = async(client, message, args) => {

let prefix = ayarlar.prefix;

const yardım = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL)  
.setTitle(`<a:mavi:757881826185576452>Kayıt-Yardım`)
.setColor('')
.setDescription(`**${prefix}erkek-rol @rol** Erkek Rolünü Ayarlar \n **${prefix}erkek-rol sıfırla** Erkek Rolünü Sıfırlar \n **${prefix}kız-rol @rol** Kız Rolünü Ayarlar \n **${prefix}kız-rol sıfırla** Kız Rolünü Sıfırlar \n **${prefix}alınacak-rol @rol** Kayıt Olunca Alınacak Rolü Ayarlar \n **${prefix}alınacak-rol sıfırla** Kayıt Olunca Alınacak Rolü Sıfırlar \n **${prefix}kayıt-kanal #kanal** Kayıt Kanalını Ayarlar \n **${prefix}kayıt-kanal sıfırla** Kayıt Kanalını Sıfırlar \n **${prefix}kayıtçı-rol @rol** Kayıtçı Rolünü Ayarlar \n **${prefix}kayıtçı-rol sıfırla** Kayıtçı Rolünü Sıfırlar \n **${prefix}kayıtçı-ver @kullanıcı** Belirttiğiniz Kullanıya Kayıtçı Rolü Verir \n **${prefix}kayıtçı-al @kullanıcı** Belirttiğiniz Kullanıcıdan Kayıtçı Rolünü Alır \n **${prefix}erkek @kullanıcı isim yaş** Erkek Olarak Kayıt Edersiniz \n **${prefix}kız @kullanıcı isim yaş** Kız Olarak Kayıt Edersiniz \n **${prefix}kayıt-tag** Kayıt Tagı Ayarlasınız \n **${prefix}kayıt-tag sıfırla** Kayıt-tagı Sıfırlarsınzı \n **${prefix}kayıt-hg** Kayıt Hoş Geldin Mesajını Ayarlar`)
.setThumbnail(client.user.avatarURL)
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(yardım)

}
exports.conf = {
enabled: true,
guildonly: false,
aliases: [],
permlevel: 0
}
exports.help = {
name: 'yardım-kayıt',
description: '',
usage: ''
}