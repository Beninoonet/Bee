const { Command } = require('@sapphire/framework');
const { GuildMember , Interaction, MessageEmbed } = require('discord.js');
class UserCommand extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
    preconditions: ['GuildOnly'],
    description: 'Give an information of guild',
    requiredUserPermissions: ['SEND_MESSAGES']})
    
  }
  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
    builder.setName('server-info').setDescription('Give an information of guild')
    );
  }
  /**
   * 
   * @param {Interaction} interaction 
   * @param {GuildMember} membre
   */
  async chatInputRun(interaction) {
    
    const guild = interaction.guild
    const infoEmbed = new MessageEmbed()
    .setColor('RANDOM')
    .setURL(interaction.channel.createInvite())
    .setTitle(guild.name)
    .setImage(guild.iconURL({ dynamic: true, size: 512 }))
    .setFields(
        { name: `Créateur`, value: `${guild.members.cache.get(guild.ownerId).user}`, inline: true},
        { name: `ID`, value: `${guild.id}`, inline: true },
        // MEMBER
        { name: `Membre(s)`, value: `
        Bots : **${guild.members.cache.filter(member => !member.user.bot).size}**
        `, inline: true },
        // SALONS
        { name: `Salons`, 
        value: `
        🗨️ Salon(s) textuel(s) : **${guild.channels.cache.filter(ch => ch.type === "GUILD_TEXT").size}**
        🎤 Salon(s) Vocaux : **${guild.channels.cache.filter(ch => ch.type === 'GUILD_VOICE').size}**
        🧾 Catégories : **${guild.channels.cache.filter(ch => ch.type === 'GUILD_CATEGORY').size}**
        ➡️ Total des salons : **${guild.channels.cache.size}**`, inline: true },
        // Boost
        {name: `Création du serveur`, value: `<t:${parseInt(guild.createdTimestamp / 1000)}:R>`, inline: true}

        )
    .setTimestamp()
    .setFooter({
        text: `${interaction.user.tag}`,
        iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`
    });

    interaction.reply({
        embeds: [infoEmbed]
    })
    }
}
module.exports = {
  UserCommand
};