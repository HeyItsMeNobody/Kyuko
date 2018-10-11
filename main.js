const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config.json');
const mysql = require('mysql');
const client = new Discord.Client();
const commands = new  Discord.Collection();

const activities_list = [
    "with fayer",
    "with javascript",
    "with life"
]

client.on('ready', () => {
    console.log(`I logged in as ${client.user.tag}!~`);
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
        client.user.setActivity(activities_list[index]);
    }, 60000);
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
        console.log(`${f} loaded! OwO`);
        commands.set(props.help.name, props);
    });
});

client.on("message", async message => {
    if(message.author.bot) return;

    let prefix = "k!";
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(client, message, messageArray, args)
})

client.on("guildCreate", guild => {
    console.log("Joined a guild: " + guild.name);
    var con = mysql.createConnection({
        host: config.mysqlhost,
        user: config.mysqluser,
        password: config.mysqlpassword,
        database: config.mysqldatabase
    });
    con.connect(function(err) {
        if (err) console.log(err);

        var sql = `INSERT INTO prefixes (ServerID, Prefix) VALUES ('${guild.id}', 'k!')`;
        con.query(sql, function (err, result) {
            if(err) console.log(err);
        });
    });
})

//Hello github!

client.login(config.token);