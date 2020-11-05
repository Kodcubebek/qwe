const Discord = require ("discord.js");
exports.run = (client, message) => {
  
  
  var Darkcode = new Discord.MessageEmbed()
  
  .setColor("RANDOM")
  .setDescription(`Artık sende korona oldun${message.author.username}`)
  .setImage(`https://cdn.discordapp.com/attachments/677985078202073109/689935110551765023/a.gif`)
  
  message.channel.send(Darkcode)
  
}
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  kategori: "",
  permLevel: 0
};
module.exports.help = {
  name: 'korona-ol',
};