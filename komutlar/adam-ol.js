const Discord = require("discord.js");
var Jimp = require('jimp');
//ejderteam code
exports.run = async (client, message, args) => {
  var user = message.mentions.users.first() || message.author;
  message.channel.startTyping();
    var user = message.mentions.users.first() || message.author;
   
    if (!message.guild) user = message.author;

Jimp.read('https://cdn.discordapp.com/attachments/617672562281021459/617793751527718923/adamol_icin.jpg', (err, image) => {
    image.resize(301, 168)
    //image.greyscale()
    //image.gaussian(3)
    Jimp.read(user.displayAvatarURL({format: "png"}), (err, avatar) => {       //ejderteam code
        avatar.resize(100, 100)
        image.composite(avatar, 70, 10).write(`./img/rip/${client.user.id}-${user.id}.png`);
        setTimeout(function() {
          message.channel.send(new Discord.MessageAttachment(`./img/rip/${client.user.id}-${user.id}.png`));
        }, 1000);
       message.channel.stopTyping();
    });
//ejderteam code
});
}
exports.conf = {
 enabled: true,
 guildOnly: false,             //ejderteam code
 aliases: ['adamol'],
 permLevel: 0
};

exports.help = {
 name: 'adam-ol',
 description: 'Profil fotoğrafınıza RIP efekti ekler.',
 usage: 'adamol'
};
//ejderteam code