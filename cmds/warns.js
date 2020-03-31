const fs = require('fs-extra')
const warns = require('../warns.json')
module.exports.run = async (bot, message, args) => {
message.delete()
    if (message.member.roles.find(r => r.id == 643111710818828319) // доступ глав админам
    || message.member.roles.find(r => r.id == 671326162575818795) // доступ старшим админам
    || message.member.roles.find(r => r.id == 668187460198727680) // доступ админам
    || message.member.roles.find(r => r.id == 646759503630434314) // доступ тех.поддержке
    || message.member.roles.find(r => r.id == 634107773940137996) // доступ главным модерам
    || message.member.roles.find(r => r.id == 634107669917204480) // доступ старшим модерам
    ){ 

    let member = message.guild.member(message.mentions.users.first() || message.guild.members.find(m => m.user.username == args[0] || m.id == args[0]))
    if(member){
    if (member.highestRole.position >= message.member.highestRole.position) return message.reply('вы не можете просмотреть варны пользователя')}
        

    if (!member){
        if(!warns[message.member.id]){
            warns[message.member.id] = {
                warn: 0,
                warns1: ``,
                warns2: ``,
                warns3: ``
            }
        }
        fs.writeFileSync('./warns.json', JSON.stringify(warns))
        let w = warns[message.member.id].warn
        let wt = warns[message.member.id].warns1 + warns[message.member.id].warns2 + warns[message.member.id].warns3
        if (w == 0) wt = `У пользователя нет варнов`
        message.channel.send(`**Количество варнов модератора <@${message.member.id}> (${w}/3)**
${wt} `)  
    } else{
if(!warns[member.id]){
    warns[member.id] = {
        warn: 0,
        warns1: ``,
        warns2: ``,
        warns3: ``
    }
}
fs.writeFileSync('./warns.json', JSON.stringify(warns))
let w = warns[member.id].warn
let wt = warns[member.id].warns1 + warns[member.id].warns2 + warns[member.id].warns3
if (w == 0) wt = `У пользователя нет варнов`
message.channel.send(`**Количество варнов модератора <@${member.id}> (${w}/3)**
${wt} `)
} 
} else{
    if(!warns[message.member.id]){
        warns[message.member.id] = {
            warn: 0,
            warns1: ``,
            warns2: ``,
            warns3: ``
        }
    }
    fs.writeFileSync('./warns.json', JSON.stringify(warns))
    if(message.member.roles.find(r => r.id == 634077629573496842)){
    let w = warns[message.member.id].warn
    let wt = warns[message.member.id].warns1 + warns[message.member.id].warns2 + warns[message.member.id].warns3
    if (w == 0) wt = `У пользователя нет варнов`
    message.channel.send(`**Количество варнов модератора <@${message.member.id}> (${w}/3)**
${wt} `) 
    } else {message.reply('отказано в доступе')}
} 
}

module.exports.help = {
    name: 'warns'
}    