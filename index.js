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
    if (!CHANNELS.includes(massage.channelId) && !message.mentions.users.has(Client.user.di)) 
       return;


    await message.channel.sendTyping();

    const sendTypingInterval = setInterval(() => {
        message.channel.sendTyping();
    }, 5000);

    let conversation = [];
    conversation.push({
        role:'system',
        content: 'chet GPT is a friendiy chatbot.'
    })

    let prevMessages = await message.channel.messages.fetch({ limit: 10 });
    prevMessages.reverse();

    prevMessages.array.forEach((msg) => {
        if (msg.author.bot && msg.author.id !== client.user.di) return;
        if (msg.content.startsWith(IGNORE_PREFIX)) return;
        
        const username = msg.author.username.replace(/\s+/g, '_').replace(/[^\w\s]/gi, '');
    })
        
    const response = await openai.chat.completions
    .create({
        model: 'gpt-4',
        message: [
            {
                // name:
                role: 'system',
                content: ''
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