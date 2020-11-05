const Discord = require('discord.js');

 exports.run = (client, message, args) => {
     if(message.channel.type == "dm")  return;
  if(message.channel.type !== "text") return;
   
       if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`Bu komutu kullanabilmek için **Mesajları Yönet** iznine sahip olmalısın!`).then(m => m.delete(10000));

   message.delete();

   let question = args.join(' ');

   let user = message.author.username

   if (!question) return message.channel.send(

     new Discord.MessageEmbed()
     .setTitle(`<a:dikkat:727446342514901082>yazı yazman gerek <a:dikkat:727446342514901082>`)).then(m => m.delete(5000));
         

     message.channel.send(

       new Discord.MessageEmbed()

       .setColor("RANDOM")
       .setThumbnail(message.author.displayAvatarURL())
       .setTimestamp()
       .setFooter('Dost•Bot', client.user.avatarURL())

       .addField(`**Oylama**`, `**${question}**`)).then(function(message) {

         message.react('✅');

         message.react('❌');

       });

     };

     exports.conf = {
       enabled: true,
       guildOnly: false,
       aliases: ['oylama'],

  permLevel: 1,
           kategori: "Yetkili"

};

exports.help = {
  name: 'oylama',
  description: 'Oylama yapmanızı sağlar.',
  usage: '.oylama <oylamaismi>'
};
