const { Erisa } = require('./structures/client');
const configuration = require('./constructor');

const erisa = new Erisa(configuration.client);

erisa.loadCommands('./source/commands').then(() => console.log('¡Comandos cargados!'));
erisa.loadEvents('./source/events').then(() => console.log('¡Eventos cargados!'));
// erisa.loadInteractions('./source/interactions').then(() => console.log('¡Interacciones cargados!'));

erisa.init();