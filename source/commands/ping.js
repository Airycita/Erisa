const { Embed } = require('eris');

module.exports = {
    name: 'help',
    explan: 'Despliega la lista de comandos de Erisa.',
    code: async d => {
        return (await d.interaction.createMessage({ content: '¡Hola!' }));
    }
}