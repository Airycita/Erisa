module.exports = {
    name: 'description',
    explan: 'Pone una descripción al mensaje embed.',
    usage: '$description: Mi hermosa descripción.;',
    params: [{
        name: 'texto',
        description: 'El texto para la descripción.',
        required: true
    }],
    code: async (d, embed, texto) => {
        if (!texto) throw Error('El texto para el embed es requerido.');
        if (texto.length > 4000) texto = texto.slice(0, 4000);
        embed.setDescription(texto);
        return d;
    }
}