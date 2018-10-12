const Discord = require('discord.js');
const config = require('../config.json');
const mysql = require('mysql');
const client = new Discord.Client();

module.exports.run = async (client, message, messageArray) => {
    if (!(message.member.hasPermission('ADMINISTRATOR'))) {
        message.channel.send("<:kyukomad:500205878155411456> You do not have the administrator permission.");
        return;
    }
    else {
        const toSend = messageArray.splice(1);
        const sayMessage = toSend.join(" ");
        if (sayMessage === "") {
            message.channel.send("Please say something i should say when someone joins!")
            return;
        }
        else {
            if (sayMessage === "reset") {
                var con = mysql.createConnection({
                    host: config.mysqlhost,
                    user: config.mysqluser,
                    password: config.mysqlpassword,
                    database: config.mysqldatabase,
                    supportBigNumbers: true,
                    bigNumberStrings: true,
                });
                con.connect(function(err) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    var sql = `DELETE FROM joinmessages WHERE ServerID = ${message.guild.id}`
                    con.query(sql, function (err, result) {
                        if(err) {
                            console.log(err)
                            return;
                        }
                        message.channel.send(`I reset the joinmessage!`);
                    })
                });
            }
            else {
                var con = mysql.createConnection({
                    host: config.mysqlhost,
                    user: config.mysqluser,
                    password: config.mysqlpassword,
                    database: config.mysqldatabase,
                    supportBigNumbers: true,
                    bigNumberStrings: true,
                });
                con.connect(function(err) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    var sql = `INSERT INTO joinmessages VALUES (${message.guild.id}, ${message.channel.id}, "${sayMessage}")`
                    con.query(sql, function (err, result) {
                        if(err) {
                            console.log(err)
                            return;
                        }
                        message.channel.send(`Set welcome message in this channel to ${sayMessage}`);
                    })
                });
            }
        }
    }
}

module.exports.help = {
    name: "setwelcome"
}