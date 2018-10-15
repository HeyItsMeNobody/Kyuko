const Discord = require('discord.js');
const fs = require('fs');
const mysql = require('mysql');
const config = require('./config.json');
const chalk = require('chalk');
const chalkAnimation = require('chalk-animation');
const client = new Discord.Client();
const commands = new  Discord.Collection();

client.on('ready', () => {
    chalkAnimation.rainbow(`Loaded and logged in as ${client.user.tag}!~`);
    client.guilds.forEach(guild => {
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
            // SELECT 1 FROM whitelist WHERE ServerID = '666' ORDER BY ServerID LIMIT 1
            var sql = `SELECT 1 FROM whitelist WHERE ServerID = '${guild.id}' ORDER BY ServerID LIMIT 1`;
            con.query(sql, function (err, result) {
                if (err) {
                    console.log(err)
                    return;
                }
                if (result.length > 0) {
                } else {
                    console.log("Someone invited the bot while they are not whitelisted, Maybe figure that out?");
                    guild.members.get(guild.ownerID).send("The server you tried to add me to is not whitelisted!")
                    guild.leave();
                    return;
                }
            });
        })
    });
});

fs.readdir("./cmds/", (err, files) => {
    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find commands! What happened to them? UwU");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        console.log(chalk.rgb(128,0,128)(`${f} loaded! OwO`));
        commands.set(props.help.name, props);
    });
});

client.on("message", async message => {
    if(message.author.bot) return;
    
    let prefix = "k!";

    var messageStr = message.toString();
    if(!(messageStr.startsWith(prefix))) return;

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(client, message, messageArray, args, chalk);
})

client.on("guildMemberAdd", (member) => {
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
        var sql = `SELECT * FROM joinmessages WHERE ServerID = ${member.guild.id}`
        con.query(sql, function (err, result) {
            if (err) {
                console.log(err)
                return;
            }
            if (result.length > 0) {
                if (result[0]) {
                    var messageReplaced1 = result[0].Message.replace("user_name", `${member.displayName}`)
                    var messageReplaced2 = messageReplaced1.replace("user_mention", `<@${member.id}>`)
                    client.channels.get(`${result[0].ChannelID}`).send(`${messageReplaced2}`)
                }
                else {
                    throw new console.error("Mysql join message result came back with undefined.");
                }
            }
            else return;
        })
    })
})

client.on('guildMemberRemove', (member) => {
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
        var sql = `SELECT * FROM leavemessages WHERE ServerID = ${member.guild.id}`
        con.query(sql, function (err, result) {
            if (err) {
                console.log(err)
                return;
            }
            if (result.length > 0) {
                if (result[0]) {
                    var messageReplaced1 = result[0].Message.replace("user_name", `${member.displayName}`)
                    var messageReplaced2 = messageReplaced1.replace("user_mention", `<@${member.id}>`)
                    client.channels.get(`${result[0].ChannelID}`).send(`${messageReplaced2}`)
                }
                else {
                    throw new console.error("Mysql leave message result came back with undefined.");
                }
            }
            else return;
        })
    })
})

client.on("guildCreate", guild => {
    console.log("Joined a guild: " + guild.name);

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
            console.log(err)
            return;
        }
        // SELECT 1 FROM whitelist WHERE ServerID = '666' ORDER BY ServerID LIMIT 1
        var sql = `SELECT 1 FROM whitelist WHERE ServerID = '${guild.id}' ORDER BY ServerID LIMIT 1`;
        con.query(sql, function (err, result) {
            if (err) {
                console.log(err)
                return;
            }
            if (result.length > 0) {
                const embed = { 
                    "title": "Thank you for inviting me~!", "description": "Why don't you join our [home server](https://discord.gg/PRk9sdg) and if you need help and left the support server pls rejoin [the server](https://discord.gg/PRk9sdg) ~☆ ", "url": "", "color": 12168425, 
                    "timestamp": "2018-10-11T07:53:55.490Z", "footer": { 
                    "text": "Spreading love faster than the speed of light~♡" 
                    
                    }, 
                    
                    "author": { 
                    "name": "Kyuko version 1.0.0 공주님 ", "url": "", "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
                    
                     }, 
                    
                    "fields": [ 
                    { "name": "**Credits**", "value": "**Profile picture:** \nVia pintrest \n\n**Server Owners:** \nCattery: fayercx#2931 \nSupport Server:fayercx#2931 \n\n**Bot developer:** nobodycx#0384\n\n~~fayercx just does embeds~~" 
                    
                    }
                    
                     ] 
                    
                    }; guild.members.get(guild.ownerID).send("*what's this? a new server..? oh hello,~!*", { embed });
            } else {
                console.log("Someone invited the bot while they are not whitelisted, Maybe figure that out?");
                guild.members.get(guild.ownerID).send("The server you tried to add me to is not whitelisted!")
                guild.leave();
                return;
            }
        });
    })
})

//Hello github!

client.login(config.token);