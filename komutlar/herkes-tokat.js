const Discord = require('discord.js');

exports.run = function(client, message, args) {
 let user = message.mentions.users.first();




    const DarkCode =new Discord.MessageEmbed()
    .setColor("0x808080")
    .setDescription(message.author.username +  '**Herkesi Tokatladı 🖐️ **')
    .setImage('https://1.bp.blogspot.com/-TB3w5e9IyY0/XXLcGHgsyVI/AAAAAAAAyMU/7aDGj7N6hxEvNCT4xZm1abnqHF7iqkuEQCLcBGAs/s1600/osmanli_tokadi.gif')
    .setFooter(`${message.author.username} Tarafından Tokat Atıldı`, message.author.avatarURL())
    return message.channel.send(DarkCode);

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'herkese-tokat',
  description: 'Belirtilen kişiyi, Tokatlar!',
  usage: 'tokat'
};