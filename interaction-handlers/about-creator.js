const { InteractionHandler, InteractionHandlerTypes } = require('@sapphire/framework');
const { MessageEmbed, CommandInteraction, MessageButton, MessageActionRow } = require('discord.js')
const { OWNER_ID } = require('../config.json')
class ButtonHandler extends InteractionHandler {
  constructor(ctx, options) {
    super(ctx, {
      ...options,
      interactionHandlerType: InteractionHandlerTypes.Button
    });
  }

  parse(interaction) {
    if (interaction.customId !== 'about_creator') return this.none();

    return this.some();
  }
  /**
   * 
   * @param {CommandInteraction} interaction 
   */
  async run(interaction) {
    const owner = await interaction.client.users.fetch(OWNER_ID)
    const botEmbed = new MessageEmbed()
    .setTitle(`${owner.tag}`)
    .setColor(owner.hexAccentColor)
    .setDescription(`Je vais vous parler de mon maître 💖\n Il a 21 ans *(la majorité mondiale grave stylé)* et voilà c'est tout. Rejoins le **RE:FUGE** avec le boutons juste en-dessous !`)

    await interaction.reply({
        embeds: [botEmbed] ,
        // Let's make it so only the person who pressed the button can see this message!
        ephemeral: true,
        components: [new MessageActionRow()
          .addComponents(
          new MessageButton().setLabel('SITE WEB (de merde)').setStyle('LINK').setURL('https://www.beninoonet.fr'),
          new MessageButton().setLabel('RE:FUGE').setStyle('LINK').setURL('https://discord.gg/uDvYuhtgBM')
          )]
    });
  }
}

module.exports = {
  ButtonHandler
};