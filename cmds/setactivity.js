const Discord = require('discord.js');
const config = require('../config.json');
const client = new Discord.Client();

module.exports.run = async (client, message, messageArray, args) => {
    if (!(message.author.id = "98485453258240000")) {
        message.channel.send(":x: You are not a bot moderator!");
    }
    if (!(message.author.id = "304307395289415680")) {
        message.channel.send(":x: You are not a bot moderator!");
    }
    else {
        if (!(messageArray[1])) {
            message.channel.send("You didn't say if you wanted it to say PLAYING or any of the other 2 >.<");
            return;
        }
        if (!(messageArray[2])) {
            message.channel.send("You didn't say anything to put as playing status, So i ignored you >.<");
            return;
        }
        if (messageArray[1] === "PLAYING") {
            client.user.setActivity(messageArray[2] + " " + messageArray[3] + " " + messageArray[4], { type: 'PLAYING' });
            message.channel.send(`Set the status as \`Playing ${messageArray[2] + " " + messageArray[3] + " " + messageArray[4]}\`~:heart:`);
            return;
        }
        if (messageArray[1] === "LISTENING") {
            client.user.setActivity(messageArray[2] + " " + messageArray[3] + " " + messageArray[4], { type: 'LISTENING' });
            message.channel.send(`Set the status as \`Listening to ${messageArray[2] + " " + messageArray[3] + " " + messageArray[4]}\`~:heart:`);
            return;
        }
        if (messageArray[1] === "WATCHING") {
            client.user.setActivity(messageArray[2] + " " + messageArray[3] + " " + messageArray[4], { type: 'WATCHING' });
            message.channel.send(`Set the status as \`Watching ${messageArray[2] + " " + messageArray[3] + " " + messageArray[4]}\`~:heart:`);
            return;
        }
        else message.channel.send("You spelled something wrong, So i ignored you >.<");
    }
}

module.exports.help = {
    name: "setactivity"
}