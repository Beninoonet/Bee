const { SapphireClient } = require('@sapphire/framework');

const { TOKEN } = require('./config.json');
const client = new SapphireClient({ intents: ['GUILDS', 'GUILD_MESSAGES'] });
client.login(TOKEN);