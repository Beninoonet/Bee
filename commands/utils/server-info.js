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
    .setColor(interaction.user.hexAccentColor)
    .setURL((await guild.invites.create(interaction.channelId)).url)
    .setTitle(guild.name)
    .setImage(guild.iconURL({ dynamic: true, size: 512 }))
    .setFields(
        // MEMBER
        { name: `🌐 Membre(s)`, value: `
        🧾 Humain(s): **${guild.members.cache.filter(member => !member.user.bot).size}**
        🤖 Bot(s) : **${guild.members.cache.filter(member => member.user.bot).size}**
        💎 Booster(s) : **${guild.members.cache.filter(member => member.premiumSince).size}
        🟢 Connecté(s) : **${guild.members.cache.filter(member => member.presence.status !== 'offline').size}
        🧾 Total: **${guild.memberCount}**
        `, inline: true },
        // SALONS
        { name: `🃏 Salons`, 
        value: `
        🗨️ Salon(s) textuel(s) : **${guild.channels.cache.filter(ch => ch.type === "GUILD_TEXT").size}**
        🎤 Salon(s) Vocaux : **${guild.channels.cache.filter(ch => ch.type === 'GUILD_VOICE').size}**
        🧾 Catégories : **${guild.channels.cache.filter(ch => ch.type === 'GUILD_CATEGORY').size}**
        ➡️ Total des salons : **${guild.channels.cache.size}**`, inline: true },
        // Création du serveur
        {name: `📅 Création du serveur`, value: `<t:${parseInt(guild.createdTimestamp / 1000)}:R>`, inline: true},
        // Boost
        { name: `💎 ${guild.premiumSubscriptionCount} Boost(s)`, value: `${guild.premiumTier}`, inline: true},
        // Rôles
        { name: `🧾 Rôles (${guild.roles.cache.size})`, value: `**${guild.roles.cache.map(r => r).join(' ').replace('@everyone', " ") || "None"}**`, inline: false},
        // ID + OWNER
        { name: `👑`, value: `${guild.members.cache.get(guild.ownerId).user}`, inline: true},
        { name: `🆔`, value: `${guild.id}`, inline: true },
        )
    .setTimestamp()
    .setFooter({
        text: `Demandé par ${interaction.user.tag}`,
        iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`
    });

    interaction.reply({
        embeds: [infoEmbed],
        ephemeral: true
    })
    }
}
module.exports = {
  UserCommand
};