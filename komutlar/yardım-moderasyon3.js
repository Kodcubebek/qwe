const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = async(client, message, args) => {

        const yardim = new Discord.MessageEmbed()

             .setColor('')
              .setTitle(``)
             .setAuthor(`Matessa`, client.user.avatarURL()) 
             .setThumbnail(client.user.avatarURL())
             .addField(`<a:ne:757880066553413693>Moderasyon-Komutları`,`**${prefix}oto-isim** Sunucuya Giren Kişini Adını Otomatik Değiştiri \n **${prefix}oto-isim sıfırla** Oto İsmi Sıfırlarsınız \n **${prefix}nick** Kullanıcın Adını Değiştirirsiniz \n **${prefix}bot-oto-rol** Sunucuya Giren Botlara Verilecek Oto rolu Ayarlar \n **${prefix}bot-oto-rol sıfırla** Sunucya Giren Botlara Verilecek Rolu Sıfırlar \n **${prefix}sunucu-panel** Sunucu Paneli Açarsın \n **${prefix}spam-engel-aç** Spam engel Açarsın \n **${prefix}spam-engel-kapat** Spam engel Kapatırsın \n **${prefix}tag-rol-sistem** Tag Rol Sistem Komutlarını Listeler \n **${prefix}yasaklı-tag** Yasaklı Tag Koruması Açar`)
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
    name : 'yardım-moderasyon3',
    description : 'Komut Gösterir atar',
    usage : '-yardım'
}
