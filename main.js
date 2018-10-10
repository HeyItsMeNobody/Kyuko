const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config.json');
const client = new Discord.Client();
const commands = new  Discord.Collection();

client.on('ready', () => {
    console.log(`I logged in as ${client.user.tag}!~`);
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

    let commandfile = commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(client, message, messageArray)
})

client.login(config.token);