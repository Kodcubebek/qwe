const Discord = require('discord.js')

exports.run = (client, message, args) => {
  const çay = new Discord.MessageEmbed()
  .setDescription(`<@${message.author.id}> İsimli Kullanıcı Herkese Yemek Ismarladı`)
  .setImage("https://media.giphy.com/media/QYeXu2tZmPghrg37PK/giphy.gif")
  .setColor('ORANGE')
  message.channel.send(çay)
}
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'yemek',
    description: '.d',
    usage: 'Yarrak :D' 
  };