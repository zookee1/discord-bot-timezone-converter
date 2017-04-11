const env = require('./config.json');
const InsomBot = require('./insombot/index.js');
const Discord = require('discord.js');

const ins = new InsomBot;
const bot = new Discord.Client();


bot.on("ready", function () {
    console.log("Ready to begin! Serving in " + bot.channels.length + " channels");
});

bot.on('message', message => {
  if (message.content === '!tz') {
    message.reply(message);
  }
});

bot.on('disconnected', function () {
    console.log('Disconnected.');
    process.exit(1);
});

bot.login(env.discord.token);