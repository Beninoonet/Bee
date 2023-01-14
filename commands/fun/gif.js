const { Command } = require('@sapphire/framework');
const { CommandInteraction, MessageEmbed } = require('discord.js');
require('dotenv').config()
const giphy = require('giphy-api')(process.env.GIPHY_API_KEY)
class GifCommand extends Command {
  constructor(context, options) {
    super(context, { ...options,
    requiredUserPermissions: ['SEND_MESSAGES'],
    requiredClientPermissions: ['SEND_MESSAGES'] });
  }
  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder //
      .setName('gif')
      .setDescription('Génère le gif que tu veux')
      .addStringOption(option =>
        option
            .setName('gif')
            .setDescription('Tag le gif que tu veux envoyer')
            .setRequired(true))
       .addUserOption(option =>
        option
            .setName('membre')
            .setDescription('Identifie le membre')
            .setRequired(true))
    );
  }
  /**
   * 
   * @param {CommandInteraction} interaction 
   */
  async chatInputRun(interaction) {
    const gif = interaction.options.getString('gif');
    const member = interaction.options.getMember('membre')
    giphy.search({q: `${gif}`, rating: 'g'}, function(err, res){
        var totalResponses = res.data.length;
        var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
        var responseFinal = res.data[responseIndex];

        const gifEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(
            {
                name: `${interaction.user.tag}`,
                iconURL: `${interaction.user.displayAvatarURL({dynamic: true})}`
            })
        .setImage(responseFinal.images.fixed_height.url)
        .setFooter({
            text: `Destiné à ${member.user.tag}`,
            iconURL: `${member.displayAvatarURL({dynamic: true})}`
        })
        
        interaction.reply({
                content: `${member.user}`,
                embeds: [gifEmbed]
            })
    })

  }
}
module.exports = {
  GifCommand
};