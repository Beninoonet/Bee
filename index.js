const { SapphireClient } = require('@sapphire/framework');
const dotenv = require('dotenv'); dotenv.config();
const { TOKEN, DEV_TOKEN, } = require('./config.json');
const client = new SapphireClient({ intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_PRESENCES'], });

const mongoose = require('mongoose'); 

mongoose.connect(process.env.DATABASE_URI, {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}).then(() => { console.log("Client has connected to database") })
.catch(err => {console.log(err)});


client.login(DEV_TOKEN);