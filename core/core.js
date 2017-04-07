const
    builder = require('botbuilder'),
    util = require('util');
    helpType = require('../data/helpType');

var exports = module.exports = {};


exports.showChoices = (session, results) => {
    let attachments = [];

    results.forEach(function (element) {
        attachments.push(
            new builder.HeroCard(session)
                .title("%(helper)s", element)
                .images([builder.CardImage.create(session, util.format("https://botinf.azurewebsites.net/public/%s.png", element.alias))])
                .text("%(mail)s", element)
                .buttons([
                    
                    builder.CardAction.openUrl(session, util.format('mailto:%s?Subject=BotIT:', element.mail), 'Email'), openUrl(session, util.format('http://aka.ms/itweb/filloutaform')),
                    builder.CardAction.openUrl(session, util.format('sim:v-juanmc@microsoft.com', element.mail), 'Skype')

                ])
        );
    }, this);

    var msg = new builder.Message(session)
        .textFormat(builder.TextFormat.xml)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(attachments);

    session.send(msg);

};