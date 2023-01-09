const { Command } = require('@sapphire/framework');
const { ApplicationCommandType } = require('discord-api-types/v9');
const { GuildMember , Interaction, MessageEmbed } = require('discord.js');
class AvatarCommand extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Give an avatar of member'
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
    if (interaction.isUserContextMenu() && interaction.targetMember instanceof GuildMember) {
      const embed = new MessageEmbed()
      .setColor(interaction.targetMember.displayHexColor)
      .setImage(interaction.targetMember.user.displayAvatarURL({ dynamic: true, size: 512 }))
      .setTitle(`Avatar de ${interaction.targetMember.displayName}`)
      .setFooter({
        text: `${interaction.user.username}`,
        iconURL: `${interaction.user.displayAvatarURL({ dynamic: true})}`
      })
      .setTimestamp();
      await interaction.reply({
        embeds: [embed],
      })
    }
  }
}
module.exports = {
  AvatarCommand
};