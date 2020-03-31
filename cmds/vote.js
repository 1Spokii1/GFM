const Discord  = module.require('discord.js');

const agree    = "✅";
const disagree = "❎";

module.exports.run = async (bot, message, args) => {
    if (message.member.roles.find(r => r.id == 643111710818828319) // доступ Администратор
    || message.member.roles.find(r => r.id == 671326162575818795) // доступ Тех.Администратор
    ){ 
    let msg = await message.channel.send("veryone **Голосуем за то что фермер дурачОк (10 сек)**");
    await msg.react(agree);
    await msg.react(disagree);}
  

  const reactions = await message.awaitReactions(reaction => reaction.emoji.name === agree || reaction.emoji.name === disagree, {time: 10000});
  message.delete();

  var NO_Count = reactions.get(disagree).count;
  var YES_Count = reactions.get(agree);

  if(YES_Count == undefined){
    var YES_Count = 1;
  }else{
    var YES_Count = reactions.get(agree).count;
  }

  var sumsum = new Discord.RichEmbed()
  
            .addField("Голосование завершилось:", "----------------------------------------\n" +
                                            "Проголосовало за ДА: " + `${YES_Count-1}\n` +
                                            "Проголосавало за НЕТ: " + `${YES_Count-1}\n` +
                                          "----------------------------------------", true)

            .setColor("0x#FF0000")
            .setImage("https://media.discordapp.net/attachments/667791906616639520/674554850549432320/3333mini.png")

  await message.channel.send({embed: sumsum});

}

module.exports.help = {
    name: "vote"
}
