const { Command } = require('@sapphire/framework');
const { CommandInteraction, MessageEmbed } = require('discord.js');
class InviteCommand extends Command {
  constructor(context, options) {
    super(context, { ...options,
    requiredUserPermissions: ['SEND_MESSAGES'],
    requiredClientPermissions: ['SEND_MESSAGES'] });
  }
  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder //
      .setName('bot')
      .setDescription('Hi')
    );
  }
  /**
   * 
   * @param {CommandInteraction} interaction 
   */
  async chatInputRun(interaction) {
    const botEmbed = new MessageEmbed()
    .setTitle(`${interaction.client.user.tag}`)
    .setColor('RANDOM')
    .setDescription(`[Invitation sur ton serveur](https://discord.com/api/oauth2/authorize?client_id=1053781995894878269&permissions=8&scope=bot%20applications.commands) 
    [En savoir plus sur mon créateur](https://www.beninoonet.fr)`)
    .setImage(`${interaction.client.user.displayAvatarURL({dynamic: true, size: 512})}`)


    interaction.reply({
      embeds: [botEmbed]
    })
  }
}
module.exports = {
  InviteCommand
};