const { Erisa } = require('./structures/client');
const configuration = require('./constructor');
const { Kazagumo, Plugins } = require('kazagumo');
const { Connectors } = require('shoukaku');

const erisa = new Erisa(configuration.client);

erisa.loadCommands('./source/commands').then(() => console.log('¡Comandos cargados!'));
erisa.loadEvents('./source/events').then(() => console.log('¡Eventos cargados!'));
erisa.loadInteractions('./source/interactions').then(() => console.log('¡Interacciones cargados!'));

const nodes = [{
    url: configuration.lava.url,
    name: configuration.lava.name,
    auth: configuration.lava.password,
    secure: configuration.lava.secure
}]

erisa.manager = new Kazagumo({
    defaultSearchEngine: 'soundcloud',
    send: (guildId, payload) => {
        const guild = erisa.guilds.get(guildId);
        if (guild) guild.shard.sendWS(payload.op, payload.d);
    },
    plugins: [new Plugins.PlayerMoved(erisa)]
}, new Connectors.Eris(erisa), nodes, {
    moveOnDisconnect: true
})


erisa.init();