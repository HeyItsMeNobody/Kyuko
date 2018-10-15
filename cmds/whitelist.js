const Discord = require('discord.js');
const mysql = require('mysql');
const config = require('../config.json');

module.exports.run = async (client, message, messageArray, args) => {
        if (!(message.author.id = "98485453258240000")) {
            message.channel.send(":x: You are not a bot moderator!");
            return;
        }
        if (!(message.author.id = "304307395289415680")) {
            message.channel.send(":x: You are not a bot moderator!");
            return;
        }
        else{
            if (messageArray[1] === "DELETE") {
                if (!(messageArray[2])) {
                    message.channel.send("Please specify a serverID to remove *and be careful*")
                }
                else {
                    var con = mysql.createConnection({
                        host: config.mysqlhost,
                        user: config.mysqluser,
                        password: config.mysqlpassword,
                        database: config.mysqldatabase
                    });
                    con.connect(function(err) {
                        if (err) {
                            console.log(err)
                            return;
                        }
                        var sql = `DELETE FROM whitelist WHERE ServerID = ${messageArray[2]}`;
                        con.query(sql, function (err, result) {
                            if (err) {
                                console.log(err)
                                return;
                            }
                            console.log(chalk.rgb(128,0,128)("Attempted to remove whitelist: ") + result)
                            message.channel.send("Attempted to remove server whitelist.")
                        });
                    })
                }
                return;
            }
            if (!(messageArray[1])) {
                message.channel.send("Please specify a serverID *and be careful*");
                return;
            }
            var serverName = messageArray.splice(2);
            const serverNameSpaces = serverName.join(" ");
            if (!(serverName)) {
                message.channel.send("Please specify the server's name *and be careful*");
                return;
            }
            var con = mysql.createConnection({
                host: config.mysqlhost,
                user: config.mysqluser,
                password: config.mysqlpassword,
                database: config.mysqldatabase
            });
            con.connect(function(err) {
                if (err) {
                    console.log(err)
                    return;
                }
                var sql = `INSERT INTO whitelist VALUES (${messageArray[1]}, "${serverNameSpaces}")`;
                con.query(sql, function (err, result) {
                    if (err) {
                        console.log(err)
                        return;
                    }
                    console.log(chalk.rgb(128,0,128)("Attempted to whitelist: ") + result)
                    message.channel.send("Attempted to whitelist this server.")
                });
            })
        }
}

module.exports.help = {
    name: "whitelist"
}