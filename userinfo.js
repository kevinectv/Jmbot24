const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "userinfo",
    description: "Affiche les informations d'un utilisateur",
    usage: "/userinfo `(user: @utilisateur)`",
    example: "/userinfo `(user: @drixerex)`",
    category: "⚙️ Utilités",
    permissions: ["UseApplicationCommands"],
    options: [
        {
            name: "user",
            description: "Utilisateur",
            type: ApplicationCommandOptionType.User,
            required: false
        }
    ],
    async runInteraction (client, interaction) {
        const member = await interaction.guild.members.fetch(interaction.options.getMember("user") || interaction.user.id)
        
    
}
