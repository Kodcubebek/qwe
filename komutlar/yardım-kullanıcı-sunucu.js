const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = async(client, message, args) => {

        const yardim = new Discord.MessageEmbed()

             .setColor('')
             .setTitle(``)
            .setAuthor(`Matessa`, client.user.avatarURL()) 
             .setThumbnail(client.user.avatarURL())
             .addField(`<a:vhb:734785460496236655>Kullanıcı ve Sunucu Komutları`,`**${prefix}avatar** Kullanıcının Avatarını Gösteriri \n **${prefix}istatistik** Bot istatistik Gösteriri \n **${prefix}davet** Botu Davet Linklerini Gösterir \n **${prefix}ping** Botun Pingini Gösterir \n **${prefix}sunucu-resmi** Sunucu Resmini Gösterir \n **${prefix}sunucu-bilgi** Sunucu Hakkında Bilgi Verir \n **${prefix}afk** Afk Olmanızı Sağlar \n **${prefix}korona** Güncel Korona Bilgisi Verir \n **${prefix}oylama** Oylama Başlatırsın \n **${prefix}kullanıcı-bilgi** Kullanıcı Hakkında bilgi Verir. \n **${prefix}davetlerim** Davetlerinizi Gösteriri`)
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
    name : 'yardım-kullanıcı',
    description : 'Komut Gösterir atar',
    usage : '-yardım'
}
