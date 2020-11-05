const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const moment = require("moment");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const http = require("http");
const express = require("express");
require("./util/eventLoader.js")(client);
const path = require("path");
const snekfetch = require("snekfetch");

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
const invites = {};

const wait = require("util").promisify(setTimeout);

client.on("ready", () => {
  wait(1000);

  client.guilds.cache.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});



client.on("guildMemberAdd", async member => {
if(member.user.bot) return;
  member.guild.fetchInvites().then(async guildInvites => {
    let kanal = await db.fetch(`davetlog_${member.guild.id}`);
    if (!kanal) return;
    const ei = invites[member.guild.id];

    invites[member.guild.id] = guildInvites;
    const invite = await guildInvites.find(i => (ei.get(i.code) == null ? (i.uses - 1) : ei.get(i.code).uses) < i.uses);
    const daveteden = member.guild.members.cache.get(invite.inviter.id);

    db.add(`davet_${invite.inviter.id}_${member.guild.id}`, +1);
    db.set(`bunudavet_${member.id}`, invite.inviter.id);
    let davetsayiv2 = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);

    let davetsayi;
    if (!davetsayiv2) davetsayi = 0;
     else davetsayi = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);

client.channels.cache.get(kanal).send(`${member} Adlı Kullanıcı Aramıza Katıldı. Kullanıcıyı Davet Eden  ${daveteden}  Toplam **${davetsayi}** Daveti Oldu`)  

      }
    
  );
});

client.on("guildMemberRemove", async member => {
  let kanal = await db.fetch(`davetlog_${member.guild.id}`);
  if (!kanal) return;
  let davetçi = await db.fetch(`bunudavet_${member.id}`);
  const daveteden = member.guild.members.cache.get(davetçi);
      let mesaj = db.fetch(`davetbbmesaj_${member.guild.id}`)
  db.add(`davet_${davetçi}_${member.guild.id}`, -1);
  let davetsayi = await db.fetch(`davet_${davetçi}_${member.guild.id}`);
  
  if (!davetçi) {
    return client.channels.cache.get(kanal).send(`${member} Adlı Kullanıcı Aramızdan Ayarıldı Davet Eden Bulunamadı!`);
  } else {
     
client.channels.cache.get(kanal).send(`${member} Adlı Kullanıcı Aramızadan Ayrıldı Kullanıcıyı Davet Eden ${daveteden}  Toplam  **${davetsayi}** Daveti Kaldı`)  
  
      }
    }
);

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

//---------------------------------KOMUTLAR---------------------------------\\
client.on("message", msg => {
  if (
    msg.content.includes(`<@${client.user.id}>`) ||
    msg.content.includes(`<@!${client.user.id}>`)
  )
    msg.channel.send(
      `**Prefixim:** ${ayarlar.prefix} \n**Yardım İçin:** ${ayarlar.prefix}yardım`
    );
});
///////////
client.on("guildMemberAdd", async(member) => {
  let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`)
  if(sunucupaneli) {
    let rekoronline = await db.fetch(`panelrekor_${member.guild.id}`)
    let toplamuye = member.guild.channels.cache.find(x =>(x.name).startsWith("Toplam Üye •"))
    let toplamaktif = member.guild.channels.cache.find(x =>(x.name).startsWith("Aktif Üye •"))
    let botlar = member.guild.channels.cache.find(x =>(x.name).startsWith("Botlar •"))
    let rekoraktif = member.guild.channels.cache.find(x =>(x.name).startsWith("Rekor Aktiflik •"))
    let songelen =  member.guild.channels.cache.find(x =>(x.name).startsWith("Son Üye • "))
   
    
    if(member.guild.members.cache.filter(off => off.presence.status !== 'offline').size > rekoronline) {
      db.set(`panelrekor_${member.guild.id}`, member.guild.members.cache.filter(off => off.presence.status !== 'offline').size)
    }
    try{
      toplamuye.setName(`Toplam Üye • ${member.guild.members.cache.size}`)
      toplamaktif.setName(`Aktif Üye • ${member.guild.members.cache.filter(off => off.presence.status !== 'offline').size}`)
      botlar.setName(`Botlar • ${member.guild.members.cache.filter(m => m.user.bot).size}`)
      rekoraktif.setName(`Rekor Aktiflik • ${rekoronline}`)
      songelen.setName(`Son Üye • ${member.user.username}`)
   } catch(e) { }
  }
})
client.on("guildMemberRemove", async(member) => {
  let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`)
  if(sunucupaneli) {
    let rekoronline = await db.fetch(`panelrekor_${member.guild.id}`)
    let toplamuye = member.guild.channels.cache.find(x =>(x.name).startsWith("Toplam Üye •"))
    let toplamaktif = member.guild.channels.cache.find(x =>(x.name).startsWith("Aktif Üye •"))
    let botlar = member.guild.channels.cache.find(x =>(x.name).startsWith("Botlar •"))
    let rekoraktif = member.guild.channels.cache.
    find(x =>(x.name).startsWith("Rekor Aktiflik •"))
    
    if(member.guild.members.cache.filter(off => off.presence.status !== 'offline').size > rekoronline) {
      db.set(`panelrekor_${member.guild.id}`, member.guild.members.cache.filter(off => off.presence.status !== 'offline').size)
    }
    try{
      toplamuye.setName(`Toplam Üye • ${member.guild.members.cache.size}`)
      toplamaktif.setName(`Aktif Üye • ${member.guild.members.cache.filter(off => off.presence.status !== 'offline').size}`)
      botlar.setName(`Botlar • ${member.guild.members.cache.filter(m => m.user.bot).cache.size}`)
      rekoraktif.setName(`Rekor Aktiflik • ${rekoronline}`)
    
   } catch(e) { }
  }
})
//////////
////////hg-bb
client.on("guildMemberAdd", async member => {
  let resimlihgbb = await db.fetch(`giriş_${member.guild.id}`);
  if (resimlihgbb) {
    const gözelkanal = member.guild.channels.cache.get(
      db.fetch(`giriş_${member.guild.id}`)
    );
    if (gözelkanal) {
      let username = member.user.username;
      if (gözelkanal.type === "text") {
        const bg = await Jimp.read(
          "https://cdn.discordapp.com/attachments/721758743678943263/735808414306795520/lNNpU1e.jpeg"
        );
        const userimg = await Jimp.read(
          member.user.displayAvatarURL({ format: "png" })
            ? member.user.displayAvatarURL({ format: "png" })
            : client.user.avatarURL()
        );
        var font;
        if (member.user.tag.length < 15)
          font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
        else if (member.user.tag.length > 15)
          font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
        else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
        await bg.print(font, 430, 170, member.user.tag);
        await userimg.resize(362, 362);
        await bg
          .composite(userimg, 43, 26)
          .write("./img/" + client.user.username + "Hosgeldin.png");
        setTimeout(function() {
          if (member.user.id === ayarlar.sahip) {
            gözelkanal.send(
              new Discord.MessageAttachment(
                "./img/" + client.user.username + "Hosgeldin.png"
              )
            );
            gözelkanal.send("");
          } else {
            gözelkanal.send(
              new Discord.MessageAttachment(
                "./img/" + client.user.username + "Hosgeldin.png"
              )
            );
          }
        }, 1000);
        setTimeout(function() {
          fs.unlinkSync("./img/" + client.user.username + "Hosgeldin.png");
        }, 10000);
      }
    }
  }
});
client.on("guildMemberRemove", async member => {
  let resimlihgbb = await db.fetch(`giriş_${member.guild.id}`);
  if (resimlihgbb) {
    const gözelkanal = member.guild.channels.cache.get(
      db.fetch(`giriş_${member.guild.id}`)
    );
    if (gözelkanal) {
      let username = member.user.username;
      if (gözelkanal.type === "text") {
        const bg = await Jimp.read(
          "https://cdn.discordapp.com/attachments/721758743678943263/735810047174639676/DYA48yH.jpeg"
        );
        const userimg = await Jimp.read(
          member.user.displayAvatarURL({ format: "png" })
            ? member.user.displayAvatarURL({ format: "png" })
            : client.user.avatarURL()
        );
        var font;
        if (member.user.tag.length < 15)
          font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
        else if (member.user.tag.length > 15)
          font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
        else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
        await bg.print(font, 430, 170, member.user.tag);
        await userimg.resize(362, 362);
        await bg
          .composite(userimg, 43, 26)
          .write("./img/" + client.user.username + "Gorusuruz.png");
        setTimeout(function() {
          if (member.user.id === ayarlar.sahip) {
            gözelkanal.send(
              new Discord.MessageAttachment(
                "./img/" + client.user.username + "Gorusuruz.png"
              )
            );
            gözelkanal.send("");
          } else {
            gözelkanal.send(
              new Discord.MessageAttachment(
                "./img/" + client.user.username + "Gorusuruz.png"
              )
            );
          }
        }, 1000);
        setTimeout(function() {
          fs.unlinkSync("./img/" + client.user.username + "Gorusuruz.png");
        }, 10000);
      }
    }
  }
});

