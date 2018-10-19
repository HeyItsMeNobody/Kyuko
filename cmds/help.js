const Discord = require('discord.js');
const config = require('../config.json');
const client = new Discord.Client();

module.exports.run = async (client, message, args) => {
    const embed = new Discord.RichEmbed()
    .setTitle("Help")
    .setDescription(`Click [here](http://kyuko.nobody.life:9999/help) to go to the help page!`)
    .setColor(0xffd1e8)

    message.channel.send(embed);
}

module.exports.help = {
    name: "help"
}