const { EmbedBuilder } = require('../classes/builders');

const MessageObject = {
    allowedMentions: [],
    content: '',
    embeds: [new EmbedBuilder()],
    files: []
}

module.exports = { MessageObject }