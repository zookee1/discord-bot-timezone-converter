const env = require('./config.json');
const InsomBot = require('./insombot/index.js');
const Discord = require('discord.js');
const converter = require('moment-timezone.min.js');

const ins = new InsomBot;
const bot = new Discord.Client();

const regex = /^!tz\s+(\w+)\s+(\w+)\s+(\w+)$/g;


bot.on("ready", function () {
    console.log("Ready to begin! Serving in " + bot.channels.length + " channels");
});

bot.on('message', message => {
    if(message.content.match(regex)) {
        let str = message.content;
        let m;

        while ((m = regex.exec(str)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
        }

        let fromTimeZone    = m[1];
        let toTimeZone      = m[2];
        let timeToConvert   = m[3];
        let startTimeInTimezone = converter.tz(timeToConvert, fromTimeZone);

        message.reply(startTimeInTimezone.clone.tz(toTimeZone));
    }
});

bot.on('disconnected', function () {
    console.log('Disconnected.');
    process.exit(1);
});

bot.login(env.discord.token);
