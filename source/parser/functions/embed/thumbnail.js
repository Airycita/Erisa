module.exports = {
    name: 'thumbnail',
    explan: 'Pone una miniatura al mensaje embed.',
    params: [{
        name: 'texto',
        description: 'La URL de la miniatura.',
        required: true
    }],
    code: async (d, thumbnail, index = 0) => {
        if (!thumbnail) throw Error('El texto para el embed es requerido.');
        d.message.embeds[index].setThumbnail(thumbnail);
        return d;
    }
}