const
    builder = require('botbuilder'),
    core = require('../core/core'),
    helpType = require('../data/helpType');

module.exports = [
    function (session, args, next) {
        if (!session.userData.name) {
            builder.Prompts.text(session, 'Hello, what is your name?');

        } else {            
            session.endDialog('Hello %s! What do you need?', session.userData.name);
        }
    },
    function (session, results) {
        session.userData.name = results.response
        session.endDialog('Hello %s! What do you need?', session.userData.name);
    }

];