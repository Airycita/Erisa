module.exports = {
    name: 'thumbnail',
    explan: 'Pone una miniatura al mensaje embed.',
    usage: '$thumbnail: https://avatar.png;',
    params: [{
        name: 'texto',
        description: 'La URL de la miniatura.',
        required: true
    }],
    code: async (d, embed, thumbnail) => {
        if (!thumbnail) throw Error('El texto para el embed es requerido.');
        embed.setThumbnail(thumbnail);
        return d;
    }
}