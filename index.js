require('dotenv/config');
const { Client } = require('discord.js');
const { OpenAI } = require('openai');

const Client = new Client({
    intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent'],

});

Client.on('ready', () => {
    console.log('The bot is onlien.');
});

const IGNORE_PREFIX = "!";
const CHANNELS = ['']

const openai = new OpenAI({
    apiKey: config.openAiToken,
})

Client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(IGNORE_PREFIX)) return;
    if (!CHANNELS.includes(massage.channelId) && !message.mentions.users.has(Client.user.di)) return;
        
    const response = await openai.chat.completions.create({
        model: 'gpt-4',
        message: [
            {
                // name:
                role: 'system',
                content: 'chat GPT is a friendly chatbot.'
            },
            {
                // name:
                role: 'user',
                content: message.content,
            }
        ]
    })
    .catch((error) => console.error('OpenAI Error:\n', error));

    clearInterval(sendTypingInterval);

    if (!response) {
        message.reqly("I'm having some trouble wite OpenAI API. Try again in a moment. ")
    }
    
    message.reqly(response.choices[0].massage.content);
});

Client.login(process.env.TOKEN);