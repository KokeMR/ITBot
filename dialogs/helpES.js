const
    builder = require('botbuilder'),
    core = require('../core/core'),
    helpTypeES = require('../data/helptypeES');

module.exports = [
    function (session) {
        builder.Prompts.choice(session, "helptype_prompt", helpTypeES, { listStyle: builder.ListStyle["button"] });
    },
    function (session, results) {
        if (results.response) {
            var region = helpTypeES[results.response.entity];
            console.log("region", region);

            session.send("contact");

            core.showChoices(session, region);

            // region.forEach(function (element) {
            //     session.send("%(helper)s whose mail is %(mail)s", element);
            // }, this);

            session.endDialog();
        }
        else {
            session.endDialog("ok");
        }
    }
];