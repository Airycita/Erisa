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
```

# Disclaimer
Si planeas compartir, vender, hacer material acerca de este repositorio, porfavor, da los créditos correspondientes, no es dificil hacer eso. uwu