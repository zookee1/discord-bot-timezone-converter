const env = require('./config.json');
const InsomBot = require('./insombot/index.js');
const Discord = require('discord.js');

const ins = new InsomBot;
const bot = new Discord.Client();


bot.on("ready", function () {
    console.log("Ready to begin! Serving in " + bot.channels.length + " channels");
});

bot.on('message', function(msg)
{
    if (typeof ins.loadKeywords() !== 'undefined' && ins.loadKeywords().length > 0) {
        ins.checkMessageForKeywords(msg.content, ins.loadKeywords(), function(keyword)
        {
            if (keyword != 0) {
                ins.runKeywordFunction(ins.getKeyByValue(ins.keywords, keyword), keyword, msg, function(reply)
                {
                    bot.reply(msg, reply);
                });
            }
        });
    }
});

bot.on('disconnected', function () {
    console.log('Disconnected.');
    process.exit(1);
});

bot.login(env.discord.token);