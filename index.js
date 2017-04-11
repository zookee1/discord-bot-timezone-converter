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
        console.log(splitTime(m[3]));
        let timeToConvert   = d.setHours(splitTime(m[3])[0],splitTime(m[3])[1],0,0);
        console.log(timeToConvert);
        let startTimeInTimezone = converter.tz((d), fromTimeZone);
        let convertedTime = formatDate(startTimeInTimezone.clone().tz(toTimeZone).format());

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
        // minutes = '' + d.getMinutes();

    // return [hours, minutes].join(':');
    return hours;
}

function splitTime(string) {
    const regex = /^(\d+)\:?(\d+)?/g;
    let m = regex.exec(string);

    minutes = (typeof m[2] === 'undefined' ? 0 : m[1]);

    return [m[1],minutes];
}