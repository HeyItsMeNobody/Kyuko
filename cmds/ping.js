const Discord = require('discord.js');
const config = require('../config.json');
const client = new Discord.Client();

module.exports.run = async (client, message, args) => {
    message.reply(`Pong!`);
}

module.exports.help = {
    name: "ping"
}