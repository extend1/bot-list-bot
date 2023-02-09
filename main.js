const { Client, Intents } = require('discord.js');
const fs = require('fs');
  
const client = (global.client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_INVITES] }))
  
const config = (global.config = require('./configs.json'));

require('./src/handlers/commandHandler')(client);
require('./src/handlers/eventHandler')(client);
require('./src/handlers/functions')(client);

client.login(config.token)