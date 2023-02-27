module.exports = {
    name: 'title',
    explan: 'Pone un título al mensaje embed.',
    usage: '$title: Mi hermoso título.;',
    params: [{
        name: 'texto',
        description: 'El texto para el título',
        required: true
    }],
    code: async (d, embed, texto) => {
        if (!texto) throw Error('El texto para el embed es requerido.');
        if (texto.length > 256) texto = texto.slice(0, 256);
        embed.setTitle(texto);
        return d;
    }
}