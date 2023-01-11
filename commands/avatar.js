const { Command } = require('@sapphire/framework');
const { ApplicationCommandType } = require('discord-api-types/v9');
const { GuildMember , Interaction, MessageEmbed } = require('discord.js');
class AvatarCommand extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Give a userinfo'
    });
  }
  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
    builder.setName('avatar').setDescription('Give an avatar of memver')
    );
  }
  /**
   * 
   * @param {Interaction} interaction 
   */
  async chatInputRun(interaction) {
    if (interaction.isUserContextMenu() && interaction.targetMember instanceof GuildMember) {
      const embed = new MessageEmbed()
      .setColor(interaction.targetMember.displayHexColor)
      .setImage(interaction.targetMember.user.displayAvatarURL({ dynamic: true, size: 512 }))
      .setTitle(`Avatar de ${interaction.targetMember.displayName}`)
      .setFooter({
        text: `${interaction.user.username}`,
        iconURL: `${interaction.user.displayAvatarURL({dynamic: true})}`
      })
      await interaction.reply({
        embeds: [embed],
        ephemeral: true
      })
    }
  }
}
module.exports = {
  AvatarCommand
};