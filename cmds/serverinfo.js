const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
    let embed = new Discord.RichEmbed()
    .setDescription("Информация о сервере")
    .setColor('#10c7e2')
    .setAuthor(message.guild.name, message.guild.iconURL)
    .addField("Name", message.guild.name, true)
    .addField("ID", message.guild.id, true)
    .addField("Owner", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
    .addField("Total | Humans | Bots", `${message.guild.members.size} | ${message.guild.members.filter(member => !member.user.bot).size} | ${message.guild.members.filter(member => member.user.bot).size}`, true)
    .addField("Channels", message.guild.channels.size, true)
    .addField("Roles", message.guild.roles.size, true)
    .setThumbnail(message.guild.iconURL)
    message.channel.send({embed});
}

module.exports.help = {
  name:"serverinfo"
}