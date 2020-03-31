const fs = require('fs-extra')
const load = require
const Discord = require('discord.js')
const warns = require('../warns.json')
module.exports.run = async (bot, message, args) => {
    if (message.member.roles.find(r => r.id == 693907005185851402) // доступ глав админам
    || message.member.roles.find(r => r.id == 671326162575818795) // доступ старшим админам
    || message.member.roles.find(r => r.id == 668187460198727680) // доступ админам
    || message.member.roles.find(r => r.id == 646759503630434314) // доступ тех.поддержке
    || message.member.roles.find(r => r.id == 634107773940137996) // доступ главным модерам
    || message.member.roles.find(r => r.id == 634107669917204480) // доступ старшим модерам
    ){ 

     let member = message.guild.member(message.mentions.users.first() || message.guild.members.find(m => m.user.username == args[0] || m.id == args[0]))
    if (!member) return message.reply('используйте: /warn @пользователь причина')
    if (member.highestRole.position >= message.member.highestRole.position) return message.reply('Вы не можете заварнить данного пользователя');
        let reason = args.slice(1).join(' ') || 'Не указана'
        if (reason == "Не указана") {
            message.reply('укажите причину')}
            else {
                if(!warns[member.id]){
                    warns[member.id] = {
                        warn: 0,
                        warns1: ``,
                        warns2: ``,
                        warns3: ``
                    }
                }
                let w = warns[member.id].warn
                warns[member.id].warn = w+1
                let h = "``"
                let wt = `**${w+1}**. ${h}Выдано ${h} <@${message.author.id}>. ${h}Причина: ${reason}${h}\n`
                if (w+1 == 1){
                warns[member.id].warns1 = wt
                }
                if (w+1 == 2){
                    warns[member.id].warns2 = wt
                  let role = message.guild.roles.find(r => r.id == 667801574361268226);
                   member.addRole(role).catch(console.error);
                   message.channel.send(`<@${member.id}>  получает МУТ`)  
                  
                fs.writeFileSync('./warns.json', JSON.stringify(warns), err => {
                    if (err) console.log(err)
                })
                  
                }
                if (w+1 == 3){
                    warns[member.id].warns3 = wt
                }  
              
                                
                fs.writeFileSync('./warns.json', JSON.stringify(warns))
                message.channel.send(`<@${message.author.id}> ${h}выдал предупреждение ${h} <@${member.id}>. ${h}(${w+1}/3) Причина: ${reason}${h}`)      
                if(w+1 == 3){
                    warns[member.id].warn = 0
                    warns[member.id].warns1 = ``
                    warns[member.id].warns2 = ``
                    warns[member.id].warns3 = ``
                  member.kick()
                message.channel.send(`<@${member.id}>  пока, нарушитель `)                  
                fs.writeFileSync('./warns.json', JSON.stringify(warns), err => {
                    if (err) console.log(err)
                })
            }
    }
    }else {message.reply('отказано в доступе')}  
    }   
    module.exports.help = {
        name: 'warn'
    }
    
