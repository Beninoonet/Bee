require('dotenv').config()
const giphy = require('giphy-api')(process.env.GIPHY_API_KEY)
const { Command } = require('@sapphire/framework');
const { ApplicationCommandType } = require('discord-api-types/v9');
const { GuildMember , Interaction, MessageEmbed } = require('discord.js');
class HugCommand extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Event to hug a member with gif'
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
      giphy.search({q: 'anime hug', rating: 'g'}, function(err, res){
        var totalResponses = res.data.length;
        var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
        var responseFinal = res.data[responseIndex];
        const hugbed = new MessageEmbed()
        .setColor('RED')
        .setDescription(`${interaction.user} fait un câlin à ${interaction.targetMember.user} 💖`)
        .setImage(responseFinal.images.fixed_height.url)
        
        interaction.reply({
          content: `${interaction.targetMember.user} 💖`,
          embeds: [hugbed]
        })
  
      })
    }
  }
}
module.exports = {
  HugCommand
};