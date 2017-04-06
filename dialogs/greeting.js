const
    builder = require('botbuilder'),
    core = require('../core/core'),
    helpType = require('../data/helpType');

module.exports = [
    function (session, args, next) {
        if (!session.userData.name) {
            builder.Prompts.text(session, 'Hello, what is your name?');

        } else {            
            session.endDialog('Hello %s, what do you need help with?', session.userData.name);
        }
    },
    function (session, results) {
        session.userData.name = results.response
        session.send('Hello %s!', session.userData.name);
        session.endDialog('What can I help you with?')
    }

];