const Discord = require('discord.js');
const frenzydb = require("quick.db")
const frenzyms = require('parse-ms')
exports.run = async(client, message, args) => { 
  
let fc = await frenzydb.fetch(`günlükbea_${message.author.id}`)
if (fc !== null && 86400000 - (Date.now() - fc) > 0) {
let time = frenzyms(86400000 - (Date.now() - fc));


message.reply(`Günlük hediyeni almak için ${time.hours} saat,  ${time.minutes} dakika, ${time.seconds} saniye daha beklemenn gerek`) 
return
}
  
frenzydb.add(`para_${message.author.id}`, 745) 
frenzydb.set(`günlükbea_${message.author.id}`, Date.now()) 
let para = await frenzydb.fetch(`para_${message.author.id}`) || 0
  
message.reply(`Günlük oldülünü aldın birdaha almana 24 saat var şimdiki para : **${para}**`)
  

  
 };
exports.conf = {
  enabled: false,  
  guildOnly: false, 
  aliases: ['günlükhediyem'], 
  permLevel: 0
};

exports.help = {
  name: 'günlük-para'
};
