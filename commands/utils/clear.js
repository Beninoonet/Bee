const { Command } = require('@sapphire/framework');
const { CommandInteraction, MessageEmbed } = require('discord.js');
class SCommand extends Command {
  constructor(context, options) {
    super(context, { ...options,
    preconditions: ['GuildOnly'],
    requiredUserPermissions: ['MANAGE_MESSAGES'],
    requiredClientPermissions: ['MANAGE_MESSAGES'] });
  }
  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder //
      .setName('clear')
      .setDescription("Supprimer un nombre de messages dans le salon")
      .addIntegerOption(option => 
        option.setName('nombre').setDescription("Indique le nombre de message à supprimer").setRequired(true))
      .addUserOption(option => 
          option.setName('membre').setDescription("Supprimer les messages du membre").setRequired(false))
    );
  }
  /**
   * 
   * @param {CommandInteraction} interaction 
   */
  async chatInputRun(interaction) {
    const number = interaction.options.getInteger('nombre');
    const member = interaction.options.getMember('membre');

    const message =  interaction.channel.messages.fetch()

    const replyEmbed = new MessageEmbed()
    .setColor('RED')
    .setAuthor({
        name: `${interaction.user.username}`,
        iconURL: `${interaction.user.displayAvatarURL()}`
    })
    .setFooter({
      text: `${interaction.guild.name}`,
      iconURL: `${interaction.guild.iconURL({ dynamic: true })}`
    })

    if(member){
      const memberMsg = await (await message).filter((m) => m.author.id === member.id);
      await interaction.channel.bulkDelete(memberMsg, true);
      replyEmbed.setDescription(`${number} messages supprimés de ${member}`);
      replyEmbed.setImage(`${member.displayAvatarURL({ dynamic: true })}`)
      interaction.reply({
        embeds: [replyEmbed],
        ephemeral: true
      })
    } else {
        interaction.channel.bulkDelete(number, true);
        replyEmbed.setDescription(`${number} messages supprimés`);
        interaction.reply({
            embeds: [replyEmbed],
            ephemeral: true
        });
    }

    }
  }
module.exports = {
  SCommand
};