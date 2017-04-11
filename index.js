const env = require('./config.json');
const Discord = require('discord.js');
const converter = require('moment-timezone');

const bot = new Discord.Client();
const regex = /^!tz\s+(\w+\/?\w+?)\s+(\w+\/?\w+?)\s+(\w+\:?\w+)?/g;


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
        let d = new Date(today.getFullYear(), today.getMonth(), today.getDate(), timeToConvert[0], timeToConvert[1], 0);
        let startTimeInTimezone = converter.tz((d), fromTimeZone);
        let convertedTime = startTimeInTimezone.clone().tz('Europe/Berlin').format('LT');

        message.reply(convertedTime);
    }
});

bot.on('disconnected', function () {
    console.log('Disconnected.');
    process.exit(1);
});

bot.login(env.discord.token);


function formatDate(date) {
    var d = new Date(date),
        hours = '' + (d.getHours());
        minutes = '' + d.getMinutes();

    return [hours, minutes].join(':');
}

function splitTime(string) {
    const regex = /^(\d+)\:?(\d+)?(\w+)?/g;
    let m = regex.exec(string);

    minutes = (typeof m[2] === 'undefined' ? 0 : m[1]);
    pm      = (typeof m[3] === 'undefined' ? 0 : 12)

    return [parseInt(m[1])+pm,minutes];
}