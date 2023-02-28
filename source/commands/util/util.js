const { EmbedBuilder } = require('../../classes/builders');
const { Constants } = require('eris');
const { ApplicationCommandTypes, ApplicationCommandOptionTypes } = Constants;

module.exports = {
    name: 'util',
    description: 'Comandos útiles de Erisa.',
    type: ApplicationCommandTypes.CHAT_INPUT,
    options: [{
        name: 'function',
        description: 'Busca una función de Erisascript.',
        type: ApplicationCommandOptionTypes.SUB_COMMAND,
        options: [{
            autocomplete: true,
            name: 'query',
            description: 'El nombre de la función a buscar.',
            type: ApplicationCommandOptionTypes.STRING,
            required: true
        }],
        callback: async d => {
            let query = d.interaction.data.options[0].options[0].value.replace('$', '').trim();
            let _function = d.client.script.functions.get(query);
            if (!_function) return (await d.interaction.createMessage('No se encontró la función.'));
            return (await d.interaction.createMessage({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: `$${_function.name}`, iconURL: `${d.client.user.avatarURL}` })
                        .setDescription(_function.explan)
                        .addField('Ejemplo de uso:', `\`\`\`yaml\n${_function.usage}\`\`\``)
                        .setColor('D1EAF9')
                        .setFooter({ text: `${d.interaction.member.guild.name}`, icon_url: `${d.interaction.member.guild.iconURL}` })
                ]
            }))
        },
        autocomplete: async d => {}
    },{
        name: 'say',
        description: 'Repito algo.',
        type: ApplicationCommandOptionTypes.SUB_COMMAND,
        options: [{
            name: 'texto',
            description: 'El texto que quieres que repita.',
            type: ApplicationCommandOptionTypes.STRING,
            required: true
        }],
        callback: async d => {
            let text = d.interaction.data.options[0].options[0].value;
            return (await d.interaction.createMessage((await d.client.script.interprete(text))));
        }
    }]
}