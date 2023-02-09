const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');

module.exports = {
    command: 'admin',
    aliases: [],
    async execute(client, message, args) {

    if(!global.config.admins.includes(message.author.id)) return;

    let argumans = ['eval']

    let arguman = args[0]

    if(!arguman || !argumans.includes(arguman)) return message.channel.info(`Alttaki argümanlardan birisini kullanmalısın`, { title: `Argumanlar (${argumans.length})`, content: `${argumans.map(c => `\`${c}\``).slice(0, 4).join(', ')}`})

    if(arguman == 'eval') {

        function clean(text) {
            if(typeof text !== 'string')
            text = require('util').inspect(text, { depth: 0 })
            text = text
            .replace(/`/g, '`' + String.fromCharCode(8203))
            .replace(/@/g, '@' + String.fromCharCode(8203))
            return text;
            };
            

        let code = args.slice(1).join(' ');

        if(!code) return message.channel.send({ embeds: [new MessageEmbed().setDescription(`Çalıştırılıcak kod girmelisin.`).setColor('RED').setAuthor(`${message.author.username}`, message.author.avatarURL({dynamic: true})).setFooter(`${client.user.username}`, client.user.avatarURL({dynamic: true}))]})

        const embed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor(`${message.author.username}`, message.author.avatarURL({ dynamic: true }))
        .setFooter(`${client.user.username}`, client.user.avatarURL())
        .setTimestamp()
        

         try {

            let evaled = clean(await eval(code));
            if(evaled.constructor.name === 'Promise') embed.setDescription(`\`\`\`\n${evaled}\n\`\`\``)
            else embed.setDescription(`\`\`\`js\n${evaled}\n\`\`\``)

            message.channel.send({ embeds: [embed] })
      
    } catch (error) {

        embed.setColor(`RED`)
        embed.setDescription(`\`\`\`js\n${error}\n\`\`\``)
        message.channel.send({ embeds: [embed] })

    }

        
    }

    }
}