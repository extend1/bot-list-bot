const fs = require('fs');
const { Collection } = require('discord.js');

module.exports = client => {

client.commands = new Collection();
client.aliases = new Collection();

fs.readdir('./src/commands/', (error, files) => {
    
    files.filter((f) => f.endsWith('.js')).forEach(c => {
            
            console.log(`Command Loaded: ${c}`)
            
            let props = require(`../commands/${c}`);
            
            client.commands.set(props.command, props)
            
            props.aliases.forEach(alias => {
                client.aliases.set(alias, props.command)
            })
        })
    })
}