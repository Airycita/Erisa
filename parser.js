const { Erisascript } = require('./source/classes/scriptLoader');
const { MessageObject } = require('./source/parser/data');

const data = { context: {}, message: { ...MessageObject } }

const erisa = new Erisascript();

let code = `
    $title[TEST]
    $description[sex]
    $color[2F3136]
    $addField[Información de Daimon;Valor del sevidor]
    $addField[field 2; valor 2xd]
`;

(async () => {
    await erisa.setFunctions('./source/parser/functions');
    await erisa.interprete(data, code);
    console.log(data.message.embeds);
})();