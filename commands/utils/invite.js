const { Command } = require('@sapphire/framework');
const { CommandInteraction, MessageEmbed } = require('discord.js');
class SCommand extends Command {
  constructor(context, options) {
    super(context, { ...options,
    preconditions: ['GuildOnly'],
    requiredUserPermissions: ['SEND_MESSAGES'],
    requiredClientPermissions: ['SEND_MESSAGES'] });
  }
  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder //
      .setName('invite')
      .setDescription("Génère un lien d'invitation du serveur")
      .addChannelOption(option => 
        option.setName('salon').setDescription("Sélectionne le salon d'invitation").setRequired(true))
    );
  }
  /**
   * 
   * @param {CommandInteraction} interaction 
   */
  async chatInputRun(interaction) {
    const channel = interaction.options.getChannel('salon');
    const invite = await channel.createInvite({
        maxAge: 6000,
        maxUses: 1
    })
    const invEmbed = new MessageEmbed()
    .setColor('BLUE')
    .setAuthor(
        {name: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL({dynamic: true})}`}
    )
    .setDescription(`Génération d'un lien d'invitation **attention lien utilisation 1 fois et fonctionne 2h** }`)
    .setFooter({
        text: 'Lien utilisable : 1 fois'
    })
    interaction.reply({
        content: `${invite}`,
        embeds: [invEmbed],
        ephemeral: true
        
    })
  }
}
module.exports = {
  SCommand
};