var builder = require('botbuilder'),
    restify = require('restify'),
    recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/19ef6460-9e63-4df8-b272-bc65d4f71e88?subscription-key=71da68e532a94bf8b950185cbde7dd15&verbose=true')
    intents = new builder.IntentDialog({recognizers:[recognizer]});


//restify 
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});
var connector = new builder.ChatConnector({
    appId: 'e0b2dae7-0092-4fe1-b722-b7644af13c3f',
    appPassword: 'OaTjdzfJfeOSyMXmskNwOX4'
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//Intents

//var intents = new builder.IntentDialog();

bot.dialog('/', intents);

intents.matches('name_change', [
    function (session) {
        builder.Prompts.text(session, 'Really? What is your name?');
    },
    function (session, results) {
        session.userData.name = results.response;  
        session.send('Ok... Hi %s', session.userData.name);
        session.endDialog('What can I help you with?')
    }
]);

// intents.matches(/^that is not my name/i, [
//     function (session) {
//         session.beginDialog('/really');
//     },
//     function (session, results) {
//         session.send('Ok... Changed your name to %s', session.userData.name);
//     }
// ]);

intents.onDefault([
    function (session, args, next) {
        if (!session.userData.name) {
            session.beginDialog('greeting');
        } else {
            next();
        }
    },
    function (session) {
        session.endDialog('Sorry, I did not understand that', session.userData.name);
    }
]);

intents.matches ('greeting', [
    function (session, args, next) {
            if (!session.userData.name) {
                session.beginDialog('greeting');
            } else {
                next();
             }
     },
        function (session, results) {
            session.send('Hello %s!', session.userData.name);
            session.endDialog('What can I help you with?')
        }






//    function (session) {
  //      builder.Prompts.text(session, 'Hi! What is your name?');
    //},
  //  function (session, results) {
    //    session.userData.name = results.response;
      //  session.send('Hello %s!', session.userData.name);
        //session.endDialog('Do you need help with anything?')
   // }
]);

// bot.dialog('/really', [
//     function (session) {
//         builder.Prompts.text(session, 'Really? What is your name?');
//     },
//     function (session, results) {
//         session.userData.name = results.response;
//         session.endDialog();
//     }
// ]);