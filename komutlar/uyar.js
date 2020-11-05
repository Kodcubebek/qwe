const Discord = require('discord.js')//Modülümüzü tanımladık
const db = require('quick.db')//Datebase modülümüzü tanımladık
//Moülümüzü yüklüyoruz
exports.run = async(client, message, args) => {//Komutu çalıştıracak olan yer
//Komutuyazmaya başlıyoruz
let log = await db.fetch(`UyarıLogFrenzy_${message.guild.id}`)
if(!log) return message.reply(`Lütfen bir uyarı log kanalı ayarlayın Yoksa bu istem çalışmaaz`)
let user = message.mentions.users.first() //Uyarılacak Kullanıcı
if(message.guild.member(user).hasPermission("MANAGE_MESSAGES")) return message.channel.send("<a:dikkat:707520390242631804>Yetkilileri uyaramam")
let sebep = args.slice(1).join(' ')//neden uyarılacak
if(!(user||sebep)) return message.reply('<a:dikkat:707520390242631804>Yanlış kullanım! **Kullanıcı veya Sebep Belirt**')//bunları yazmasa uyarı mesajı atacak
let uyarısayı = await db.fetch(`UyarıKullanıcıFrenzy_${message.guild.id}_${user.id}`)
if(!uyarısayı) {//kullanıcın daha önceden uyarılmamışsa
db.add(`UyarıKullanıcıFrenzy_${message.guild.id}_${user.id}`,1)///veriye kaydettik 1
message.reply(`**Uyarı başarılı!** ${user.username} **Kullanıcısı** ${sebep} **sebebinden uyarıldı! Bu kullanıcın ilk uyarısı!**`)
message.guild.channels.cache.get(log).send(`${message.author} tarafından ${user.username} Kullanıcısı **${sebep}** sebebinden uyarıldı! Bu kullanıcın ilk uyarısı!`)
user.send(`${message.guild.name} sunucusunda ${sebep} sebeyile uyarıldın! Bu ilk uyarın`).catch(err=> {})//kullanıcıya da mesaj gönderdik!
} else {//kullanıcı daha önceden uyarılmışsa
db.add(`UyarıKullanıcıFrenzy_${message.guild.id}_${user.id}`,1)//guild kısmı sunucu içerisinde uyarılacağı için user de kullanıcı için
message.reply(`Kullanıcı Uyarıldı! **${user.username}** Kullanıcısı **${sebep}** sebebinden uyarıldı! Bu kullanıcının toplamda ${uyarısayı} uyarısı oldu!`)
message.guild.channels.cache.get(log).send(`${message.author} tarafından **${user.username}** Kullanıcısı **${sebep}** sebebinden uyarıldı! Bu kullanıcının toplamda ${uyarısayı} uyarısı oldu!`)
user.send(`${message.guild.name} sunucusunda ${sebep} sebeyile uyarıldın! Toplam uyarı sayın ${uyarısayı}`).catch(err=> {})//kullanıcıya da mesaj gönderdik!
}
if(uyarısayı >= 5) {//uyarı sınırı 5 i geçince olacaklar
user.kick(sebep).catch(err=> {console.log(err)})//sunucudan atılacak Alla alla geliyom 1 snny geldim baktım doğru yaıyoruz ben sunucu sahibi olduğumum için hata aldım
message.reply(`Kullanıcı sunucudan atıldı! Çünkü 5 uyarısı Oldu!`)//mesaj gönderilecek
db.delete(`UyarıKullanıcıFrenzy_${message.guild.id}_${user.id}`)//veri temizlenecek
message.guild.channels.cache.get(log).send(`${message.author} tarafından **${user.username}** Kullanıcısı **${sebep}** sebebinden uyarıldı ve 5 uyarıyı geçtiği için sunucudan atıldı!`)
user.send(`Sunucudan atıldın 5 Uyarı sınırını geçtin`)//kullanıcı dm gönderilecek
   .setFooter(`${message.author.username} Tarafından İstendi`, message.author.avatarURL())
}
};
exports.conf = {
enabled: false,//kapalı?
guildOnly: false, //sunucu özel?
aliases: [], //diğer adlar
permLevel: 3 //yetki
};
exports.help = {
name: 'uyar',//help komutu
description: 'Kullanıcıyı Uyarır.',//açıklaması
usage: ''//kullanımı
};
