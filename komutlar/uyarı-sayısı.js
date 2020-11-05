const Discord = require('discord.js')//Modülümüzü tanımladık
const db = require('quick.db')//Datebase modülümüzü tanımladık
exports.run = async(client, message) => {//Komutu çalıştıracak olan yer
let user = message.mentions.users.first() || message.author//video uzamasın diye kopyala yapıştır yapıyom
let uyarısayı = await db.fetch(`UyarıKullanıcıFrenzy_${message.guild.id}_${user.id}`)||0
message.channel.send(`${user} kullanıcısının ${uyarısayı} uyarısı var!`)
};
exports.conf = {
enabled: false,//kapalı?
guildOnly: false, //sunucu özel?
aliases: [], //diğer adlar
permLevel: 0 //yetki
};
exports.help = {
name: 'uyarı-sayı',//help komutu
description: 'Kaç Uyarın Var Gösterir',//açıklaması
usage: ''//kullanımı
};

