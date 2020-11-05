const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = async(client, message, args) => {

        const yardim = new Discord.MessageEmbed()

             .setColor('')
              .setTitle(``)
             .setAuthor(`Matessa`, client.user.avatarURL()) 
             .setThumbnail(client.user.avatarURL())
             .addField(`<a:ne:757880066553413693>Moderasyon-Komutları`,`**${prefix}güvenlik** Güvenlik Kanalını Ayarlarsınız \n **${prefix}güvenlik sıfırla** Güvenlik Kanalını Sıfırlarsın \n **${prefix}snipe** Silinen Mesajı Gösterir \n **${prefix}oto-rol** Oto-rol Sistemini Ayarlarsın \n **${prefix}oto-rol sıfırla** Oto Rolu Sıfırlarsınız \n **${prefix}kick** Kullanıcıyı Sunucdan Atarsınız \n **${prefix}kick-log** Kick Kanalını Ayarlarsınız \n **${prefix}yavaş-mod** Yazma Süresini Ayarlsınız \n  **${prefix}say** Sunucuyu Sayarsınız \n **${prefix}ban-say** Sunucdaki Banlı Sayısını Gösterir \n **${prefix}resimli-hg-bb** Resimli Hg-Bb Kanalını Açarsınız \n **${prefix}capslock-engel** capslock-engel Korumasını Açarsınzı \n **${prefix}mod-log** Mod-log Kanalını Ayarlarsınız \n **${prefix}mute-yetkili-rol** Mute Yetkili Rolu Ayarlarsın \n **${prefix}mute-rol** Mute Rolunu Ayarlarsın \n **${prefix}mute** Kullanıcıyı Mutelersin \n **${prefix}unmute** Kullanıcının Mutesini Kaldırırsın \n **${prefix}force-ban** Force Ban Atarsın \n **${prefix}everyone-here-engel** Everyone Here Engeli Açarsınız \n **${prefix}davet-log** Davet Takip Log Kanalını Ayarlarsınız \n **${prefix}davet-log sıfırla** Davet Takip Kanalını Sıfırlarsınız `)
             .setFooter(`${message.author.username} Tarafından İstendi`, message.author.avatarURL())
            
        return message.channel.send(yardim);
}

exports.conf = {
    enabled : true,
    guildOnly : false,
    aliases : [],           ///\n **${prefix}isim-değiştir** Kullanıcın İsmini Değiştirirsiniz
    permLevel : 0
}

exports.help = {
    name : 'yardım-moderasyon2',
    description : 'Komut Gösterir atar',
    usage : '-yardım'
}
