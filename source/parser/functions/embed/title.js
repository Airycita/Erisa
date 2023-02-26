module.exports = {
    name: 'title',
    explan: 'Pone un título al mensaje embed.',
    params: [{
        name: 'texto',
        description: 'El texto para el título',
        required: true
    }],
    code: async (d, texto, index = 0) => {
        if (!texto) throw Error('El texto para el embed es requerido.');
        if (texto.length > 256) texto = texto.slice(0, 256);
        d.message.embeds[index].setTitle(texto);
        return d;
    }
}