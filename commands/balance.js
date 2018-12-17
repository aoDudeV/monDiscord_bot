const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {

    let bal = db.fetch(`money_${message.guild.id}_${message.author.id}`)

    if (bal === null) bal = 0;

    message.channel.send('You have a balance of `' + bal + '`')


}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'bal',
    description: 'Money balance of a user.',
    usage: 'bal'
  };