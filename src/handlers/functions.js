const { TextChannel, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const config = global.config;

module.exports = async (client) => {

client.fetchUser = async (userID) => {
    try {
        return await client.users.fetch(userID).then(user => user);
    } catch (err) {
        return undefined;
    }
}

client.fetchApp = async(botID) => {
    
    let response = await fetch(`https://discord.com/api/v8/oauth2/authorize?client_id=${botID}&scope=bot`, { 
        method: 'GET',  
        headers: { 
            'Authorization': config.authToken 
        }
    })
    
    let body = await response.json();
    
    console.log(body)

    return body;
}
}
