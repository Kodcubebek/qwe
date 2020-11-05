const Discord = require('discord.js');
exports.run = (client, message, args) => {
    let mesaj = args.slice(0).join(' ');
    const embed = new Discord.MessageEmbed()
    .setAuthor('')
    .setColor("BLACK")
    .setDescription(`** ${mesaj} ` + message.author.username + ' FBI Open the door !**')
    .setImage(`https://media1.tenor.com/images/93d11bc59526ce49f60766f0045d819b/tenor.gif?itemid=11500735 `)
    return message.channel.send(embed);
};
exports.conf = {
  enabled: false,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'fbi',
  description: 'FBI',
  usage: 'Fbi Geldi aç kapıyı',
};