# Erisa
Un cliente extendido de Eris con características personalizadas.

## Configuración (setup)
```javascript
const { Erisa } = require('./structures/client');

const erisa = new Erisa({
    token: 'STRING',
    ...Eris options
});

erisa.loadCommands('./source/commands').then(() => console.log('¡Comandos cargados!'));
erisa.loadEvents('./source/events').then(() => console.log('¡Eventos cargados!'));

erisa.init()
```

## Creando comandos
### Comandos de barra
```javascript
// Debes declarar ApplicationCommandTypes.

module.exports = {
    name: 'ping', // El nombre del comando de barra. (OBLIGATORIO)
    explan: 'Muestra la latencia de Erisa.', // La descripción del comando de barra. (OBLIGATORIO)
    type: ApplicationCommandTypes.CHAT_INPUT, // El tipo de comando. (OBLIGATORIO)
    code: async e => {
        // Código aquí.
    }
}
```
### Subcomandos de barra
```javascript
// Debes declarar ApplicationCommandTypes y ApplicationCommandOptionTypes.

module.exports = {
    name: 'bot', // El nombre del comando de barra. (OBLIGATORIO)
    explan: 'Muestra información acerca de Erisa.', // La descripción del comando de barra. (OBLIGATORIO)
    type: ApplicationCommandTypes.CHAT_INPUT, // El tipo de comando. (OBLIGATORIO)
    options: [{
        name: 'info', // El nombre del subcomando. (OBLIGATORIO)
        description: 'Muestra mi información técnica.', // La descripción del subcomando de barra. (OBLIGATORIO)
        type: ApplicationCommandOptionTypes.SUB_COMMAND, // Declarar el tipo "subcomando". (OBLIGATORIO)
        // options: [{...},{...}], /* Opciones del comando de barra. (por si se necesitan)
        callback: async e => {
            // Código aquí.
        }
    }]
}
```

# Disclaimer
Si planeas compartir, vender, hacer material acerca de este repositorio, porfavor, da los créditos correspondientes, no es dificil hacer eso. uwu