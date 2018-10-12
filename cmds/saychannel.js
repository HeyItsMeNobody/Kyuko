const Discord = require('discord.js');
const config = require('../config.json');
const client = new Discord.Client();

module.exports.run = async (client, message, messageArray,args) => {
    if (!(message.member.hasPermission('ADMINISTRATOR'))) {
        message.channel.send("You do not have the administrator permission, Sorry >.<");
        return;
    }
    try {
        const toSend = messageArray.splice(2);
        const sayMessage = toSend.join(" ");
        if (sayMessage === "") {
            message.channel.send("You put nothing after the serverID to send.. So i ignored you >.<");
            return;
        }
        else{
            client.channels.get(`${messageArray[1]}`).send(sayMessage);
        }
    }
    catch(err) {
        message.channel.send("Uhoh! Something went wrong, Did you spell the channel ID right?");
    }
}

module.exports.help = {
    name: "saychannel"
}
