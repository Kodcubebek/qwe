
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');
const ms = require('ms')
exports.run = async (client, message, args) => {
let kişi = message.mentions.users.first() || message.author

let parapara = await db.fetch(`para_${kişi.id}`) || 0  
  const embed = new Discord.MessageEmbed()
  .setDescription(`${kişi} Adlı Kullanıcın Toplam **${parapara} TL** Parası var`)
  
  message.channel.send(embed)
};
exports.conf = {
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'para'
};

