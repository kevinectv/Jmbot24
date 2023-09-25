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

        "ActiveDeveloper": "<:icon_activedeveloper:1134620832648400957>",

        "BugHunterLevel1": "<:discordbughunter1:1155711618978697299>",

        "BugHunterLevel2": "<:discordbughunter2:1155711622619349042>",

        "PremiumEarlySupporter": "<:discordearlysupporter:1155711625400164383>",

        "Partner": "<:discordpartner:1155711601572335697>",

        "Staff": "<:discordmod:1155711628705271859>",

        "HypeSquadOnlineHouse1": "<:hypesquadbravery:1155711604588027954>", // bravery

        "HypeSquadOnlineHouse2": "<:hypesquadbrilliance:1155711591103340616>", // brilliance

        "HypeSquadOnlineHouse3": "<:hypesquadbalance:1155711610736885770>", // balance

        "Hypesquad": "<:hypesquadevents:1155711613626765312>",

        "CertifiedModerator": "<:discordmod:1155711628705271859>",

        "VerifiedDeveloper": "<:discordbotdev:1155711616214650931>",

    };

  

    return badgeNames.map(badgeName => badgeMap[badgeName] || '❔');

        }
    } 
}
