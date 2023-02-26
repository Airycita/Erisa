module.exports = {
    name: 'image',
    explan: 'Pone una imagen al mensaje embed.',
    params: [{
        name: 'texto',
        description: 'La URL de la imagen.',
        required: true
    }],
    code: async (d, image, index = 0) => {
        if (!image) throw Error('La imagen para el embed es requerido.');
        d.message.embeds[index].setImage(image);
        return d;
    }
}