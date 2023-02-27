module.exports = {
    name: 'image',
    explan: 'Pone una imagen al mensaje embed.',
    usage: '$image: https://image.png;',
    params: [{
        name: 'texto',
        description: 'La URL de la imagen.',
        required: true
    }],
    code: async (d, embed, image) => {
        if (!image) throw Error('La imagen para el embed es requerido.');
        embed.setImage(image);
        return d;
    }
}