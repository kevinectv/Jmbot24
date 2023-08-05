const {SlashcommandBuilder, EmbedBuilder, ApplicationCommandType, ChatInputCommandInteraction} = require('discord.js')
const {Configuration, OpenAIApi} = require('openai')

const errReply = require('../../Functions/interactionErrorReply')
const correReply = require('../../Functions/interactionReply')

const config = require("../../config/config.json")

const configuracion = new Configuration({
    apiKey:config.openAiToken
})

const openai = new OpenAIApi(configuracion)

              
module.exports = {
    name: "chat-gpt",
    description: "Puedes preguntar algo a chat GPT",
    options: [
        {
            name: "pregunta",
            description: "Escribe la pregunta que deses que te responda la IA",
            type: ApplicationCommandOptionType.String,
            required: true
            MaxLength: 300
        }
    ],

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction){
        const {options} = interaction
        const pregunta = options.getString('pregunta')
        try {
            const res = await openai.createCompletion({
                model:'text-davinci-003',
                prompt: pregunta,
                max_tokens: 2048,
                temperature:0.5,
            })

            const embed = new EmbedBuilder()
            .setTitle('PREGUNTA A CHAT GPT')
            .setAuthor({name:`${interaction.user.tag} Acaba de hacer una pregunta a CHAT-GPT`, iconURL: interaction.user.avatarURL({dynamic:true})})
            .setColor('Random')
            .setDescription(`Pregunta: \`\`\`${pregunta}\`\`\`\n\n Respuesta: \`\`\`${res.data.choices[0].text}\`\`\` `)

            return await interaction.reply({embeds:[embed]})
        } catch (error) {
            console.log(error);
            return errReply(interaction,"Se produjo un error al tratar de realizar este comando",true)
        }
    }
    
};
