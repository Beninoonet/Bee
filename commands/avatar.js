const { Command } = require('@sapphire/framework');
const { Interaction, MessageEmbed } = require('discord.js');
class AvatarCommand extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Give a userinfo'
    });
  }
  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
    builder //
    .setName('avatar')
    .setDescription('Give an avatar of member')
    .addUserOption(option =>
			option
				.setName('membre')
				.setDescription('Afficher son avatar')
				.setRequired(true))
    
)}
  /**
   * 
   * @param {Interaction} interaction 
   */
  async chatInputRun(interaction) {
      const membre = interaction.options.getUser('membre')
      const embed = new MessageEmbed()
      .setColor(membre.displayHexColor)
      .setImage(membre.displayAvatarURL({ dynamic: true, size: 512 }))
      .setTitle(`Avatar de ${membre.tag}`)
      .setFooter({
        text: `${interaction.user.tag}`,
        iconURL: `${interaction.user.displayAvatarURL({dynamic: true})}`
      })
      await interaction.reply({
        embeds: [embed],
      })
  }
}
module.exports = {
  AvatarCommand
};