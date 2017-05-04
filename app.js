var builder = require('botbuilder'),
    restify = require('restify'),
    recognizer = new builder.LuisRecognizer(process.env.LUIS_URL),
    recognizerES = new builder.LuisRecognizer(process.env.LUIS_ES_URL)
    intents = new builder.IntentDialog({ recognizers: [recognizer, recognizerES]}),
    core = require('./core/core');

//restify 
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

//Chat connector
var connector = new builder.ChatConnector({
    appId: process.env.Microsoft_AppId,
    appPassword: process.env.Microsoft_AppPassword
    
});
var bot = new builder.UniversalBot(connector);

//static files
server.get(/\/public\/?.*/, restify.serveStatic({
    directory: __dirname
}));

server.post('/api/messages', connector.listen());

bot.set('localizerSettings', {
    botLocalePath: "./customLocale", 
    defaultLocale: "en" 
});

//Intents
bot.dialog('/', intents);
intents.matches('name_change', require('./dialogs/name_change'));
intents.onDefault(require('./dialogs/onDefault'));
intents.matches('greeting', require('./dialogs/greeting'));
if (locale = 'en') {
    intents.matches('help',require('./dialogs/help'));
}else{
    intents.matches('help',require('./dialogs/helpES'));
}
intents.matches('language_change', require('./dialogs/language_change'));