module.exports = {
    name: 'color',
    explan: 'Pone un color al mensaje embed.',
    params: [{
        name: 'hex',
        description: 'El color para el mensaje.',
        required: true
    }],
    code: async (d, hex, index = 0) => {
        if (!hex) throw Error('El color para el embed es requerido.');
        d.message.embeds[index].setColor(hex);
        return d;
    }
}