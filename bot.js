const Discord = require('discord.js');
const bot = new Discord.Client();
const client = new Discord.Client();
const express = require('express');
const db = require('quick.db');
const keepalive = require('express-glitch-keepalive');
const app = express();
app.use(keepalive);
app.get('/', (req, res) => {
res.json('Бот запущен!');
});
app.get("/", (request, response) => {
response.sendStatus(200);
});
app.listen(process.env.PORT);
bot.commands = new Discord.Collection();
const fs = require('fs');
bot.mutes = require('./mutes.json');
let config = require('./botconfig.json');
let token = config.token;
let prefix = config.prefix;
let profile = require('./profile.json');
fs.readdir('./cmds/',(err,files)=>{
    if(err) console.log(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <=0) console.log("Нет комманд для загрузки!!");
    console.log(`Загружено ${jsfiles.length} комманд`);
    jsfiles.forEach((f,i) =>{
        let props = require(`./cmds/${f}`);
        console.log(`${i+1}.${f} Загружен!`);
        bot.commands.set(props.help.name,props);
    });
});




bot.on('ready', () => {
    console.log(`Запустился бот ${bot.user.username}`);
    bot.generateInvite(["ADMINISTRATOR"]).then(link =>{
        console.log(link);
    });


});
bot.on('guildMemberAdd',(member)=>{
    let role = member.guild.roles.find(r => r.id == 693925427076661389);
    member.addRole(role);
});

bot.on('message', async message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;
    let uid = message.author.id;
    bot.send = function (msg){
        message.channel.send(msg);
    };
    if(!profile[uid]){
        profile[uid] ={
            coins:10,
            warns:0,
            xp:0,
            lvl:1,
        };
    };
    let u = profile[uid];

    u.coins++;
    u.xp++;

    if(u.xp>= (u.lvl * 5)){
        u.xp = 0;
        u.lvl += 1;
    };


    fs.writeFile('./profile.json',JSON.stringify(profile),(err)=>{
        if(err) console.log(err);
    });

    let messageArray = message.content.split(" ");
    let command = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    if(!message.content.startsWith(prefix)) return;
    let cmd = bot.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(bot,message,args);
    bot.rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    bot.uId = message.author.id;
});


















bot.on('messageDelete', async (message) => {
        const logs = message.guild.channels.find(channel => channel.name === "logs");
        if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
          message.guild.createChannel('logs', 'text');
          //NOW THE BOT WILL CREATE A CHANNEL
        }
        if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) { 
          console.log('There is no channel nammed "logs" and i don\'t have permission to create one')
        }  
        const entry = await message.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first())
        let user = ""
          if (entry.extra.channel.id === message.channel.id
            && (entry.target.id === message.author.id)
            && (entry.createdTimestamp > (Date.now() - 5000))
            && (entry.extra.count >= 1)) {
          user = entry.executor.username
        } else { 
          user = message.author.username
        }
        logs.send({embed: {
          color: 0xb30b3d,
          author: {
          },
          title: "MESSAGE DELETED",
          url: "",
          description: "",
          fields: [{
              name: "**Удаленное сообщение**",
              value: (`${message.content}`)
            },
            {
              name: "**Отправитель**",
              value: (`${message.author}`)
            },
            {
              name: "**Удалено в**",
              value: (`${message.channel.name}`)
            },
            {
              name: "**Удалил**",
              value: (`${user}`)
            },
          ],
          timestamp: new Date(),
          footer: {
            text: "logs"
      
          }}})})




 bot.on('messageUpdate', function(oldMessage, newMessage) {

        if (newMessage.channel.type == 'text' && newMessage.cleanContent != oldMessage.cleanContent) {
  
    var log = newMessage.guild.channels.find('name', "logs");
          if (log != null)
              log.sendMessage({embed: {
        color: 0xb30b3d,
        author: {
        },
        title: "MESSAGE UPDATE",
        url: "",
        description: "",
        fields: [{
            name: "Отправитель",
            value: (`${newMessage.author}`)
          },
          {
            name: "Старое сообщение ",
            value: (`${oldMessage.cleanContent}`)
          },
          {
            name: "Измененное сообщение ",
            value: (`${newMessage.cleanContent}`)
          },
        ],
        timestamp: new Date(),
        footer: {
          text: "logs"
        }
      }
      });
      }
      });














client.on("message", async (message) => {
  
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
    
  let args = message.content.slice(prefix.length).trim().split(" ");
  let cmd = args.shift().toLowerCase();
  if (!message.content.startsWith(prefix)) return;
  
  try {
            let commandFile = require(`./commands/${cmd}.js`);
            commandFile.run(client, message, args);

        } catch (e) {

            console.log(e);

        }
});















bot.on('ready', () => {
    bot.user.setStatus('available')
    bot.user.setPresence({
        game: {
            name: '/ - prefix',
            type: "Playing",
            url: "https://www.twitch.tv/"
        }
    });
});

bot.login(token); 
