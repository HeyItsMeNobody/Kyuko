const Discord = require('discord.js');
const config = require('../config.json');
const client = new Discord.Client();

module.exports.run = async (client, message, messageArray,args) => {
    const sayMessage = args.join(" ");
    sayMessageFiltered = sayMessage.replace('@', '');
    if (sayMessageFiltered === "") {
        message.channel.send("<:kyukoexc:500205878147022858> You did not give me anything to say~♡")
        return;
    }
    else {
        message.delete().catch(O_o=>{});
        message.channel.send(sayMessageFiltered);
        return;
    }
}

module.exports.help = {
    name: "say"
}