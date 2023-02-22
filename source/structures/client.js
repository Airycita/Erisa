const { Client } = require('eris');
const { Loader } = require('./loader');
const { Database } = require('midb');

class Erisa extends Client {
    constructor(options) {
        /* ----- OPCIONES ----- */
        let config = { ...options };
        delete config['token'];
        super(`Bot ${options['token']}`, config);
        /* ----- PROPIEDADES ----- */
        this.commands = new Map();
        this.db = (new Database(options['database'])).start();
        this.events = new Map();
        this.interactions = new Map();
    }
    /* ----- MÉTODOS -----*/
    async loadCommands(dir) {
        if (!dir) throw new SyntaxError('Debes escribir un directorio en: loadCommands(dir)');
        let array = [];
        Loader.cache(dir, array).then(() => {
            array.forEach(command => this.commands.set(command.name, command));
        });
    }
    async loadEvents(dir) {
        if (!dir) throw new SyntaxError('Debes escribir un directorio en: loadEvents(dir)');
        let array = [];
        Loader.cache(dir, array).then(() => {
            array.forEach(event => this.events.set(event.name, event));
        });
    }
    async loadInteractions(dir) {
        if (!dir) throw new SyntaxError('Debes escribir un directorio en: loadCommands(dir)');
        let array = [];
        Loader.cache(dir, array).then(() => {
            array.forEach(interaction => this.interactions.set(interaction.name, interaction));
        });
    }
    async init() {
        await this.connect()
        this.events.forEach(event => this.on(event.name, async (...args) => event.code(this, ...args)));
    }
}

module.exports = { Erisa }