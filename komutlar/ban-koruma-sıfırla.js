const Discord = require("discord.js"),
  db = require("quick.db");

module.exports.run = async (client, message, args) => {
 
    let kanal = await db.fetch(`bank_${message.guild.id}`)
    if (!kanal) {
      const embed = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setFooter(client.user.username, client.user.avatarURL())
        .setDescription(`Ban koruma sistemi zaten ayarlanmamış!`);
      message.channel.send(embed);
      return;
    }
    db.delete(`bank_${message.guild.id}`);
    const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setFooter(client.user.username, client.user.avatarURL())
      .setDescription(`Ban koruma sistemi sıfırlandı!`);
    message.channel.send(embed);
    return;
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: "ban-koruma-sıfırla",
  description: "ban-koruma-sıfırla",
  usage: "ban-koruma-sıfırla"
};
