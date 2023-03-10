const { EmbedBuilder } = require('../classes/builders');
const { Constants } = require('oceanic.js');
const { ApplicationCommandTypes, ApplicationCommandOptionTypes } = Constants;

module.exports = {
    name: 'mod',
    description: 'Comandos de moderación de Erisa.',
    type: ApplicationCommandTypes.CHAT_INPUT,
    options: [{
        name: 'ban',
        description: 'Banea al miembro seleccionado.',
        type: ApplicationCommandOptionTypes.SUB_COMMAND,
        options: [{
            name: 'miembro',
            description: 'Selecciona al miembro a banear.',
            type: ApplicationCommandOptionTypes.USER,
            required: true
        },{
            name: 'razon',
            description: 'Escribe la razón del baneo.',
            type: ApplicationCommandOptionTypes.STRING,
            required: false
        }],
        callback: async d => { 
            console.log(d.interaction.data.options[0]);
        }
    },{
        name: 'purge',
        description: 'Elimina mensajes del canal actual',
        type: ApplicationCommandOptionTypes.SUB_COMMAND,
        options: [{
            name: 'cantidad',
            description: '¿Cuantos mensajes quieres eliminar?',
            type: ApplicationCommandOptionTypes.INTEGER,
            required: true
        }],
        callback: async d => { 'xd'; }
    }]
}