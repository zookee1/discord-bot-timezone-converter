const env = require('./config.json');
const Discord = require('discord.js');
const converter = require('moment-timezone');

const bot = new Discord.Client();
const regex = /^!tz\s+(\w+\/?\w+?)\s+(\w+\/?\w+?)\s+(\w+)/g;


bot.on("ready", function () {
    console.log("Running.");
});

bot.on('message', message => {
    if(message.content.match(regex)) {
        let str = message.content;
        let m = regex.exec(str);
        let d = new Date();
        let fromTimeZone    = m[1];
        let toTimeZone      = m[2];
        let timeToConvert   = m[3];
        let startTimeInTimezone = converter.tz(d.getTime(timeToConvert), fromTimeZone);
        let convertedTime = startTimeInTimezone.clone().tz(toTimeZone).format();
        console.log('d' + d.getTime(convertedTime).toTimeString().replace(/.*(\d{2}:\d{2}).*/, "$1"));

        //.toTimeString().replace(/.*(\d{2}:\d{2}).*/, "$1")

        message.reply(convertedTime);
    }
});

bot.on('disconnected', function () {
    console.log('Disconnected.');
    process.exit(1);
});

bot.login(env.discord.token);
