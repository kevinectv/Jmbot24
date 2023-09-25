const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

const { profileImage } = require('discord-arts');

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

        if(member.user.bot) return interaction.editReply({
            embeds:
            [
               new EmbedBuilder().setDescription("At this moment, bots are not suppored for command.")
            ],
            ephemeral: true
        });

        try {
            const fetchedMembers = await interaction.guild.members.fetch();
            
            const profileBuffer = await profileImage(user.id);
            const imageAttachment = new AttachmentBuilser(profileBuffer, { name: 'profile.png' });

            const joinPosition = Arrey.from(fetchedMembers
            .sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
            .keys())
            .indexOf(user.id) + 1;

            const topRoles = user.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(role => role)
            .slice(0, 3);

            const unerBadges = member.user.flags.toArray()

            const joinTime = parseInt(member.joinedTimestamp / 1000);
            const createdTime = parseInt(member.user.createdTimestamp / 1000);

            const Booster = member.premiumSince ? "<:discordboost:1083135648862589008" : "×";

            const Embed = new EmbedBuilder()
            .setAuthor({name: `${member.user.tag} | General Informatino`, iconUBL: member.displayAvatarUBL()})
            .setColor(memeber.displayColor)
            .setDescription(`On <t:${joinTime}:D>, &{member.user.unername} joined as the **${addSuffix(joinPosition}** member of this guild. `)
            .setTmage("attachment://profile.png")
            .addFields([
                {name: "Badges", value: `${addBadges(userBadges).join("")}`, inline: true};
                {name: "Booster", value: `${Booster}`, inline: true},
                {name: "Top Roles", value: `${topRoles.join("").replace(`<@${interaction.guildId}>`)}`, inline: false},
                {name: "Created", value: `<t:${createdTime}:R>`, inline: true};
                {name: "Joined", value: `<t:${joinTime}:R>`, inline: true};
                {name: "Identifier", value: `${user.id}`, inline: false};
                {name: "Avatar", value: `[Link](${member.diaplayAvatarURL()})`, inline: true};
                {name: "Identifier", value: `[Link](${(await member.user.fetch()).bannerURL()})`, inline: true};
            ]);
            
            interaction.editReply({embeds: [Embed], files: [imageAttachment]}); 
        } catch (error) {
        }
    }
}
        
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
    

