const { InteractionHandler, InteractionHandlerTypes } = require('@sapphire/framework');
const { MessageEmbed, CommandInteraction, MessageButton, MessageActionRow} = require('discord.js')
const { OWNER_ID } = require('../config.json')
class ButtonHandler extends InteractionHandler {
  constructor(ctx, options) {
    super(ctx, {
      ...options,
      interactionHandlerType: InteractionHandlerTypes.Button
    });
  }

  parse(interaction) {
    if (interaction.customId !== 'about-refuge') return this.none();

    return this.some();
  }
  /**
   * 
   * @param {CommandInteraction} interaction
   */
  async run(interaction) {
    const owner = await interaction.client.users.fetch(OWNER_ID);
    const refugeEmbed = new MessageEmbed()
    .setTitle(`RE:FUGE`)
    .setColor('ORANGE')
    .setImage('./o')
    .setDescription(`Serveur créé par ${owner.tag}, tu peux nous rejoindre et faire un coucou en plus le serveur est plutôt actif.`)

    await interaction.reply({
        embeds: [refugeEmbed] ,
        // Let's make it so only the person who pressed the button can see this message!
        ephemeral: true,
        components: [new MessageActionRow()
          .addComponents(
          new MessageButton().setLabel('Nous rejoindre').setStyle('LINK').setURL('https://discord.gg/uDvYuhtgBM')
          )],
    });
  }
}

module.exports = {
  ButtonHandler
};