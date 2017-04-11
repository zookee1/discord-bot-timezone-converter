const env = require('./config.json');
const InsomBot = require('./insombot/index.js');
const Discord = require('discord.js');

const ins = new InsomBot;
const bot = new Discord.Client();

const regex = /^!tz\s+(\w+)\s+(\w+)\s+(\w+)$/g;


bot.on("ready", function () {
    console.log("Ready to begin! Serving in " + bot.channels.length + " channels");
});

bot.on('message', message => {
    let str = message.content;
    let m;

    while ((m = regex.exec(str)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        m.forEach((match, groupIndex) => {
            console.log(`Found match, group ${groupIndex}: ${match}`);
        });
    }
    message.reply(m);
});

bot.on('disconnected', function () {
    console.log('Disconnected.');
    process.exit(1);
});

bot.login(env.discord.token);