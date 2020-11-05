const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  let ask = Math.floor(Math.random() * 100);
  let member = message.mentions.members.first()
  if(!member) return message.reply('Kimle aşk ölçeceğini belirtmelisin!');
  let abc = await message.channel.send('Aşkınız ölçülüyor...');
  abc.delete();
  message.channel.send(new Discord.MessageEmbed().setDescription(`${member} ve ${message.author}, aşk seviyeniz: **%${ask}**`).setAuthor("Aşk Ölçer", client.user.avatarURL).setThumbnail(message.author.avatarURL))
};
 
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['aşk-ölçer'],
    permLevel: 0,
   };
 
  exports.help = {
    name: 'aşkölçer',
    description: 'Aşk Ölçmeni Sağlar.',
    usage: 'aşkölçer [kişi]',
    kategori: 'eğlence'
   }