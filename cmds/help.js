const fs = require('fs-extra')
const {Client, RichEmbed} = require('discord.js');

module.exports.run = async (bot, message, args) => {
    message.delete()
    if (message.member.roles.find(r => r.id == 643111710818828319) // доступ Администратор
    || message.member.roles.find(r => r.id ==687007456949436434) // доступ Тех.Администратор
    || message.member.roles.find(r => r.id == 609168461087899671)
    ){ 
message.author.send(`@everyone`)
const embed = new RichEmbed()
.setColor('#310062')
    .setAuthor('GFM Bot', '')
    .setDescription('**ad - добавить пост с картинкой (Пока что все делается через Spokii) \n ban - бан \n clear - очистка сообщений до 100! \n kick - кик \n mute - мут \n unmute - размутить \n say - сказать(написать) от именни бота \n serverinfo -инфо о сервере \n unmute - размутить \n warn - Предуприждение. 2 варна - МУТ(пермонент). 3-варна кик.\n warns - узнать свои варны \n unwarn - снять варн \n userinfo - инфо о участнике**')
    .setImage('https://media.discordapp.net/attachments/685903746781544468/686090898115002407/-1.png')
    .setTimestamp()
    .setFooter('GFM Bot', '');
message.author.send(embed);
}

}
module.exports.help = {
    name: 'help'
}
