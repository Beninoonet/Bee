const { SapphireClient } = require('@sapphire/framework');
require('dotenv').config

const { TOKEN, DEV_TOKEN } = require('./config.json');
const client = new SapphireClient({ intents: ['GUILDS', 'GUILD_MESSAGES'], });
client.login(DEV_TOKEN);