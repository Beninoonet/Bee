const { Command } = require('@sapphire/framework');
const { GuildMember , Interaction, MessageEmbed } = require('discord.js');
class UserCommand extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Give a userinfo'
    });
  }
  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
    builder.setName('userinfo').setDescription('Give an information of member')
    );
  }
  /**
   * 
   * @param {Interaction} interaction 
   */
  async chatInputRun(interaction) {
    if (interaction.isUserContextMenu() && interaction.targetMember instanceof GuildMember) {
      const embed = new MessageEmbed()
      .setColor(interaction.targetMember.displayHexColor)
      .setThumbnail(interaction.targetMember.user.displayAvatarURL({ dynamic: true }))
      .setTitle(`Profil de ${interaction.targetMember.user.username}`)
      .addFields(
        {name: `Mention`, value: `${interaction.targetMember.user}`, inline: true},
        {name: `ID`, value: `${interaction.targetMember.user.id}`, inline: true},
        {name: `Rôles`, value: `${interaction.targetMember.roles.cache.map(r => r).join(' ').replace('@everyone', " ") || "None"}`},
        {name: `A rejoint le serveur le`, value: `<t:${parseInt(interaction.targetMember.joinedTimestamp / 1000)}:R>`, inline: true},
        {name: `Compte créé le`, value: `<t:${parseInt(interaction.targetMember.user.createdTimestamp / 1000)}:R>`, inline: true},
      )
      .setTimestamp()
      await interaction.reply({
        embeds: [embed],
        ephemeral: true
      })
    }
  }
}
module.exports = {
  UserCommand
};