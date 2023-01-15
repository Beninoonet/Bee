const { Listener } = require('@sapphire/framework');
const { Client } = require('discord.js');
const sqlite = require('sqlite3').verbose();
 
class ReadyListener extends Listener {
  constructor(context, options) {
    super(context, {
      ...options,
      once: true,
      event: 'ready'
    });
  }
  /**
   * 
   * @param {Client} client 
   */
  run(client) {
    const { username, id } = client.user;
    this.container.logger.info(`Successfully logged in as ${username} (${id})`);
    client.user.setActivity(`${client.guilds.cache.size} servers`, {type: 'WATCHING' })

    let db = new sqlite.Database('../database.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE)
  }
}


module.exports = {
  ReadyListener
};