const { Command } = require('@sapphire/framework');
const { ApplicationCommandType } = require('discord-api-types/v9');
const { GuildMember , Interaction } = require('discord.js');
class SlashCommand extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Give a userinfo'
    });
  }
  registerApplicationCommands(registry) {
    registry.registerContextMenuCommand((builder) =>
      builder //
        .setName(this.name)
        .setType(ApplicationCommandType.User)
    );
  }
  /**
   * 
   * @param {Interaction} interaction 
   */
  async contextMenuRun(interaction) {
    // Use isUserContextMenu() to ensure this command was executed as a User Context Menu Command
    if (interaction.isUserContextMenu() && interaction.targetMember instanceof GuildMember) {
      await interaction.reply({
        content: `${interaction.targetMember.user}`
      })
    }
  }
}
module.exports = {
  SlashCommand
};