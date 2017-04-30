const
    builder = require('botbuilder'),
    core = require('../core/core'),
    helpType = require('../data/helptype');

module.exports = [
    function (session, args, next) {
        if (!session.userData.name) {
            builder.Prompts.text(session, "greeting");

        } else {            
            session.endDialog("known_person", session.userData.name);
        }
    },
    function (session, results) {
        session.userData.name = results.response
        session.endDialog("known_person", session.userData.name);
    }

];