exports.run = (client, message) => {
  message.channel.send('Version?')
    .then(message => {
      
      let msg_Stat = " ";
      // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
      message.delete().catch(O_o=>{}); 
      // And we get the bot to say the thing: 
      
      msg_Stat += '`Bot Premier - Version 1.0 \nCreator : Yves M | @oldMoo_2k17#7111 \n`';
      message.channel.send(msg_Stat)
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'version',
  description: 'Version command. Give the version number !',
  usage: 'version'
};