const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  if(message.author.id !== ayarlar.sahip) {
     const embed = new Discord.MessageEmbed()
    .setDescription(`**:x: Bu Komut Yapımcıma Özeldir !**`)
    .setColor('BLUE')
    return message.channel.send(embed).then(msg=>msg.delete(3000));
    }
  let ask = ['100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000']
  let member = message.mentions.members.first()
  if(!member) return message.reply('Kimle aşk ölçeceğini belirtmelisin!');
  let abc = await message.channel.send('Aşkınız ölçülüyor...');
  abc.delete();
  message.channel.send(new Discord.MessageEmbed().setDescription(`${member} ve ${message.author}, aşk seviyeniz: **%${ask}**`).setAuthor("Aşk Ölçer", client.user.avatarURL).setThumbnail(message.author.avatarURL))
};
 
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
   };
 
  exports.help = {
    name: 'beyza-muhammet',
    description: 'Aşk Ölçmeni Sağlar.',
    usage: 'aşkölçer [kişi]',
    kategori: 'eğlence'
   }