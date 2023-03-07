const { transcript, openticket} = require('../../config.json')

const { Command } = require('@sapphire/framework');
const { CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
class InviteCommand extends Command {
  constructor(context, options) {
    super(context, { ...options,
    requiredUserPermissions: ['MANAGE_CHANNELS'],
    requiredClientPermissions: ['SEND_MESSAGES'] });
  }
  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder //
      .setName('ticket')
      .setDescription('Create a ticket message')
    );
  }
  /**
   * 
   * @param {CommandInteraction} interaction 
   */

  async chatInputRun(interaction) {
    const ticketEmbed = new MessageEmbed()
    .setDescription("Ouvir un ticket discord");



    await interaction.guild.channels.cache.get(openticket).send({
      embeds: [ticketEmbed],
      components: [new MessageActionRow().addComponents(
        new MessageButton().setCustomId('ticket-member').setLabel('Report Member').setStyle('DANGER').setEmoji('👤'),
        new MessageButton().setCustomId('ticket-bug').setLabel('Report Bug').setStyle('SECONDARY').setEmoji('🪳'),
        new MessageButton().setCustomId('ticket-other').setLabel('Report other').setStyle('SUCCESS').setEmoji('⭕'),
        )]
    })
  }
}
module.exports = {
  InviteCommand
};