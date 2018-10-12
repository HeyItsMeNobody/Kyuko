const Discord = require('discord.js');
const config = require('../config.json');
const client = new Discord.Client();

module.exports.run = async (client, message, args) => {
    message.channel.send("<\:kyukoexc:500205878147022858> Pong");
}

module.exports.help = {
    name: "ping"
}