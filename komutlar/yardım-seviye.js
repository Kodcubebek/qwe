const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = async(client, message, args) => {

        const yardim = new Discord.MessageEmbed()

             .setColor('')
              .setTitle(``)
             .setAuthor(`Matessa`, client.user.avatarURL()) 
             .setThumbnail(client.user.avatarURL())
             .addField(`<a:lvl:743469368415092808>Seviye Komutları`, `**${prefix}seviye-log** Seviye log Kanalını Ayarlasınız \n **${prefix}seviye-log sıfırla** Seviye Log Kanalını Sıfırlarsınız \n **${prefix}seviye-xp** Mesaj Başına Verilecek Xp Değerini Ayarlarsınız \n **${prefix}seviye-xp sıfırla** Meaj Başına Verilecek Xp Değerini Sıfırlarsınız \n**${prefix}seviyem** Seviyenizi Gösteriri`)
             .setFooter(`${message.author.username} Tarafından İstendi`, message.author.avatarURL())
            
        return message.channel.send(yardim);
}

exports.conf = {
    enabled : true,
    guildOnly : false,
    aliases : [],
    permLevel : 0
}

exports.help = {
    name : 'yardım-seviye',
    description : 'Komut Gösterir atar',
    usage : '-yardım'
}
