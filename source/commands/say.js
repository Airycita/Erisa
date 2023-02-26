const { MessageObject } = require('../parser/data');
const { Constants } = require('eris');
const { ApplicationCommandTypes } = Constants;

module.exports = {
    name: 'say',
    explan: 'Repito tu mensaje.',
    type: ApplicationCommandTypes.CHAT_INPUT,
    code: async d => {
        let code = `
            $title[TEST]
            $description[sex]
            $color[2F3136]
            $addField[Información de Daimon;Valor del sevidor]
            $addField[field 2; valor 2xd]
        `;
        const data = { context: {}, message: { ...MessageObject } };
        let object = await d.client.script.interprete(data, code);
        return (await d.interaction.createMessage(data.message));
    }
}