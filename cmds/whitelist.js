const Discord = require('discord.js');
const mysql = require('mysql');
const config = require('../config.json');

module.exports.run = async (client, message, messageArray, args) => {
        if (!(messageArray[1])) {
            message.channel.send("Please specify a serverID *and be careful*");
            return;
        }
        var serverName = messageArray.splice(2);
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
            var sql = `INSERT INTO whitelist VALUES (${messageArray[1]}, "${serverName}")`;
            con.query(sql, function (err, result) {
                if (err) {
                    console.log(err)
                    return;
                }
                console.log("Whitelist result: " + result)
                message.channel.send("Result: " + result)
            });
        })
}

module.exports.help = {
    name: "whitelist"
}