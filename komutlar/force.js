const Discord = require('discord.js')

    exports.run = async (client, message, args) => {

if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(` Bu komutu kullanabilmek için "\`yönetici\`" yetkisine sahip olmalısın`);
  
    let member = args[0];
if (!member) return message.reply(`Forceleyeceğin Kullanıcıyı Belirt!`)

    if (isNaN(member)) return message.reply(`Lütfen Düzgün Bir İD Giriniz ! `);

    let sebep = args.splice(1).join(' ') 
if (!sebep) return message.channel.send(`Neden Belirt!`)

   message.guild.members.ban(member, {
  reason: sebep
})

message.channel.send(`${member} İD'li Kullanıcı **${sebep}** Nedeniyse Sunucudan Forcelendi!`)
    

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0,
};

exports.help = {
    name: 'force-ban',
};