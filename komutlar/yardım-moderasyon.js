const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = async(client, message, args) => {

        const yardim = new Discord.MessageEmbed()

             .setColor('')
              .setTitle(``)
             .setAuthor(`Matessa`, client.user.avatarURL()) 
             .setThumbnail(client.user.avatarURL())
             .addField(`<a:ne:757880066553413693>Moderasyon-Komutları`,`**${prefix}uyar** Kullanıcıyı Uyarırsın \n **${prefix}uyarı-log** Uyarı Log Kanalını ayarlarsın \n **${prefix}uyarı-sayı** Kullanıcı Uyarı Sayısını Gösterir \n **${prefix}uyarı-sistemi-sıfırla** Uyarı Sistemini Sıfırlarsın \n  **${prefix}ban** Kullanıcıyı Banlar \n **${prefix}ban-log** Ban Log Sistemini Ayarlar \n  **${prefix}unban** Kullanıcının Banını Kaldırırsın \n **${prefix}küfür-ayarla** Küfür Korumasını Aktif Edersin \n **${prefix}reklam-engelle** Reklam Korumasını Aktif Edersin \n **${prefix}kurallar** Hazır Kurallar Gösterir \n **${prefix}sil** Belirtiğin Kadar Mesaj Siler \n **${prefix}kategori-oluştur** Kategori Oluşturursun \n **${prefix}sa-as** Sa-as Sistemini Açarsın \n **${prefix}sayaç** Sayaç-Sistemini Ayarlarsın \n **${prefix}sayaç-sıfırla** Sayaç-Sistemini Sıfırlarsın \n **${prefix}oto-tag** Oto-Tag Sistemini Ayarlarsın \n **${prefix}oto-tag-kanal** Oto-Tag Kanalını Ayarlarsınız \n **${prefix}oto-tag-kapat** Oto-Tagı Sistemini Kapatırsın`) 
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
    name : 'yardım-moderasyon',
    description : 'Komut Gösterir atar',
    usage : '-yardım'
}
