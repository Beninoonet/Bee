const { Command } = require('@sapphire/framework');
const { CommandInteraction, MessageEmbed } = require('discord.js');
class PingCommand extends Command {
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
    const channel = interaction.guild.channels.cache.get('1060695527072735292')
    const Suembed = new MessageEmbed()
    .setTitle(`Nouvelle suggestions`)
    .setFooter({
        text: `Suggestions de ${interaction.user.tag}`,
        iconURL: `${interaction.user.displayAvatarURL()}`
    })
    .setDescription(`${suggest}`);

    const msg = await channel.send({
        embeds: [Suembed],
    });

    msg.react('💖')
    
    interaction.reply({
        content: `Ta suggestion à été envoyé dans ${channel}`,
        ephemeral: true
    });

  }
}
module.exports = {
  PingCommand
};