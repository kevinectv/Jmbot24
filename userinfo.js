const { ChatInputCommandInteraction, EmbedBuilder, ApplicationCommandOptionType, AttachmentBuilder } = require('discord.js');
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
    /**
     * @param {ChatInputCommandInteraction} interaction
    */
    async runInteraction(client, interaction) {
        await interaction.deferReply();
        const member = await interaction.guild.members.fetch(interaction.options.getMember("user") || interaction.user.id);

        if (member.user.bot) return interaction.editReply({
            embeds: [new EmbedBuilder().setDescription("At this moment, bots are not supported for this command.")],
            ephemeral: true
        });

        try {
            const fetchedMembers = await interaction.guild.members.fetch();
            const profileBuffer = await profileImage(member.user.id);
            const imageAttachment = new AttachmentBuilder(profileBuffer, { name: 'profile.png' });

            const joinPosition = Array.from(fetchedMembers
                .sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
                .keys())
                .indexOf(member.id) + 1;

            const topRoles = member.roles.cache
                .sort((a, b) => b.position - a.position)
                .map(role => role)
                .slice(0, 3);

            const userBadges = member.user.flags.toArray();

            const joinTime = parseInt(member.joinedTimestamp / 1000);
            const createdTime = parseInt(member.user.createdTimestamp / 1000);

            const Booster = member.premiumSince ? "<:discordboost:1083135648862589008>" : "×";

            const Embed = new EmbedBuilder()
                .setAuthor({ name: `${member.user.tag} | General Information`, iconURL: member.displayAvatarURL() })
                .setColor(member.displayColor)
                .setDescription(`On <t:${joinTime}:D>, ${member.user.username} joined as the **${addSuffix(joinPosition)}** member of this guild.`)
                .setImage("attachment://profile.png")
                .addFields([
                    { name: "Badges", value: `${addBadges(userBadges).join("")}`, inline: true },
                    { name: "Booster", value: `${Booster}`, inline: true },
                    { name: "Top Roles", value: `${topRoles.join("").replace(`<@${interaction.guildId}>`, "")}`, inline: false },
                    { name: "Created", value: `<t:${createdTime}:R>`, inline: true },
                    { name: "Joined", value: `<t:${joinTime}:R>`, inline: true },
                    { name: "Identifier", value: `${member.id}`, inline: false },
                    { name: "Avatar", value: `[Link](${member.displayAvatarURL()})`, inline: true },
                    { name: "Banner", value: `[Link](${(await member.user.fetch()).bannerURL()})`, inline: true }
                ]);

            interaction.editReply({ embeds: [Embed], files: [imageAttachment] });
        } catch (error) {
            interaction.editReply({ content: "An error occurred: Contact The Developer" });
            throw error;
        }
    }
};

function addSuffix(user) {
    if (user % 100 >= 11 && user % 100 <= 13)
        return user + "th";

    switch (user % 10) {
        case 1: return user + "st";
        case 2: return user + "nd";
        case 3: return user + "rd";
    }
    return user + "th";
}

function addBadges(badgeNames) {
    if (!badgeNames.length) return ["X"];

    const badgeMap = {
        "ActiveDeveloper": "<:icon_activedeveloper:1134620832648400957>",
        "BugHunterLevel1": "<:discordbughunter1:1155711618978697299>",
        "BugHunterLevel2": "<:discordbughunter2:1155711622619349042>",
        "PremiumEarlySupporter": "<:discordearlysupporter:1155711625400164383>",
        "Partner": "<:discordpartner:1155711601572335697>",
        "Staff": "<:discordmod:1155711628705271859>",
        "HypeSquadOnlineHouse1": "<:hypesquadbravery:1155711604588027954>",
        "HypeSquadOnlineHouse2": "<:hypesquadbrilliance:1155711591103340616>",
        "HypeSquadOnlineHouse3": "<:hypesquadbalance:1155711610736885770>",
        "Hypesquad": "<:hypesquadevents:1155711613626765312>",
        "CertifiedModerator": "<:discordmod:1155711628705271859>",
        "VerifiedDeveloper": "<:discordbotdev:1155711616214650931>",
    };

    return badgeNames.map(badgeName => badgeMap[badgeName] || '❔');
      }
