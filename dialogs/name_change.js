const
    builder = require('botbuilder'),
    core = require('../core/core'),
    helpType = require("helpTypeArray");

module.exports = [
    function (session) {
        builder.Prompts.text(session, "name_prompt");
    },
    function (session, results) {
        session.userData.name = results.response;
        session.endDialog("confirm_name", session.userData.name);
    }
];