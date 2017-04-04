const
    builder = require('botbuilder'),
    core = require('../core/core'),
    helpType = require('../data/helpType');

module.exports = [
    function (session) {
        builder.Prompts.choice(session, "What area do you need help in?", helpType, { listStyle: builder.ListStyle["button"] });
    },
    function (session, results) {
        if (results.response) {
            var region = helpType[results.response.entity];
            console.log("region", region);

            session.send('Okay, you can contact with:');

            core.showChoices(session, region);

            // region.forEach(function (element) {
            //     session.send("%(helper)s whose mail is %(mail)s", element);
            // }, this);

            session.endDialog();
        }
        else {
            session.endDialog("Ok");
        }
    }
];