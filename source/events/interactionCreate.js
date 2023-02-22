const { Constants } = require('eris');
const { InteractionTypes } = Constants;

module.exports = {
    name: 'interactionCreate',
    code: async (client, interaction) => {
        let db = client.db;
        if (interaction.type === InteractionTypes.APPLICATION_COMMAND) {
            const command = client.commands.get(interaction.data.name);
            if (!command) return; /* Si no hay comando, no hagas nada. */
            try {
                command.code({ client, command, db, interaction });
            } catch(e) {
                interaction.createMessage({ content: '¡Algo interno salió mal! :c', flags: 64 });
            }
        } else {
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