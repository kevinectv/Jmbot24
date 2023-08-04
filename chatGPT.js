const {SlashcommandBuilder, EmbedBuilder, ChaInputCommandInteraction} = require('discord.js')
const {configuration, OpenAIpi} = require('openai')

const config = require('../../config/config.json')

const configuracion = new configuration({
    apiKey:config.openAiToken
})

const openai = new OpenAIpi(configuracion)