const Discord = require('discord.js');
const client = new Discord.Client();
const Enmap = require("enmap");
const settings = require('./settings.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

client.commands = new Enmap();
client.aliases = new Enmap();

fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Loading Command: ${props.help.name}. `);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

fs.readdir('./guildcommands/', (err, files) => {
  if (err) console.error(err);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    let props = require(`./guildcommands/${f}`);
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Loading Command: ${props.help.name}. `);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  /* This function should resolve to an ELEVATION level which
     is then sent to the command handler for verification*/
  let permlvl = 0;

  let turbo_role = message.guild.roles.find(role => role.name === "Turbo Entities");
  if (turbo_role && message.member.roles.has(turbo_role.id)) permlvl = 2;

  let mod_role = message.guild.roles.find(role => role.name === "Moderateurs");
  if (mod_role && message.member.roles.has(mod_role.id)) permlvl = 3;

  let admin_role = message.guild.roles.find(role => role.name === "@admin");
  if (admin_role && message.member.roles.has(admin_role.id)) permlvl = 4;

  // if (message.author.id === ownerid) permlvl = 5;
  return permlvl;
};


var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(bgRed(e.replace(regToken, 'that was redacted')));
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`)
})

client.login(settings.token);