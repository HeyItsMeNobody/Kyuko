const Discord = require('discord.js');
const config = require('../config.json');
const client = new Discord.Client();

module.exports.run = async (client, message, messageArray,args) => {
    const sayMessage = args.join(" ");
    sayMessageFiltered = sayMessage.replace('@', '');
    message.delete().catch(O_o=>{});
    message.channel.send(sayMessageFiltered);
}

module.exports.help = {
    name: "say"
}