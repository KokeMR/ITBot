const
    builder = require('botbuilder'),
    core = require('../core/core'),
    helpType = require('../data/helptype');

module.exports = [
    function (session, args, next) {
        if (!session.userData.name) {
            session.beginDialog('greeting', require('../dialogs/greeting'));
        } else {
            next();
        }
    },
    function (session) {
        session.endDialog("default");
    }
];