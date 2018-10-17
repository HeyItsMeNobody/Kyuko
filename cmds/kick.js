const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, messageArray, args, chalk) => {
    if (!message.member.hasPermission('KICK_MEMBERS') || !message.member.hasPermission('ADMINISTRATOR')) {
        message.channel.send(`<:kyukomad:500205878155411456> You do not have the permission to kick people.`);
        return;
    }
    else if (!message.guild.me.hasPermission("KICK_MEMBERS") || !message.guild.me.hasPermission('ADMINISTRATOR')) {
        message.channel.send(`<:kyukomad:500205878155411456> I do not have the permission to kick people.`)
    }
    else {
        if (messageArray[1]) {
            if (message.mentions.members.first()) {
                var kickMember = message.mentions.members.first()
                if (kickMember.kickable) {
                    if (messageArray[2]) {
                        try {
                            var kickMessageProgress = messageArray.splice(2);
                            var kickMessage = kickMessageProgress.join(" ");
                            const delay = (msec) => new Promise((resolve) => setTimeout(resolve, msec));
                            await kickMember.send(`You got kicked from ${message.guild.name} with reason: ${kickMessage}`);
                            await delay(100);
                            await kickMember.kick()
                            await message.channel.send(`<:kyukomad:500205878155411456> I kicked ${kickMember} with reason ${kickMessage}!`)
                        }
                        catch {
                            var kickMessageProgress = messageArray.splice(2);
                            var kickMessage = kickMessageProgress.join(" ");
                            kickMember.kick()
                            message.channel.send(`<:kyukomad:500205878155411456> I kicked ${kickMember} but i could not send the reason to the user >.<`)
                        }
                    }
                    else {
                        kickMember.kick()
                        message.channel.send(`<:kyukomad:500205878155411456> I kicked ${kickMember}!`)
                    }
                }
                else return message.channel.send(`<:kyukomad:500205878155411456> I can not kick ${kickMember}`);
            }
            else return message.channel.send(`<:kyukomad:500205878155411456> You did not tell me who to kick!`);
        }
        else return message.channel.send(`<:kyukomad:500205878155411456> You didn't tell me anyone to kick!`);
    }
}

module.exports.help = {
    name: "kick"
}