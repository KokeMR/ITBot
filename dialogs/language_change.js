const
    builder = require('botbuilder'),
    core = require('../core/core'),
    helpType = require('../data/helptype');
    
module.exports = [
    function (session) {
         builder.Prompts.choice(session, "locale_prompt", 'English|Español', { listStyle: builder.ListStyle["button"] });
    },
    function (session, results) {
        var locale;
        switch (results.response.entity) {
            case 'English':
                locale = 'en';
                break;
            case 'Español':
                locale = 'es';
                break;
        }
        session.preferredLocale(locale, function (err) {
            if (!err) {
                // Locale files loaded
                session.endDialog("locale_updated", results.response.entity);
            } else {
                // Problem loading the selected locale
                session.error(err);
            }
        });
    }
];