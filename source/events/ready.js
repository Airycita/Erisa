const configuration = require('../constructor');

module.exports = {
    name: 'ready',
    code: async (client) => {
        try {
            /* Sincronizando comandos de barra con el servidor privado. */
            /*
            await client.commands.forEach(command => {
                client.createGuildCommand(configuration.guild.id, {
                    name: command.name,
                    type: command.type,
                    description: command.explan,
                    options: command.options?.length !== 0 ? command.options : []
                });
            });
            */
            let commands = [];
            await client.commands.forEach(command => commands.push(command));
            console.log(commands);
            await client.bulkEditGuildCommands(configuration.guild.id, commands);
            console.log(`¡Sesión iniciada! => ${client.user?.username}`);
        } catch(e) {
            console.log(e);
            console.log(`¡Sesión iniciada! => ${client.user?.username}`);
        }
        
    }
}