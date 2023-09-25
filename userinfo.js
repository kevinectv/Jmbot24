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
        function addSuffix(user) {
            if(user % 100 >= 11 && user % 100 <= 13)
                return user + "th";

            switch(user % 10) {
                case 1: return user + "st";
                case 2: return user + "nd";
                case 3: return user + "rd";   

            }
            return user + "th";  
        }

        function addBadges(badgeNames) {

    if(!badgeNames.length) return ["X"];

    const badgeMap = {

        "ActiveDeveloper": "",

        "BugHunterLevel1": "",

        "BugHunterLevel2": "",

        "PremiumEarlySupporter": "",

        "Partner": "",

        "Staff": "",

        "HypeSquadOnlineHouse1": "", // bravery

        "HypeSquadOnlineHouse2": "", // brilliance

        "HypeSquadOnlineHouse3": "", // balance

        "Hypesquad": "",

        "CertifiedModerator": "",

        "VerifiedDeveloper": "",

    };

  

    return badgeNames.map(badgeName => badgeMap[badgeName] || '❔');

        }
    } 
}
