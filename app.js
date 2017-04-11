var builder = require('botbuilder'),
    restify = require('restify'),
    recognizer = new builder.LuisRecognizer(process.env.LUIS_URL),//'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/19ef6460-9e63-4df8-b272-bc65d4f71e88?subscription-key=b1012219ddd4429e9185dc920fd83107&timezoneOffset=0.0&verbose=true&q='),
    //recognizerES = new builder.LuisRecognizer(process.env.LUIS_ES_URL' = https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/0969a044-ea94-4a24-82a5-6323fab6782e?subscription-key=67936a6d4c134618abde8052836fbec3&timezoneOffset=1.0&verbose=true&q=),
    //intents = new builder.IntentDialog({ recognizers: [recognizer, recognizerES] 
    intents = new builder.IntentDialog({ recognizers: [recognizer] }),   
    core = require('./core/core');

//restify 
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

//Chat connector
var connector = new builder.ChatConnector({
    appId: process.env.Microsoft_AppId,//'e0b2dae7-0092-4fe1-b722-b7644af13c3f',
    appPassword: process.env.Microsoft_AppPassword//'OaTjdzfJfeOSyMXmskNwOX4'
    
});
var bot = new builder.UniversalBot(connector);

//static files
server.get(/\/public\/?.*/, restify.serveStatic({
    directory: __dirname
}));

server.post('/api/messages', connector.listen());

//Intents
bot.dialog('/', intents);
intents.matches('name_change', require('./dialogs/name_change'));
intents.onDefault(require('./dialogs/onDefault'));
intents.matches('greeting', require('./dialogs/greeting'));
intents.matches('help', require('./dialogs/help'));