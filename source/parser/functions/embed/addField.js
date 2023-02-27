module.exports = {
    name: 'addField',
    explan: 'Añade un field al mensaje embed.',
    usage: '$addField: Título | Descripción | si;',
    params: [{
        name: 'nombre',
        description: 'El nombre del field.',
        required: true
    },{
        name: 'valor',
        description: 'El valor del field.',
        required: true
    },{
        name: 'inline',
        description: 'Valor booleano si se desea lineado o no. (si/no)'
    }],
    code: async (d, embed, nombre, valor, inline = 'no') => {
        embed.addField(nombre, valor, inline === 'si' ? true : inline === 'no' ? false : false);
        return d;
    }
}