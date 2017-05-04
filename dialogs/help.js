const
    builder = require('botbuilder'),
    core = require('../core/core'),
    helpType = require('../data/helptype'),
    helpTypeES = require('../data/helptypeES')

module.exports = [
    function (session) {
        builder.Prompts.choice(session, "helptype_prompt", "helpType_array", { listStyle: builder.ListStyle["button"] });
    },
    function (session, results) {
        if (results.response) {
            var region = "helpType_array"[results.response.entity];
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