const env = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  if (message.content === 'ping') {
    message.reply('pong');
  }
});


try { 
    client.on('disconnected', function () {
     
    });
}
catch(err) {
    console.log(err.message);
}

client.login(env.discord.token);