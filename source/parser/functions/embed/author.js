module.exports = {
    name: 'author',
    explan: 'Pone un autor al mensaje embed.',
    params: [{
        name: 'nombre',
        description: 'El nombre del autor.',
        required: true
    },{
        name: 'iconURL',
        description: 'El avatar del autor.',
        required: false
    }],
    code: async (d, nombre, iconURL, index = 0) => {
        iconURL ? d.message.embeds[index].setAuthor({ name: nombre, iconURL: iconURL }) : d.message.embeds[index].setAuthor({ name: nombre });
        return d;
    }
}