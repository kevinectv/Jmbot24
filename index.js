require('dotenv/config');
const { Client } = require('discord.js');
const { OpenAI } = require('openai');

const Client = new Client({
    intents: ['Guilds', 'GuildMembers', 'GuildMessages']

});

