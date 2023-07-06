const { EmbedBuilder, ApplicationCommandType } = require("discord.js");


/**
 * @type {import('@structures/BaseContext')}
 */

module.exports = {
  name: "avatar",
  description: "displays avatar information about the user",
  type: ApplicationCommandType.User,
  enabled: true,
  ephemeral: true,
}