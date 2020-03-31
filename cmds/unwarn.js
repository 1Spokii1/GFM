const fs = require('fs-extra')
const Discord = require('discord.js')
const warns = require('../warns.json')
module.exports.run = async (bot, message, args) => {
    message.delete()
     if (message.member.roles.find(r => r.id == 693907005185851402) // доступ глав админам
    || message.member.roles.find(r => r.id == 671326162575818795) // доступ старшим админам
    || message.member.roles.find(r => r.id == 668187460198727680) // доступ админам
    || message.member.roles.find(r => r.id == 646759503630434314) // доступ тех.поддержке
    || message.member.roles.find(r => r.id == 634107773940137996) // доступ главным модерам
    || message.member.roles.find(r => r.id == 634107669917204480) // доступ старшим модерам
    ){ 
        let member = message.guild.member(message.mentions.users.first() || message.guild.members.find(m => m.user.username == args[0] || m.id == args[0]))
   
        if (!member) return message.reply('используйте: /unwarn пользователь причина')
        if (member.highestRole.position >= message.member.highestRole.position) return message.reply('Вы не можете заварнить данного пользователя');
                if(!warns[member.id]){
                    warns[member.id] = {
                        warn: 0,
                        warns1: ``,
                        warns2: ``,
                        warns3: ``
                    }
                }
                let w = warns[member.id].warn
                warns[member.id].warn = w-1
                if (w-1 == 0){
                    warns[member.id].warns1 = ``
                    }
                    if (w-1 == 1){
                        warns[member.id].warns2 = ``
                    }
                    if (w-1 == 2){
                        warns[member.id].warns3 = ``
                    }       
                if(w <= 0){
                    warns[member.id] = {
                        warn: 0,
                        warns1: ``,
                        warns2: ``,
                        warns3: ``
                    }
                    message.reply(`у пользователя нет предупреждений.`)
                } else{
                let h = "``"
                message.channel.send(`<@${message.author.id}> ${h}снял предупреждение модератору${h} <@${member.id}>. ${h}(${w-1}/3)${h}`)       
                fs.writeFile('./warns.json', JSON.stringify(warns), err => {
                    if (err) console.log(err)
                })
            }
        } else {message.reply('отказано в доступе')}       
    }   
    module.exports.help = {
        name: 'unwarn'
    }
