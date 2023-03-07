const { InteractionHandler, InteractionHandlerTypes } = require('@sapphire/framework');
const { MessageEmbed, CommandInteraction, MessageButton, MessageActionRow } = require('discord.js')
const { OWNER_ID } = require('../config.json')
class ButtonHandler extends InteractionHandler {
  constructor(ctx, options) {
    super(ctx, {
      ...options,
      interactionHandlerType: InteractionHandlerTypes.SelectMenu
    });
  }

  parse(interaction) {
    if (interaction.customId !== 'tickets') return this.none();

    return this.some();
  }
  /**
   * 
   * @param {CommandInteraction} interaction 
   */
  async run(interaction) {
await interaction.reply({
      // Remember how we can have multiple values? Let's get the first one!
      content: `You selected: ${interaction.values[0]}`
    });
    };
  }

module.exports = {
  ButtonHandler
};