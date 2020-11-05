const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = async(client, message, args) => {

        const yardim = new Discord.MessageEmbed()

             .setColor('')
              
             .setAuthor(`Matessa`, client.user.avatarURL()) 
             .setThumbnail(client.user.avatarURL())
             .addField(`<:guardd:707524751605628988> **Koruma Komutları**`,`**${prefix}ban-koruma** Ban koruma Sistemini Açarsın \n **${prefix}ban-koruma-sıfırla** Ban Koruma Sistemini Sıfırlarsın \n **${prefix}rol-koruma** Rol Koruma Sistemini Açarsın \n **${prefix}rol-koruma-sıfırla** Rol Koruma Sistemini Sıfırlarsın \n **${prefix}kanal-koruma** Kanal Koruma Sistemini Açarsın \n **${prefix}kanal-koruma-sıfırla** Kanal Koruma Sistemini Sıfırlarsın \n **${prefix}fake-hesap-koruma** Fake Hesap Koruma Sistemini Açarsın \n **${prefix}fake-hesap-koruma sıfırla** Fake Hesap Korumasını Sıfırlarsın`)
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
    name : 'yardım-koruma',
    description : 'Komut Gösterir atar',
    usage : '-yardım'
}
