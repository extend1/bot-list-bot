const Discord = require('discord.js')

const config = global.config;

module.exports = async message => {

    let client = message.client;
    if(message.author.bot) return;
    if(!message.guild) return;
    
    
    let prefix = config.prefix
    if(!message.content.startsWith(prefix)) return;
    
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();
    let cmd;
    if (client.commands.has(command)) {
        cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command));
    }
    if(cmd) {
        cmd.execute(client, message, args)
    }
}

module.exports.conf = {
    event: 'messageCreate'
};