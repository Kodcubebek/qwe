const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = async(client, message, args) => {

        const yardim = new Discord.MessageEmbed()

             .setColor('')
             .setAuthor(`Matessa`, client.user.avatarURL()) 
             .setThumbnail(client.user.avatarURL())
             .addField(`<a:tops:757881882036797471>Eğlence-Komutları`, `**${prefix}cs-kasa-aç** Cs-Go Kasa Açarsınız \n **${prefix}öp** Birini Öpersin \n **${prefix}kralol** Kral Olursun \n **${prefix}kimlik** Kimlik Oluşturursun \n **${prefix}kaçcm** Malafatını Ölçer \n **${prefix}zula-deste-aç** Zula Deste Açarsın. \n **${prefix}fbi** Fbi Gelir \n **${prefix}çıkma-teklifi-et** Çıkma Teklifi Edersin \n **${prefix}zula-kasa-aç** Zula Kasası Açarsın \n **${prefix}korona-ol** Korona Olursunuz \n **${prefix}tokat-at** Bir Kullanıcıya Tokat Atarsınız \n **${prefix}yumruk-at** Bir Kullanıcıya Yumruk Atarsınız \n**${prefix}efkar** Efkarını Ölçer \n **${prefix}çay** Herkese Çay Ismarlsınız \n **${prefix}duello** Duello Başlatırısınız \n **${prefix}yemek** Herkese Yemek ismarlarsınız \n **${prefix}adam-asmaca** Adam Asmaca Oyunu Oynarsınız \n **${prefix}ara155** Polisi Ararsınız \n **${prefix}wasted** Profil Efeckt verir \n **${prefix}adam-ol** Profil Efeckt Verir \n **${prefix}tr** Profil Efcekt Verir`) 
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
    name : 'yardım-eğlence',
    description : 'Komut Gösterir atar',
    usage : '-yardım'
}