///////
////////Güvenlik
client.on("guildMemberAdd", async member => {
  let kullanıcı = client.users.cache.get(member.id);
  let kanal = db.fetch(`guvenlik${member.guild.id}`);

  if (!kanal) return;

  const Canvas = require("canvas");
  const canvas = Canvas.createCanvas(360, 100);
  const ctx = canvas.getContext("2d");

  const resim1 = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/591299755976425493/614151181752860672/yhosgeldirrn.png"
  );
  const resim2 = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/591299755976425493/614164419768877056/yhosgeldirrn.png"
  );
  const kurulus = new Date().getTime() - kullanıcı.createdAt.getTime();
  const gün = moment.duration(kurulus).format("D");
  var kontrol;
  if (kurulus > 2629800000) kontrol = resim2;
  if (kurulus < 2629800000) kontrol = resim1;

  const background = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/754927033682755586/757966599041974352/as.jpg"
  );
  ctx.drawImage(background, 0, 0);

  const avatar = await Canvas.loadImage(
    member.user.displayAvatarURL({ format: "png" })
  );
  ctx.drawImage(kontrol, 0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.arc(180, 46, 36, 0, 2 * Math.PI);
  ctx.clip();
  ctx.drawImage(avatar, 143, 10, 73, 72);

  const resim = new Discord.MessageAttachment(canvas.toBuffer(), "dostbot.png");
  return client.channels.cache.get(kanal).send(resim);
});
////////sa-as aç
client.on("message", async (msg, member, guild) => {
  let i = await db.fetch(`saas_${msg.guild.id}`);
  if (i === "açık") {
    if (msg.content.toLowerCase() === "sa") {
      msg.reply("**Aleyküm Selam Hoşgeldin.**");
    }
  }
});
client.on("message", async (msg, member, guild) => {
  let i = await db.fetch(`saas_${msg.guild.id}`);
  if (i === "açık") {
    if (msg.content.toLowerCase() === "hb") {
      msg.reply("**Nasılsın ?**");
    }
  }
});
client.on("message", async (msg, member, guild) => {
  let i = await db.fetch(`saas_${msg.guild.id}`);
  if (i === "açık") {
    if (msg.content.toLowerCase() === "iyi") {
      msg.reply("**Allah İyilik Versin**");
    }
  }
});

client.on("message", async (msg, member, guild) => {
  let i = await db.fetch(`saas_${msg.guild.id}`);
  if (i === "açık") {
    if (msg.content.toLowerCase() === "kötü") {
      msg.reply("**Gine Ne oldu ?**");
    }
  }
});
client.on("message", async (msg, member, guild) => {
  let i = await db.fetch(`saas_${msg.guild.id}`);
  if (i === "açık") {
    if (msg.content.toLowerCase() === "sea") {
      msg.reply("**Aleyküm Selam Hoşgeldin.**");
    }
  }
});

