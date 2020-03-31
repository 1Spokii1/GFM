const fs = require('fs-extra')
const {Client, RichEmbed} = require('discord.js');
module.exports.run = async (bot, message, args) => {
    message.delete()
    if (message.member.roles.find(r => r.id == 693907005185851402) // доступ Администратор
    || message.member.roles.find(r => r.id == 671326162575818795) // доступ Тех.Администратор
     ){ 
const embed = new RichEmbed()
.setColor('#310062')
    .setAuthor('God Friended Me Bot', '')
    .setDescription('**📣Вот так вот.**')
    .setImage("")
    .setTimestamp()
    .setFooter('God Friended Me Bot', '');
message.channel.send(embed);
}

}
module.exports.help = {
    name: 'ad'                     
}
