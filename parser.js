const { Erisascript } = require('./source/classes/script');

const erisa = new Erisascript();

let code = `
    $description: Un custom script para Erisa bot.;
`;

(async () => {
    await erisa.setFunctions('./source/parser/functions');
    console.log(await erisa.interprete(code, false));
})();