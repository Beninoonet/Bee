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
    builder.setName('userinfo').setDescription('Give an information of member').addUserOption(option =>
			option
				.setName('membre')
				.setDescription('Afficher son avatar')
				.setRequired(true))
    
    );
  }
  /**
   * 
   * @param {Interaction} interaction 
   * @param {GuildMember} membre
   */
  async chatInputRun(interaction) {
      const membre = interaction.options.getMember('membre')
      const Uembed = new MessageEmbed()
      .setColor(membre.displayHexColor)
      .setThumbnail(membre.displayAvatarURL({ dynamic: true }))
      .setTitle(`Profil de ${membre.username}`)
      .addFields(
        {name: `Mention`, value: `${membre.user}`, inline: true},
        {name: `ID`, value: `${membre.id}`, inline: true},
        {name: `Rôles`, value: `${membre.roles.cache.map(r => r).join(' ').replace('@everyone', " ") || "None"}`},
        {name: `A rejoint le serveur le`, value: `<t:${parseInt(membre.joinedTimestamp / 1000)}:R>`, inline: true},
        {name: `Compte créé le`, value: `<t:${parseInt(membre.user.createdTimestamp / 1000)}:R>`, inline: true},
      )
      .setTimestamp()
      await interaction.reply({
        embeds: [Uembed],
        ephemeral: true
      })
  }
}
module.exports = {
  UserCommand
};