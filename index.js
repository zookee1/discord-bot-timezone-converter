const env = require('./config.json');
const Discord = require('discord.js');
const converter = require('moment-timezone');

const bot = new Discord.Client();
const regex = /^!tz\s+(\w+\/?\w+?)\s+(\w+\/?\w+?)\s+(\w+\:?\w+)?/g;

//https://www.iana.org/time-zones << TimeZoneDB

bot.on("ready", function () {
    console.log("Running.");
});

bot.on('message', message => {
    if(message.content.match(regex)) {
        let str = message.content;
        let m = regex.exec(str);
        let today = new Date();
        let fromTimeZone    = m[1];
        let toTimeZone      = m[2];
        let timeToConvert   = splitTime(m[3]);

        try {
            let startTimeInTimezone = converter.tz(new Date().getTime(), fromTimeZone);
        } catch(err) {
            message.reply('Timezone ' + m[1] + ' not found!');
        }
        
        try {
            let convertedTime = startTimeInTimezone.tz(toTimeZone).format('LT');
            message.reply(convertedTime);
        } catch(err) {
            message.reply('Timezone ' + m[2] + ' not found!');
        }
        // today.getFullYear(), today.getMonth(), today.getDate(), timeToConvert[0], timeToConvert[1], 0

    }
});

bot.on('disconnected', function () {
    console.log('Disconnected.');
    process.exit(1);
});

bot.login(env.discord.token);


function splitTime(string) {
    const regex = /^(\d+)\:?(\d+)?(\w+)?/g;
    let m = regex.exec(string);

    hours   = (typeof m[1] === 'undefined' ? 0 : m[1]);
    minutes = (typeof m[2] === 'undefined' ? 0 : m[2]);
    pm      = (typeof m[3] === 'undefined' ? 0 : 12)

    return [parseInt(hours)+pm,parseInt(minutes)];
}