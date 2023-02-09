const Discord = require('discord.js');
const request = require('request');
const config = global.config;

const ac = require("@antiadmin/anticaptchaofficial");

ac.setAPIKey("APİKEY");

module.exports = {
  command: 'add-bot',
  aliases: ['addbot','botekle','bot-ekle','add','ekle'],
  async execute(client, message, args) {

 let botID = args[0]
 
 if(!botID || isNaN(botID)) return message.channel.send(`<:declined:936820884549828628> Eklenicek botunun ID'sini girmelisin`)

 let findBot = await client.fetchUser(botID)
 let fetchApp = await client.fetchApp(botID)
 
 if(findBot.bot !== true) return message.channel.send(`<:declined:936820884549828628> Bu ID'ye sahip botun bilgilerini çekemedim`)

 let isOnServer = message.guild.members.cache.get(botID)
 
 if(isOnServer) return message.channel.send(`<:declined:936820884549828628> Bu bot zaten sunucuya eklenmiş`)
 
 if(fetchApp.application.bot_public == false) return message.channel.send(`<:declined:936820884549828628> Bu bot herkese açık olmadığı için sunucuya ekleyemem`)
 //if(fetchApp.bot.approximate_guild_count < config.serverLimit) return message.channel.send(`<:declined:936820884549828628> Botunuz **${config.serverLimit}** sunucu şartını karşılamıyor`)

  message.member.roles.add(config.ownerRole).catch()

  message.react('936820884533018744')
 
  let log = new Discord.MessageEmbed()
  .setColor('#5270ec')
  .setAuthor(`${findBot.username}`, `${findBot.avatar ? `https://cdn.discordapp.com/avatars/${botID}/${findBot.avatar}.png` : ``}`)
  .setDescription(`Botunuz başarıyla onaylandı ve sunucuya eklendi`)
  .addField(`Bot Detayları`,`Bot: [\`${findBot.username}#${findBot.discriminator}\`](https://discord.com/users/${botID}/)\nSahip: [\`${message.author.tag}\`](https://discord.com/users/${message.author.id}/)\nSunucu Sayısı: \`${fetchApp.bot.approximate_guild_count}\``)
  .setThumbnail(`${findBot.avatar ? `https://cdn.discordapp.com/avatars/${botID}/${findBot.avatar}.png` : ``}`)
  .setFooter(`${message.guild.name}`, message.guild.iconURL({dynamic: true}))
  client.channels.cache.get(config.logChannel).send({ content: `${message.author}`, embeds: [log] }) 

   ac.solveRecaptchaV2Proxyless(`https://discordapp.com/api/v8/oauth2/authorize?client_id=${botID}&scope=bot&permissions=0`, config.siteKey).then(async (gresponse) => {

   console.log(gresponse)
   
   request(`https://discordapp.com/api/v8/oauth2/authorize?client_id=${botID}&scope=bot&permissions=0`, { 
    method: 'POST',
    json: true,
    body: { 
      'authorize': true, 
      'bot_guild_id': message.guild.id, 
      'captcha_key': gresponse,
      'permissions': 0 
    },
    headers: { 
      'Authorization': config.authToken,
      'Content-Type' : 'application/json'
  }
}, function(error, response, body) {

  if(error) console.log(error)

  console.log(body)

 })

   })
  }
}
