const Discord = require('discord.js');
const config = require('../config.json');
const client = new Discord.Client();

module.exports.run = async (client, message, messageArray, args) => {
    if (!(message.author.id = "98485453258240000")) {
        message.channel.send(":x: You are not a bot moderator!");
        return;
    }
    if (!(message.author.id = "304307395289415680")) {
        message.channel.send(":x: You are not a bot moderator!");
        return;
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
            const toSend = messageArray.splice(2);
            const sayMessage = toSend.join(" ");
            client.user.setActivity(sayMessage, { type: 'PLAYING' });
            message.channel.send(`Set the status as \`Playing ${sayMessage}\`~:heart:`);
            return;
        }
        if (messageArray[1] === "LISTENING") {
            const toSend = messageArray.splice(2);
            const sayMessage = toSend.join(" ");
            client.user.setActivity(sayMessage, { type: 'LISTENING' });
            message.channel.send(`Set the status as \`Listening to ${sayMessage}\`~:heart:`);
            return;
        }
        if (messageArray[1] === "WATCHING") {
            const toSend = messageArray.splice(2);
            const sayMessage = toSend.join(" ");
            client.user.setActivity(sayMessage, { type: 'WATCHING' });
            message.channel.send(`Set the status as \`Watching ${sayMessage}\`~:heart:`);
            return;
        }
        else message.channel.send("You spelled something wrong, So i ignored you >.<");
    }
}

module.exports.help = {
    name: "setactivity"
}