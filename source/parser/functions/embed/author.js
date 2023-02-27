module.exports = {
    name: 'author',
    explan: 'Pone un autor al mensaje embed.',
    usage: '$author: Hola | https://avatar.png;',
    params: [{
        name: 'nombre',
        description: 'El nombre del autor.',
        required: true
    },{
        name: 'iconURL',
        description: 'El avatar del autor.',
        required: false
    }],
    code: async (d, embed, nombre, iconURL) => {
        iconURL ? embed.setAuthor({ name: nombre, iconURL: iconURL }) : embed.setAuthor({ name: nombre });
        return d;
    }
}