const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, messageArray, args, chalk) => {
    if (!message.member.hasPermission('BAN_MEMBERS') || !message.member.hasPermission('ADMINISTRATOR')) {
        message.channel.send(`<:kyukomad:500205878155411456> You do not have the permission to ban people.`);
        return;
    }
    else if (!message.guild.me.hasPermission("BAN_MEMBERS") || !message.guild.me.hasPermission('ADMINISTRATOR')) {
        message.channel.send(`<:kyukomad:500205878155411456> I do not have the permission to ban people.`)
    }
    else {
        if (messageArray[1]) {
            if (message.mentions.members.first()) {
                var banMember = message.mentions.members.first()
                if (banMember.bannable) {
                    if (messageArray[2]) {
                        try {
                            var banMessageProgress = messageArray.splice(2);
                            var banMessage = kickMessageProgress.join(" ");
                            const delay = (msec) => new Promise((resolve) => setTimeout(resolve, msec));
                            await banMember.send(`You got banned from ${message.guild.name} with reason: ${banMessage}`);
                            await delay(100);
                            await banMember.ban()
                            await message.channel.send(`<:kyukomad:500205878155411456> I banned ${banMember} with reason ${banMessage}!`)
                        }
                        catch {
                            var banMessageProgress = messageArray.splice(2);
                            var banMessage = banMessageProgress.join(" ");
                            banMember.ban()
                            message.channel.send(`<:kyukomad:500205878155411456> I banned ${banMember} but i could not send the reason to the user >.<`)
                        }
                    }
                    else {
                        banMember.ban()
                        message.channel.send(`<:kyukomad:500205878155411456> I banned ${banMember}!`)
                    }
                }
                else return message.channel.send(`<:kyukomad:500205878155411456> I can not ban ${banMember}`);
            }
            else return message.channel.send(`<:kyukomad:500205878155411456> You did not tell me who to ban!`);
        }
        else return message.channel.send(`<:kyukomad:500205878155411456> You didn't tell me anyone to ban!`);
    }
}

module.exports.help = {
    name: "ban"
}