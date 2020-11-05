const Discord = require('discord.js')
const db = require('quick.db')

  exports.run = async(client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
    const data = await db.fetch(`snipe.id.${message.guild.id}`)
    if(!data) {
    const snipe2 = new Discord.MessageEmbed()
  .setAuthor(client.user.username, client.user.avatarURL)
  .setDescription(`Hiç mesaj silinmemiş.`)
.setColor(``)
    message.channel.send({embed: snipe2});
          } else {
  let kullanıcı = client.users.cache.get(data);
  const data2 = await db.fetch(`snipe.mesaj.${message.guild.id}`)
  const snipe = new Discord.MessageEmbed()
  .setAuthor(kullanıcı.username, kullanıcı.avatarURL)
  .setDescription(`En son silinen mesaj: ` + data2)
.setColor(``)
  message.channel.send(snipe) }
}
exports.conf = {
    enabled: true,
    guildonly: false,
    aliases: [],
    permlevel: 0
    }
    exports.help = {
    name: 'snipe',
    description: '',
    usage: ''
    }