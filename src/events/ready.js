const Discord = require('discord.js');
const mongoose = require('mongoose');
const chalk = require('chalk');

module.exports = async client => {
    
    console.log(`${client.user.username} Logined`);

    client.user.setPresence({ activities: [{ name: ``, type: 'PLAYING' }], status: 'online' });
    
    setInterval(function() { 

        client.user.setPresence({ activities: [{ name: ``, type: 'PLAYING' }], status: 'online' });
        
    }, 120000) 
}

module.exports.conf = {
    event: 'ready'
};