/////////////

////////Küfür
client.on("message", async msg => {
  const i = await db.fetch(`${msg.guild.id}.kufur`);
  if (i) {
    const kufur = [
      "oç",
      "amk",
      "ananı sikiyim",
      "ananıskm",
      "piç",
      "amk",
      "amsk",
      "sikim",
      "sikiyim",
      "orospu çocuğu",
      "piç kurusu",
      "kahpe",
      "orospu",
      "mal",
      "sik",
      "yarrak",
      "am",
      "amcık",
      "amık",
      "yarram",
      "sikimi ye",
      "mk",
      "mq",
      "aq",
      "ak",
      "amq"
    ];
    if (kufur.some(word => msg.content.includes(word))) {
      try {
        if (!msg.member.hasPermission("BAN_MEMBERS")) {
          msg.delete();

          return msg
            .reply("Bu Sunucuda Küfür Filtresi Aktiftir.")
            .then(msg => msg.delete(3000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});

client.on("messageUpdate", msg => {
  const i = db.fetch(`${msg.guild.id}.kufur`);
  if (i) {
    const kufur = [
      "oç",
      "amk",
      "ananı sikiyim",
      "ananıskm",
      "piç",
      "amk",
      "amsk",
      "sikim",
      "sikiyim",
      "orospu çocuğu",
      "piç kurusu",
      "kahpe",
      "orospu",
      "mal",
      "sik",
      "yarrak",
      "am",
      "amcık",
      "amık",
      "yarram",
      "sikimi ye",
      "mk",
      "mq",
      "aq",
      "ak",
      "amq"
    ];
    if (kufur.some(word => msg.content.includes(word))) {
      try {
        if (!msg.member.hasPermission("BAN_MEMBERS")) {
          msg.delete();

          return msg
            .reply("Bu Sunucuda Küfür Filtresi Aktiftir.")
            .then(msg => msg.delete(3000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});
/////////////////

///////////////////////reklam
client.on("message", msg => {
  if (!db.has(`reklam_${msg.guild.id}`)) return;
  const reklam = [
    ".com",
    ".net",
    ".xyz",
    ".tk",
    ".pw",
    ".io",
    ".me",
    ".gg",
    "www.",
    "https",
    "http",
    ".gl",
    ".org",
    ".com.tr",
    ".biz",
    "net",
    ".rf.gd",
    ".az",
    ".party",
    "discord.gg"
  ];
  if (reklam.some(word => msg.content.includes(word))) {
    try {
      if (!msg.member.hasPermission("BAN_MEMBERS")) {
        msg.delete();
        return msg
          .reply(
            "**Bu Sunucudca** `Reklam Engelle`** Aktif Reklam Yapmana İzin Vermem  !**"
          )
          .then(msg => msg.delete(3000));

        msg.delete(3000);
      }
    } catch (err) {
      console.log(err);
    }
  }
});
//////////////

//Eklendim
client.on("guildCreate", async function(guild) {
  const owner = client.users.cache.get(guild.ownerID);
  const kanal = "726106362093895700"; //Eklendim mesajının atılacağı kanal ID'sini giriniz.
  const darkcode = new Discord.MessageEmbed()
    .setTitle(`Yeni bir sunucuya eklendim`)
    .setColor("BLACK")
    .addField(`Sunucu Adı`, guild.name)
    .addField(`Sunucu Sahibi`, owner.username + "#" + owner.discriminator)
    .addField(`Sunucu Üye Sayısı`, guild.memberCount);
  client.channels.cache
    .get(kanal)
    .send({ embed: darkcode })
    .catch(err => console.log("Kanala mesaj atamıyorum!"));
});
//
//Darkcode
//Atıldım
client.on("guildDelete", async function(guild) {
  const owner = client.users.cache.get(guild.ownerID);
  const kanal = "726106362093895700"; //Atıldım mesajının atılacağı kanal ID'sini giriniz.
  const darkcode = new Discord.MessageEmbed()
    .setTitle(`Bir sunucudan atıldım`)
    .setColor("BLACK")
    .addField(`Sunucu Adı`, guild.name)
    .addField(`Sunucu Sahibi`, owner.username + "#" + owner.discriminator)
    .addField(`Sunucu Üye Sayısı`, guild.memberCount);
  client.channels.cache
    .get(kanal)
    .send({ embed: darkcode })
    .catch(err => console.log("Kanala mesaj atamıyorum!"));
});

//////////////afk
client.on("message", async message => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || ayarlar.prefix;

  let kullanıcı = message.mentions.users.first() || message.author;
  let afkdkullanıcı = await db.fetch(`afk_${message.author.id}`);
  let afkkullanıcı = await db.fetch(`afk_${kullanıcı.id}`);
  let sebep = afkkullanıcı;

  if (message.author.bot) return;
  if (message.content.includes(`${prefix}afk`)) return;
  if (message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
      message.reply(``);
      db.delete(`afk_${message.author.id}`);
      message.member.setNickname("");
      message.reply(`Etiketlediğiniz Kişi Afk \n Sebep : ${sebep}`);
    }
    if (afkkullanıcı)
      return message.channel.send(
        `**${kullanıcı.tag}** \`${sebep}\` Sebebiyle Afk!`
      );
  }

  if (!message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
      message.reply(`Artık AFK Değilsin <a:dikkat:707520390242631804>`);
      db.delete(`afk_${message.author.id}`);
      message.member.setNickname("");
    }
  }
});
/////////////////////// Sayaç
client.on("guildMemberAdd", async member => {
  let sayı = await db.fetch(`SayaçSayı_${member.guild.id}`);
  let kanal = await db.fetch(`SayaçKanal_${member.guild.id}`);
  if (!sayı || !kanal) return;
  let sonuç = sayı - member.guild.memberCount;
  client.channels.cache
    .get(kanal)
    .send(
      `<a:geld:757880165744509019>${member}, Aramıza katıldı! **${sayı}** kişiye ulaşmak için **${sonuç}** kişi kaldı Şuan **${member.guild.memberCount}** Kişiyiz`
    );
  return;
});
client.on("guildMemberRemove", async member => {
  let sayı = await db.fetch(`SayaçSayı_${member.guild.id}`);
  let kanal = await db.fetch(`SayaçKanal_${member.guild.id}`);
  if (!sayı || !kanal) return;
  let sonuç = sayı - member.guild.memberCount;

  client.channels.cache
    .get(kanal)
    .send(
      `<a:gtt:757880194710110228>${member}, Aramızdan ayrıldı! **${sayı}** kişiye ulaşmak için **${sonuç}** kişi kaldı Şuan **${member.guild.memberCount}** Kişiyiz`
    );
  return;
});

///////////////////oto-tag
client.on("guildMemberAdd", async (member, guild, message) => {
  let ototag = await db.fetch(`ototag_${member.guild.id}`);
  let kanal = await db.fetch(`ototagKanal_${member.guild.id}`);
  let kayıt = await db.fetch(`kayıt_${member.guild.id}`);

  if (!ototag) return;
  try {
    member.setNickname(`${ototag} ${member.user.username}`);
    if (!kanal) return;
    member.guild.channels.cache
      .get(kanal)
      .send(
        `<a:tiks:743841333692727378>Sunucuya Yeni Gelen ${member}'a [**${ototag}**] tagını verdim.`
      );
  } catch (e) {}
}); //<a:tik:727414557508632577>
////////////Snipe
client.on("messageDelete", message => {
  //<a:tik:727414557508632577>
  const db = require("quick.db");
  db.set(`snipe.mesaj.${message.guild.id}`, message.content);
  db.set(`snipe.id.${message.guild.id}`, message.author.id);
});

////////oto-rol
client.on("guildMemberAdd", async (member, message) => {
  let rol = db.fetch(`otorol_${member.guild.id}`);
  let kanal = db.fetch(`otorollog_${member.guild.id}`);

  if (!rol) return;
  member.roles.add(rol);
  const mesaj = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.avatarURL())
    .setDescription(
      `${member} Adlı Kullanıcıya Başarılyla <@&${rol}> Rolu Verildi<a:tiks:743841333692727378>`
    );
  client.channels.cache.get(kanal).send(mesaj);
});
/////bot-oto-rol
client.on("guildMemberAdd", async member => {
  let botrol = db.fetch(`bototorol_${member.guild.id}`);
  let kanal = db.fetch(`bototorollog_${member.guild.id}`)
  let rols = db.fetch(`otorol_${member.guild.id}`)
if (!botrol) return;
if (!rols) return;
      if (member.user.bot) {
client.channels.cache.get(kanal).send(`${member} Adlı Bot Katıldı, <@&${botrol}> Adlı Rol Verildi<a:tiks:743841333692727378>`)
         member.roles.remove(rols)
     member.roles.add(botrol)
    
      }
});
///Yavaş mod
client.on("message", async (msg, user) => {
  const request = require("node-superfetch");
  const db = require("quick.db");
  const ms = require("parse-ms");
  let zaman = db.fetch(`${msg.guild.id}.slowmode`);
  if (zaman === undefined) zaman = 0;
  let timeout = zaman;
  let dakdest = await db.fetch(`slowmodee_${msg.author.id}`);

  if (dakdest !== null && timeout - (Date.now() - dakdest) > 0) {
    let time = ms(timeout - (Date.now() - dakdest));
    msg.delete();
    msg.channel
      .send("**Bu kanalda yavaş mod açık mesaj atmadan beklemen gerek!**")
      .then(message => message.delete(2000));
  } else {
    if (msg.content.length > 0) {
      db.set(`slowmodee_${msg.author.id}`, Date.now());
    }
  }
});

////////caps
client.on("message", async msg => {
  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;
  if (msg.content.length > 4) {
    if (db.fetch(`capslock_${msg.guild.id}`)) {
      let caps = msg.content.toUpperCase();
      if (msg.content == caps) {
        if (!msg.member.hasPermission("ADMINISTRATOR")) {
          if (!msg.mentions.users.first()) {
            msg.delete();
            return msg.channel
              .send(
                `✋ ${msg.author}, Bu sunucuda, büyük harf kullanımı engellenmekte!`
              )
              .then(m => m.delete(5000));
          }
        }
      }
    }
  }
});
///////mod-log
client.on("messageDelete", async message => {
  if (message.author.bot || message.channel.type == "dm") return;
  let log = message.guild.channels.cache.get(
    await db.fetch(`log_${message.guild.id}`)
  );
  if (!log) return;
  const embed = new Discord.MessageEmbed()
    .setTitle(message.author.username + " | Mesaj Silindi")
    .addField("Kullanıcı: ", message.author)
    .addField("Kanal: ", message.channel)
    .addField("Mesaj: ", "​" + message.content + "​");
  log.send(embed);
});

client.on("messageUpdate", async (eskiMessage, newMessage) => {
  let modlog = await db.fetch(`log_${eskiMessage.guild.id}`);
  if (!modlog) return;
  let embed = new Discord.MessageEmbed()
    .setAuthor(eskiMessage.author.username, eskiMessage.author.avatarURL())
    .addField("**Eylem**", "Mesaj Düzenleme")
    .addField(
      "**Mesajın sahibi**",
      `<@${eskiMessage.author.id}> === **${eskiMessage.author.id}**`
    )
    .addField("**Eski Mesajı**", `${eskiMessage.content}`)
    .addField("**Yeni Mesajı**", `${newMessage.content}`)
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `Sunucu: ${eskiMessage.guild.name} - ${eskiMessage.guild.id}`,
      eskiMessage.guild.iconURL()
    )
    .setThumbnail(eskiMessage.guild.iconURL());
  client.channels.cache.get(modlog).send(embed);
});

client.on("channelCreate", async channel => {
  let modlog = await db.fetch(`log_${channel.guild.id}`);
  if (!modlog) return;
  const entry = await channel.guild
    .fetchAuditLogs({ type: "CHANNEL_CREATE" })
    .then(audit => audit.entries.first());
  let kanal;
  if (channel.type === "text") kanal = `<#${channel.id}>`;
  if (channel.type === "voice") kanal = `\`${channel.name}\``;
  let embed = new Discord.MessageEmbed()
    .setAuthor(entry.executor.username, entry.executor.avatarURL())
    .addField("**Eylem**", "Kanal Oluşturma")
    .addField("**Kanalı Oluşturan Kişi**", `<@${entry.executor.id}>`)
    .addField("**Oluşturduğu Kanal**", `${kanal}`)
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `Sunucu: ${channel.guild.name} - ${channel.guild.id}`,
      channel.guild.iconURL()
    )
    .setThumbnail(channel.guild.iconUR);
  client.channels.cache.get(modlog).send(embed);
});

client.on("channelDelete", async channel => {
  let modlog = await db.fetch(`log_${channel.guild.id}`);
  if (!modlog) return;
  const entry = await channel.guild
    .fetchAuditLogs({ type: "CHANNEL_DELETE" })
    .then(audit => audit.entries.first());
  let embed = new Discord.MessageEmbed()
    .setAuthor(entry.executor.username, entry.executor.avatarURL())
    .addField("**Eylem**", "Kanal Silme")
    .addField("**Kanalı Silen Kişi**", `<@${entry.executor.id}>`)
    .addField("**Silinen Kanal**", `\`${channel.name}\``)
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `Sunucu: ${channel.guild.name} - ${channel.guild.id}`,
      channel.guild.iconURL()
    )
    .setThumbnail(channel.guild.iconURL);
  client.channels.cache.get(modlog).send(embed);
});
client.on("roleCreate", async role => {
  let modlog = await db.fetch(`log_${role.guild.id}`);
  if (!modlog) return;
  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_CREATE" })
    .then(audit => audit.entries.first());
  let embed = new Discord.MessageEmbed()
    .setAuthor(entry.executor.username, entry.executor.avatarURL())
    .addField("**Eylem**", "Rol Oluşturma")
    .addField("**Rolü oluşturan kişi**", `<@${entry.executor.id}>`)
    .addField("**Oluşturulan rol**", `\`${role.name}\` **=** \`${role.id}\``)
    .setTimestamp()
    .setFooter(
      `Sunucu: ${role.guild.name} - ${role.guild.id}`,
      role.guild.iconURL
    )
    .setColor("RANDOM")
    .setThumbnail(role.guild.iconURL);
  client.channels.cache.get(modlog).send(embed);
});

client.on("roleDelete", async role => {
  let modlog = await db.fetch(`log_${role.guild.id}`);
  if (!modlog) return;
  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_DELETE" })
    .then(audit => audit.entries.first());
  let embed = new Discord.MessageEmbed()
    .setAuthor(entry.executor.username, entry.executor.avatarURL())
    .addField("**Eylem**", "Rol Silme")
    .addField("**Rolü silen kişi**", `<@${entry.executor.id}>`)
    .addField("**Silinen rol**", `\`${role.name}\` **=** \`${role.id}\``)
    .setTimestamp()
    .setFooter(
      `Sunucu: ${role.guild.name} - ${role.guild.id}`,
      role.guild.iconURL
    )
    .setColor("RANDOM")
    .setThumbnail(role.guild.iconURL);
  client.channels.cache.get(modlog).send(embed);
});
client.on("emojiCreate", async emoji => {
  let modlog = await db.fetch(`log_${emoji.guild.id}`);
  if (!modlog) return;
  const entry = await emoji.guild
    .fetchAuditLogs({ type: "EMOJI_CREATE" })
    .then(audit => audit.entries.first());
  let embed = new Discord.MessageEmbed()
    .setAuthor(entry.executor.username, entry.executor.avatarURL())
    .addField("**Eylem**", "Emoji Oluşturma")
    .addField("**Emojiyi oluşturan kişi**", `<@${entry.executor.id}>`)
    .addField("**Oluşturulan emoji**", `${emoji} - İsmi: \`${emoji.name}\``)
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`,
      emoji.guild.iconURL
    )
    .setThumbnail(emoji.guild.iconURL);
  client.channels.cache.get(modlog).send(embed);
});
client.on("emojiDelete", async emoji => {
  let modlog = await db.fetch(`log_${emoji.guild.id}`);
  if (!modlog) return;
  const entry = await emoji.guild
    .fetchAuditLogs({ type: "EMOJI_DELETE" })
    .then(audit => audit.entries.first());
  let embed = new Discord.MessageEmbed()
    .setAuthor(entry.executor.username, entry.executor.avatarURL())
    .addField("**Eylem**", "Emoji Silme")
    .addField("**Emojiyi silen kişi**", `<@${entry.executor.id}>`)
    .addField("**Silinen emoji**", `${emoji}`)
    .setTimestamp()
    .setFooter(
      `Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`,
      emoji.guild.iconURL
    )
    .setColor("RANDOM")
    .setThumbnail(emoji.guild.iconURL);
  client.channels.cache.get(modlog).send(embed);
});

client.on("emojiUpdate", async (oldEmoji, newEmoji) => {
  let modlog = await db.fetch(`log_${oldEmoji.guild.id}`);
  if (!modlog) return;
  const entry = await oldEmoji.guild
    .fetchAuditLogs({ type: "EMOJI_UPDATE" })
    .then(audit => audit.entries.first());
  let embed = new Discord.MessageEmbed()
    .setAuthor(entry.executor.username, entry.executor.avatarURL())
    .addField("**Eylem**", "Emoji Güncelleme")
    .addField("**Emojiyi güncelleyen kişi**", `<@${entry.executor.id}>`)
    .addField(
      "**Güncellenmeden önceki emoji**",
      `${oldEmoji} - İsmi: \`${oldEmoji.name}\``
    )
    .addField(
      "**Güncellendikten sonraki emoji**",
      `${newEmoji} - İsmi: \`${newEmoji.name}\``
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `Sunucu: ${oldEmoji.guild.name} - ${oldEmoji.guild.id}`,
      oldEmoji.guild.iconURL
    )
    .setThumbnail(oldEmoji.guild.iconURL);
  client.channels.cache.get(modlog).send(embed);
});

client.on("guildBanAdd", async (guild, user) => {
  let modlog = await db.fetch(`log_${guild.id}`);
  if (!modlog) return;
  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
    .then(audit => audit.entries.first());
  let embed = new Discord.MessageEmbed()
    .setAuthor(entry.executor.username, entry.executor.avatarURL())
    .addField("**Eylem**", "Yasaklama")
    .addField("**Kullanıcıyı yasaklayan yetkili**", `<@${entry.executor.id}>`)
    .addField("**Yasaklanan kullanıcı**", `**${user.tag}** - ${user.id}`)
    .addField("**Yasaklanma sebebi**", `${entry.reason}`)
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)
    .setThumbnail(guild.iconURL);
  client.channels.cache.get(modlog).send(embed);
});

client.on("guildBanRemove", async (guild, user) => {
  let modlog = await db.fetch(`log_${guild.id}`);
  if (!modlog) return;
  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_REMOVE" })
    .then(audit => audit.entries.first());
  let embed = new Discord.MessageEmbed()
    .setAuthor(entry.executor.username, entry.executor.avatarURL())
    .addField("**Eylem**", "Yasak kaldırma")
    .addField("**Yasağı kaldıran yetkili**", `<@${entry.executor.id}>`)
    .addField("**Yasağı kaldırılan kullanıcı**", `**${user.tag}** - ${user.id}`)
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)
    .setThumbnail(guild.iconURL);
  client.channels.cache.get(modlog).send(embed);
});
///hg-mesaj
client.on("guildMemberAdd", member => {
  let guild = member.guild;
  let kanal = db.fetch(`kayıthg_${member.guild.id}`);
  let kayıtçı = db.fetch(`kayıtçırol_${member.guild.id}`)
  let aylartoplam = {
    "01": "Ocak",
    "02": "Şubat",
    "03": "Mart",
    "04": "Nisan",
    "05": "Mayıs",
    "06": "Haziran",
    "07": "Temmuz",
    "08": "Ağustos",
    "09": "Eylül",
    "10": "Ekim",
    "11": "Kasım",
    "12": "Aralık"
  };
  let aylar = aylartoplam;

  let user = client.users.cache.get(member.id);
  require("moment-duration-format");

  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const ayyy = moment.duration(kurulus).format("M");
  var kontrol = [];

  if (ayyy < 1) {
    kontrol = "**Şüpheli**<a:off:739938567434010704>";

  }
  if (ayyy > 1) {
    kontrol = "**Güvenilir**<a:onn:739938568214020177>";
  }

  if (!kanal) return;
 

  const embed = new Discord.MessageEmbed()
    .setColor("36393F")
    .setThumbnail(
      user.avatarURL({
        dynamic: true,
        format: "gif",
        format: "png",
        format: "jpg",
        size: 2048
      })
    )
  
    .setDescription(
      `<a:welcome:734785466305609820> **Hoşgeldin!** ${
        member.user
      }, seninle beraber **${
        guild.memberCount
      }** kişi olduk! \n <a:sonsuzz:734785467257716817> Kaydının yapılması için  **İsim** ve **Yaş** Yazman Gerek. \n <a:Ayar:730016236045467688> Hesap Kuruluş: **${moment(
        user.createdAt
      ).format("DD")} ${aylar[moment(user.createdAt).format("MM")]} ${moment(
        user.createdAt
      ).format(
        "YYYY HH:mm:ss"
      )}** \n <a:loadingg:730016249794265119> Bu vatandaş: ${kontrol} \n <a:vhb:734785460496236655> <@&${kayıtçı}> Rolundeki Yetkililer Sizinle İlgilecektir`
    );

  client.channels.cache.get(kanal).send(embed);
  client.channels.cache.get(kanal).send(`<@&${kayıtçı}>`)
});
////mute
client.on("guildMemberAdd", async member => {
  let mutelimi = db.fetch(`mutelimi_${member.guild.id}_${member.id}`);
  let muterol = db.fetch(`muterol_${member.guild.id}`);
  if (!mutelimi) return;
  if ((mutelimi = "mutelimi")) {
    member.roles.add(muterol);
  }
});
///////seviye
client.on("message", async message => {
  let prefix = ayarlar.prefix;

  var pid = message.author.id;
  var gid = message.guild.id;

  let hm = await db.fetch(`seviyelog_${gid}`);
  let kanal = await db.fetch(`seviyelog_${gid}`);
  let sxp = db.fetch(`seviyexp_${gid}`)

  if (!hm) return;
  if (message.content.startsWith(prefix)) return;
  if (message.author.bot) return;

  var xp = await db.fetch(`xp_${pid}_${gid}`);
  var lvl = await db.fetch(`seviyem_${pid}_${gid}`);
  var xpToLvl = await db.fetch(`xpToLvl_${pid}_${gid}`);

  if (!lvl) {
    if (sxp) {
      db.set(`xp_${pid}_${gid}`, sxp);
    }
    db.set(`xp_${pid}_${gid}`, 4);
    db.set(`seviyem_${pid}_${gid}`, 1);
    db.set(`xpToLvl_${pid}_${gid}`, 100);
  } else {
   if (sxp) {
      db.add(`xp_${pid}_${gid}`, sxp);
    }
    db.add(`xp_${pid}_${gid}`, 5);

    if (xp > xpToLvl) {
      db.add(`seviyem_${pid}_${gid}`, 1);
      db.add(
        `xpToLvl_${pid}_${gid}`,
        (await db.fetch(`seviyem_${pid}_${gid}`)) * 100
      );
     
let level = db.fetch(`seviyem_${pid}_${gid}`)
        
  client.channels.cache.get(kanal).send(`${message.author} Adlı Kullanıcı Başarıyla Seviye Atladı. Şuanki Seviyesi: **${level}** <a:lvl:743469368415092808>`)

    }

   
        }
      }
    
  


)

/////////fake koruma
client.on("guildMemberAdd", async (member) => {
 let log = db.fetch(`fakehesap_${member.guild.id}`);
    let rol = db.fetch(`otorol_${member.guild.id}`);
    let rol2 = db.fetch(`fakehesaprol_${member.guild.id}`);
    
    let user = client.users.cache.get(member.id);
    
     let aylartoplam = {
            "01": "Ocak",
            "02": "Şubat",
            "03": "Mart",
            "04": "Nisan",
            "05": "Mayıs",
            "06": "Haziran", 
            "07": "Temmuz",
            "08": "Ağustos",
            "09": "Eylül",
            "10": "Ekim",
            "11": "Kasım",
            "12": "Aralık"
      }
     let aylar = aylartoplam 
    require("moment-duration-format");
  
    
      let s = (`${moment(user.createdAt).format('DD')} ${aylar[moment(user.createdAt).format('MM')]} ${moment(user.createdAt).format('YYYY HH:mm:ss')}`)
    
 const kurulus = new Date().getTime() - user.createdAt.getTime();
  const güvenli = new Discord.MessageEmbed()
  .setAuthor(client.user.username, client.user.avatarURL())
  .setTitle(`${client.user.username} Fake Hesaplara Ceza Sistemi`)
  .setDescription(`Kullanıcı: ${member} \n Hesap Kuruluş Tarihi: **${s}** \n Durumu: **Sunucuya Giriş Yapabilir<a:onn:739938568214020177>**`)
 /////
  const fakehesap = new Discord.MessageEmbed()
  .setAuthor(client.user.username, client.user.avatarURL())
  .setTitle(`${client.user.username} Fake Hesaplara Ceza Sistemi`)
  .setDescription(`Kullanıcı: ${member} \n Hesap Kuruluş Tarihi: **${s}** \n Durumu: **Sunucuya Giriş Yapamaz<a:off:739938567434010704>** \n Verilecek Rol: <@&${rol2}> \n Alınacak Rol: <@&${rol}>`)

member.roles.remove(rol)
  
const gün = moment.duration(kurulus).format("D")
    var kontrol;
      if (kurulus > 2629800000) {
member.roles.add(rol)
 client.channels.cache.get(log).send(güvenli)
} else {
member.roles.add(rol2)
member.roles.remove(rol)
client.channels.cache.get(log).send(fakehesap)
}
});
////ever-engel.js
client.on("message", async msg => {
  if(msg.author.bot) return;
  if(msg.channel.type === "dm") return;
  let i = await db.fetch(`everyone_${msg.guild.id}`)
if (i === 'kapat') return;
    //
if (i === 'açık') {
const kufur = ["@everyone", "@here", "||@everyone||", "||@here||"]

      if (kufur.some(word => msg.content.toLowerCase().startsWith(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
            msg.delete();  
                  return msg.reply('Yetkisiz Everyone | Here Atamazsın!');           
            }              
          } catch(err) {
            console.log(err);
      
        
  } 
    }
    
    if (!i) return;
    }}) ;
/////oto-isim
client.on("guildMemberAdd", async member => {
  let isim = db.fetch(`otoisim_${member.guild.id}`)
if (!isim) return;
member.setNickname(isim)
})
/////////ban-koruma
client.on("guildBanAdd", async (guild, user) => {
  let kanal = await db.fetch(`bank_${guild.id}`);
  let rol = await db.fetch(`banrol_${guild.id}`);
  if (!kanal) return;
    const entry = await guild
      .fetchAuditLogs({ type: "GUILD_BAN_ADD" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == guild.owner.id) return;
guild.members.unban(user.id)     
 guild.members.cache.get(entry.executor.id).kick();
      const embed = new Discord.MessageEmbed()
        .setTitle(`Biri Yasaklandı!`)
        .setColor("BLACK")
        .addField(`Yasaklayan`, entry.executor.tag)
        .addField(`Yasaklanan Kişi`, user.name)
        .addField(
          `Sonuç`,
          `Yasaklayan kişi sunucudan açıldı!\nve yasaklanan kişinin yasağı kalktı!`
        );
      client.channels.cache.get(kanal).send(embed);
        }
  
);
///////rol-koruma
client.on("roleDelete", async role => {
  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_DELETE" })
    .then(audit => audit.entries.first());
  let rol = await db.fetch(`rolrol_${role.guild.id}`);
  let kanal = await db.fetch(`rolk_${role.guild.id}`);
  if (!kanal) return;
      if (entry.executor.id == client.user.id) return;
      if (entry.executor.id == role.guild.owner.id) return;
                 role.guild.roles.create({ 
                data: {
                 name: role.name
               } 
              } 
    )  
        .then(r => r.setPosition(role.position));

      const embed = new Discord.MessageEmbed()
        .setTitle(`Bir Rol Silindi!`)
        .setColor("BLACK")
        .addField(`Silen`, entry.executor.tag)
        .addField(`Silinen Rol`, role.name)
        .addField(`Sonuç`, `Rol Geri Açıldı!`);
      client.channels.cache.get(kanal).send(embed);

       
  }
);
/////
client.on("roleCreate", async role => {
  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_CREATE" })
    .then(audit => audit.entries.first());
  let rol = await db.fetch(`rolrol_${role.guild.id}`);
  let kanal = await db.fetch(`rolk_${role.guild.id}`);
  if (!kanal) return;

      if (entry.executor.id == client.user.id) return;
      if (entry.executor.id == role.guild.owner.id) return;
      role.delete();

      const embed = new Discord.MessageEmbed()
        .setTitle(`Bir Rol Açıldı!`)
        .setColor("BLACK")
        .addField(`Açan`, entry.executor.tag)
        .addField(`Açılan Rol`, role.name)
        .addField(`Sonuç`, `Rol Geri Silindi!`);
      client.channels.cache.get(kanal).send(embed);
      });
/////////kanal-koruma
client.on("channelDelete", async channel => {
  let kanal = await db.fetch(`kanalk_${channel.guild.id}`);
  if (!kanal) return;

    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_DELETE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == channel.guild.owner.id) return;
    channel.guild.channels.create(channel.name, channel.type, [
      {
        id: channel.guild.id,
        position: channel.calculatedPosition
      }
    ]); 

    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Kanal Silindi!`)
      .addField(`Silen`, entry.executor.tag)

      .addField(`Silinen Kanal`, channel.name)
      .addField(`Sonuç`, `Kanal Geri Açıldı!`)

      .setColor("BLACK");
    client.channels.cache.get(kanal).send(embed);

  }
);

client.on("channelCreate", async channel => {
  let kanal = await db.fetch(`kanalk_${channel.guild.id}`);
  if (!kanal) return;

    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_CREATE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == channel.guild.owner.id) return;
    channel.delete();
    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Kanal Açıldı!`)
      .setColor("BLACK")
      .addField(`Açan`, entry.executor.tag)
      .addField(`Açılan Kanal`, channel.name)
      .addField(`Sonuç`, `Kanal Geri Silindi!`);
    client.channels.cache.get(kanal).send(embed);

  }
);
////////spam-koruma
const dctrat = require('dctr-antispam.js'); 

var authors = [];
var warned = [];

var messageLog = [];

client.on('message', async message => {
const spam = await db.fetch(`spam.${message.guild.id}`);
if(!spam) return;
const maxTime = await db.fetch(`max.${message.guild.id}.${message.author.id}`);
const timeout = await db.fetch(`time.${message.guild.id}.${message.author.id}`);
db.add(`mesaj.${message.guild.id}.${message.author.id}`, 1)
if(timeout) {
const sayı = await db.fetch(`mesaj.${message.guild.id}.${message.author.id}`);
if(Date.now() < maxTime) {
  const westraaaaam = new Discord.MessageEmbed()
  .setColor("RED")
  .setDescription(`<a:dikkat:707520390242631804> <@${message.author.id}> , **Bu Sunucuda Spam Yapmak Yasak!**`)
  .setFooter(`Bu mesaj otomatik olarak silinecektir.`)

 message.channel.send(westraaaaam).then(msg => msg.delete({timeout: 1500}));
  return message.delete();
  
}
} else {
db.set(`time.${message.guild.id}.${message.author.id}`, 'ok');
db.set(`max.${message.guild.id}.${message.author.id}`, Date.now()+3000);
setTimeout(() => {
db.delete(`mesaj.${message.guild.id}.${message.author.id}`);
db.delete(`time.${message.guild.id}.${message.author.id}`);
}, 500) // default : 500
}


});
//////////tag-rol
////////////
client.on('userUpdate', (oldUser, newUser) => {
  client.guilds.cache.forEach(async guild => {
  if(!guild.members.cache.get(newUser.id)) return;
  const tagFetch = await db.fetch(`roltag.${guild.id}`);
  const roleFetch = await db.fetch(`tag.role.${guild.id}`);
  const logFetch = await db.fetch(`tag.log.${guild.id}`);
  if(!tagFetch || !roleFetch || !logFetch) return;
  let tag = tagFetch;
  let role = guild.roles.cache.get(roleFetch);
  let log = guild.channels.cache.get(logFetch);
  if(oldUser.username === newUser.username) return;
  if(newUser.username.includes(tag) && !oldUser.username.includes(tag)) {
  log.send(new Discord.MessageEmbed()
  .setTitle('Matessa - Tag Alındı.')
  .setDescription(`${newUser}  \`${tag}\` **tagını aldığı için ${role} rolü verildi!**`));
  guild.members.cache.get(newUser.id).roles.add(role.id);
  }
  if(oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
  log.send(new Discord.MessageEmbed()
  .setTitle('Matessa - Tag Çıkarıldı.')
  .setDescription(`${newUser}  \`${tag}\` **tagını çıkardığı için ${role} rolü alındı!**`));
  guild.members.cache.get(newUser.id).roles.remove(role.id);
  }
  })
  })
  /// YASAKLI TAG

client.on('guildMemberAdd', async member => {
  let guild = member.guild; 
  let user = guild.members.cache.get(member.id);
  
  const tag = await db.fetch(`banned-tag.${guild.id}`)
  const sayı = await db.fetch(`atıldın.${guild.id}.${user.id}`)
  if(user.user.username.includes(tag)) {
    
  if(sayı === null) {
  await db.add(`atıldın.${guild.id}.${user.id}`, 1)
  user.send(new Discord.MessageEmbed()
  .setColor('RED')
  .setAuthor(guild.name, guild.iconURL)
  .setDescription(`Sunucumuzun yasaklı tagında bulunduğunuz için atıldınız, tekrar giriş yapmayı denerseniz **yasaklanacaksınız**!`))
  await user.kick() }
  
  if(sayı === 1) {
  await db.delete(`atıldın.${guild.id}.${user.id}`)
  user.send(new Discord.MessageEmbed()
  .setColor('RED')
  .setAuthor(guild.name, guild.iconURL)
  .setDescription(`Sunucumuzun yasaklı tagında bulunduğunuz için atılmıştınız, tekrar giriş yapmayı denediğiniz için **${guild.name}** sunucusundan kalıcı olarak **yasaklandınız**!`))
  await user.ban() } }
    
  })