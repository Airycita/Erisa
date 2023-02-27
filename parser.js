const { Erisascript } = require('./source/classes/script');
const { MessageObject } = require('./source/parser/data');

const data = { context: {}, message: { ...MessageObject } }

const erisa = new Erisascript();

let code = `
    @title: ErisaScript;
    @description: Un custom script para Erisa bot.;
    @color: D1EAF9;
`;

(async () => {
    await erisa.setFunctions('./source/parser/functions');
    await erisa.interprete(data, code, true);
})();