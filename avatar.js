const { Client, ContextMenuCommandInteraction, ApplicationCommandType, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "avatar",
  type: ApplicationCommandType.User,
  Context: true,
  category: "Context",

/**
 * @param {ContextMenuCommandInteraction} interaction
 * @param {Client} Client
 */
 async execute(interaction, Client) {

     await interaction.deferReply({ephemeral: true})

     const { guild, targetId } = interaction

     const target = await guild.members.cache.get(targetId)

     const Embed = new EmbedBuilder()
        .setColor(client.Color)
        .setAuthor({ name:`${target.user.username} 's Avatar`, iconURL: target.user.displayAvatarURL() })
        .setImage(target.user.displayAvatarURL({ size: 512 }))
        .setFooter({ text: "Avatar by Drago" })
        .setTimestamp()

      return interaction.editReply({ embeds: [Embed] })
    
    }
 }
