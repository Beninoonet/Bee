const { Command } = require('@sapphire/framework');
const { CommandInteraction, MessageEmbed } = require('discord.js');

class SCommand extends Command {
  constructor(context, options) {
    super(context, { ...options,
    requiredUserPermissions: ['SEND_MESSAGES'],
    requiredClientPermissions: ['SEND_MESSAGES'] });
  }
  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder //
      .setName('suggest')
      .setDescription('faite vos suggestions')
      .addStringOption(option =>
        option
            .setName('suggestion')
            .setDescription('Afficher son avatar')
            .setRequired(true))
    );
  }
  /**
   * 
   * @param {CommandInteraction} interaction 
   */
  async chatInputRun(interaction) {
    const suggest = interaction.options.getString('suggestion');
    let channel = await interaction.guild.channels.cache.find();

    if(!channel){
      channel.cre
    }

  }
}
module.exports = {
  SCommand
};