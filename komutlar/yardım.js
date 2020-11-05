const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = async(client, message, args) => {

        const yardim = new Discord.MessageEmbed()

             .setColor('')
              .setTitle(`Yardım-Menusu`)
             .setAuthor(`Matessa`, client.user.avatarURL()) 
             .setThumbnail(client.user.avatarURL())
             .addField(`<a:ne:757880066553413693> **${prefix}yardım-moderasyon**`,`Moderasyon Komutlarını Listeler`)
             .addField(`<a:ne:757880066553413693> **${prefix}yardım-moderasyon2**`,`2. Moderasyon Komutlarını Listeler`)
             .addField(`<a:ne:757880066553413693> **${prefix}yardım-moderasyon3**`,`3. Moderasyon Komutlarını Listeler`)
             .addField(`<a:vhb:734785460496236655> **${prefix}yardım-kullanıcı**`, `Sunucu Ve Kullanıcı Komutlarını Listeler`)
             .addField(`<a:tops:757881882036797471> **${prefix}yardım-eğlence**`, `Eğlence Komutlarını Listeler`)
             .addField(`<a:mavi:757881826185576452> **${prefix}yardım-kayıt**` , `Kayıt Komutlarını Listeler`)
             .addField(`<a:ate:757883724099485726> **${prefix}yardım-ekonomi**`, `Ekonomi Komutlarını Listeler`)
             .addField(`<a:lvl:743469368415092808> **${prefix}yardım-seviye**`, `Seviye Komutlarını Listeler`)
        .addField(`<:guardd:707524751605628988> **${prefix}yardım-koruma**`, `Koruma Komutlarını Listeler`)
        .setImage(`https://cdn.discordapp.com/attachments/754927033682755586/768106581602598923/standard.gif`)
             .setFooter(`${message.author.username} Tarafından İstendi`, message.author.avatarURL())
            
        return message.channel.send(yardim);
}

exports.conf = {
    enabled : true,
    guildOnly : false,
    aliases : ['y'],
    permLevel : 0
}

exports.help = {
    name : 'yardım',
    description : 'Komut Gösterir atar',
    usage : '-yardım'
}
