const Discord = require('discord.js');

exports.run = (client, message) => {
	let csgopng = "https://s3.eu-central-1.amazonaws.com/images.gamesatis.com/products/images/000/024/659/medium/kombo-kasa.jpg"
    var kasadancikanlar = [
		"**1.000 Zp**",
		"**2.500 Xp**",
		"**10.000 Zp**",
		"**1 Günlük Aug**",
		"**1.000.000 Zp**",
		"**7 Günlük Kar98**",
		"**1.500 Zp**",
		"**120 Günlük Kırıkkale**",
		"**0 Günlük**",
		"**25.000 Xp**",
		"**50.000 Xp**",
		"**50.000 Zp**",
		"**25.000 Zp**",
		"**15 Günlük Awp**",
		"**1 Günlük Fn-Fal**",
		"**Sınırsız Kelebek**",
		"**90 Günlük Ustura**",
		"**7 Günlük Hiç Bişe 😉**",
    "**2.000.000 Zp"

	]
    var kasadancikanlar = kasadancikanlar[Math.floor(Math.random(1) * kasadancikanlar.length)]
	const embed  = new Discord.MessageEmbed()
	.setImage("https://s3.eu-central-1.amazonaws.com/images.gamesatis.com/products/images/000/024/659/medium/kombo-kasa.jpg")
	.setAuthor(`Dost•Bot`, client.user.avatarURL())
	.setDescription(`${kasadancikanlar}`)
	.setFooter(`Kasayı açan (${message.author.username}) | Kasa Fiyatı: 2990za | Kasadan çıkan bütün ürünler sizde kalmaz sadece eğlence için yapılmış bir komutdur`)
	.setColor("RANDOM")
message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'zula-kasa-aç',
  description: 'Zula kasa açma simülasyonu',
  usage: 'zula-kasa-aç'
};