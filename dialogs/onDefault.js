const
    builder = require('botbuilder'),
    core = require('../core/core'),
    helpType = require('../data/helpType');

module.exports = [
    function (session, args, next) {
        if (!session.userData.name) {
            session.beginDialog('greeting', require('../dialogs/greeting'));
        } else {
            next();
        }
    },
    function (session) {
        session.endDialog('Sorry, I did not understand that', session.userData.name);
    }
];