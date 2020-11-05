const Discord = require("discord.js");
 
exports.run = async (client, message, members) => {
 
 
  const darkcodes = members.map(DarkCode  => DarkCode.displayName).join("\n");
 
  const DarkCodes = members.size;
  const DarkCode = new Discord.MessageEmbed()
    .setTitle("Boost Bilgileri")
//DarkCode
    .setColor()
    .setTimestamp()
    .addField(
      "Sunucu Boost Seviyesi",
      "```" + message.guild.premiumTier + "```"
    )
//DarkCode
    .addField(
      "Toplam Boost Sayısı",
      "```" + message.guild.premiumSubscriptionCount + "```"
    )
//DarkCode
  message.channel.send(DarkCode);
};
//DarkCode
exports.conf = {
  aliases: ['boostbilgi'],
  enabled: true,
  guild0nly: true
};
//DarkCode
  exports.help = {
  name: "boost-info",
    usage: "boost-info"
};
//DarkCode