const
    builder = require('botbuilder'),
    util = require('util');

var exports = module.exports = {};


exports.showChoices = (session, results) => {
    let attachments = [];

    results.forEach(function (element) {
        attachments.push(
            new builder.HeroCard(session)
                .title("%(helper)s", element)
                // .images([builder.CardImage.create(session, util.format("/public/%(alias)s.png"))])
                .images([builder.CardImage.create(session, util.format("https://botinf.azurewebsites.net/public/support_logo.png"))])
                .text("%(mail)s", element)
                .buttons([
                    builder.CardAction.openUrl(session, util.format('mailto:%(mail)s', element), 'Email'),
                    builder.CardAction.openUrl(session, util.format('skype:%(alias)s', element), 'Skype')

                ])
        );
    }, this);

    var msg = new builder.Message(session)
        .textFormat(builder.TextFormat.xml)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(attachments);

    session.send(msg);

};