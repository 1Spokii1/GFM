const fs = require('fs-extra')
const {Client, RichEmbed} = require('discord.js');
module.exports.run = async (bot, message, args) => {
    message.delete()
    if (message.member.roles.find(r => r.id == 693907005185851402) // доступ Администратор
    || message.member.roles.find(r => r.id == 673611719653851176) // доступ Тех.Администратор
    || message.member.roles.find(r => r.id == 539090645919465493)
    ){ 
message.author.send(`@everyone`)
const embed = new RichEmbed()
.setColor('#310062')
    .setAuthor('Spokii', 'https://media.discordapp.net/attachments/642320052460453899/674941384263991299/Avatar_ex.jpg')
    .setDescription('****')
    .setImage('')
    .setTimestamp()
    
message.author.send(embed);
}

}
module.exports.help = {
    name: 'botinfo'
}