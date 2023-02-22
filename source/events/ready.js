const configuration = require('../constructor');
const { Constants } = require('eris');
const { ApplicationCommandTypes } = Constants;

module.exports = {
    name: 'ready',
    code: async (client) => {
        try {
            /* Sincronizando comandos de barra con el servidor privado. */
            await client.commands.forEach(command => {
                client.createGuildCommand(configuration.guild.id, {
                    name: command.name,
                    type: ApplicationCommandTypes.CHAT_INPUT,
                    description: command.explan
                });
            });
            console.log(`¡Sesión iniciada! => ${client.user?.username}`);
        } catch(e) {
            console.log(e);
            console.log(`¡Sesión iniciada! => ${client.user?.username}`);
        }
        
    }
}