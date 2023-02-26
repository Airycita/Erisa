module.exports = {
    name: 'addField',
    explan: 'Añade un field al mensaje embed.',
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
    code: async (d, nombre, valor, inline = 'no', index = 0) => {
        d.message.embeds[index].addField(nombre, valor, inline === 'si' ? true : inline === 'no' ? false : false);
        return d;
    }
}