require('dotenv/config');
const { Client } = require('discord.js');
const { OpenAI } = require('openai');

const Client = new Client({
    intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent'],

});

Client.on('ready', () => {
    console.log('The bot is onlien.');
});

Client.on('messageCreate', (message) => {
    console.log(message.content);
});

Client.login(process.env.TOKEN);