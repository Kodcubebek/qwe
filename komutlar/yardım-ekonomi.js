const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = async(client, message, args) => {

        const yardim = new Discord.MessageEmbed()

             .setColor('')
              .setTitle(``)
         .setAuthor(`Matessa`, client.user.avatarURL()) 
             .setThumbnail(client.user.avatarURL())
             .addField(`<a:ate:757883724099485726>Ekonomi Komutları`,`**${prefix}günlük-para** Günlük Paranı Alırsınız \n **${prefix}hesap-aç** Banka Hesabı Açarsınız \n **${prefix}hesap** Hesap Bilgilerini Gösterir \n **${prefix}hesap-sil** Banka Hesabınızı Siler \n **${prefix}market** Marketi Açar \n **${prefix}para** Paranızı Gösterir \n **${prefix}para-gönder** Para Gönderirsiniz`)
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
    name : 'yardım-ekonomi',
    description : 'Komut Gösterir atar',
    usage : '-yardım'
}
