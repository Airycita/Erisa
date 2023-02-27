module.exports = {
    name: 'color',
    explan: 'Pone un color al mensaje embed.',
    usage: '$color: 000000;',
    params: [{
        name: 'hex',
        description: 'El color para el mensaje.',
        required: true
    }],
    code: async (d, embed, hex) => {
        if (!hex) throw Error('El color para el embed es requerido.');
        embed.setColor(hex);
        return d;
    }
}