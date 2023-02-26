module.exports = {
    name: 'description',
    explan: 'Pone una descripción al mensaje embed.',
    params: [{
        name: 'texto',
        description: 'El texto para la descripción.',
        required: true
    }],
    code: async (d, texto, index = 0) => {
        if (!texto) throw Error('El texto para el embed es requerido.');
        if (texto.length > 4000) texto = texto.slice(0, 4000);
        d.message.embeds[index].setDescription(texto);
        return d;
    }
}