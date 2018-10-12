const Discord = require('discord.js');
const config = require('../config.json');
const client = new Discord.Client();

module.exports.run = async (client, message, messageArray,args) => {
    if (!(message.member.hasPermission('ADMINISTRATOR'))) {
        message.channel.send("<:kyukomad:500205878155411456> You do not have the administrator permission.");
        return;
    }
    try {
        const toSend = messageArray.splice(2);
        const sayMessage = toSend.join(" ");
        if (sayMessage === "") {
            message.channel.send("<:kyukoexc:500205878147022858> you didn't put the channel ID..so i-i have nothing to send :c\n`or you put no message to send after the channel ID UwU`");
            return;
        }
        else{
            client.channels.get(`${messageArray[1]}`).send(sayMessage);
        }
    }
    catch(err) {
        message.channel.send("<:kyukoexc:500205878147022858> Uhoh! Something went wrong, Did you spell the channel ID right?");
    }
}

module.exports.help = {
    name: "saychannel"
}
