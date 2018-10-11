const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config.json');
const client = new Discord.Client();
const commands = new  Discord.Collection();

// const activities_list = [
//     "with fayer",
//     "with javascript",
//     "with love",
//     "with a loli"
// ]

client.on('ready', () => {
    console.log(`I logged in as ${client.user.tag}!~`);
    // setInterval(() => {
    //     const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
    //     client.user.setActivity(activities_list[index]);
    // }, 60000);
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
    if(commandfile) commandfile.run(client, message, messageArray, args);
})

client.on("guildCreate", guild => {
    console.log("Joined a guild: " + guild.name);
    const embed = { 
        "title": "Thank you for inviting me~!", "description": "Why don't you join our [server](https://discord.gg/PRk9sdg) and if you need help pls join [the support server](https://discord.gg/PRk9sdg) ~☆ ", "url": "", "color": 12168425, 
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
})

//Hello github!

client.login(config.token);