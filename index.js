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

        if (msg.author.id === client.user.id) {
            conversation.push({
                 role: 'assistant',
                 name: username,
                 content: msg.content,

            });

            return;
        }

        conversation.push({
            role: 'user',
            name: username,
            content: msg.content,
        });
    })
        
    const response = await openai.chat.completions
    .create({
        model: 'gpt-4',
        message: conversation,
    })
    .catch((error) => console.error('OpenAI Error:\n', error));

    clearInterval(sendTypingInterval);

    if (!response) {
        message.reqly("I'm having some trouble wite OpenAI API. Try again in a moment.");
        return;
    }


    const responseMessage = response.chonices[0].message.content;
    const chunksizeLimit = 2000;

    for (let i = 0; i < responseMessage.length; i += chunksizeLimit) {
        const chunk = responseMessage.substring(i, i + chunksizeLimit);

        await message.reqly(chunk);
    }        
});

Client.login(process.env.TOKEN);