const { Constants } = require('eris');
const { InteractionTypes, ApplicationCommandOptionTypes } = Constants;

module.exports = {
    name: 'interactionCreate',
    code: async (client, interaction) => {
        let db = client.db;
        /* Comandos principales */
        if (interaction.type === InteractionTypes.APPLICATION_COMMAND) {
            const command = client.commands.get(interaction.data.name);
            if (!command) return; /* Si no hay comando, no hagas nada. */
            if (!command.options || command.options?.every(cmd => cmd.type !== ApplicationCommandOptionTypes.SUB_COMMAND)) {
                try {
                    command.code({ client, command, db, interaction });
                } catch(e) {
                    interaction.createMessage({ content: '¡Algo interno salió mal! :c', flags: 64 });
                }
            /* Manejando los subcomandos. */
            } else if (command.options && command.options?.every(cmd => cmd.type === ApplicationCommandOptionTypes.SUB_COMMAND)) {
                const subcommand = command.options[0];
                try {
                    subcommand.callback({ client, command, db, interaction });
                } catch(e) {
                    interaction.createMessage({ content: '¡Algo interno salió mal! :c', flags: 64 });
                }
            /* Statement por cautela. */
            } else {
                try {
                    command.code({ client, command, db, interaction });
                } catch(e) {
                    interaction.createMessage({ content: '¡Algo interno salió mal! :c', flags: 64 });
                }
            }
        } else if (interaction.type === InteractionTypes.MESSAGE_COMPONENT) {
            const command = client.interactions.get(interaction.data.custom_id);
            if (!command) return; /* Si no hay comando, no hagas nada. */
            try {
                command.code({ client, command, db, interaction });
            } catch(e) {
                interaction.createMessage({ content: '¡Algo interno salió mal! :c', flags: 64 });
            }
        }
    }
}