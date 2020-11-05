const Discord = require('discord.js')
const db = require('quick.db');


exports.run = async (client, message, args) => {
  
  if (!args[0]) return message.reply(`Mevcut Markettekiler : \n Silahlar: Uzi \n Fiyati : **500 TL** \n`)
  
  if (args[0] === 'Uzi') {
    let para = await db.get(`para_${message.author.id}`) 
    let fiyatcık = 500 // istediğiniz fiyat
    
    
    if (para < fiyatcık) return message.reply('Yeterli Paran Yok!')
      
    
    db.set(`ìştebişiler_${message.author.id}`, "aktifdir")
    db.add(`para_${message.author.id}`, -fiyatcık)
    
    return message.reply(`Ürünü Başarıyla Aldınız`)
  }


  
}
exports.conf = {
  
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: 'market'
}