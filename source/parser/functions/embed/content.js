module.exports = {
    name: 'content',
    explan: 'Pone contenido al mensaje.',
    usage: '$content: Este es el contenido del mensaje.;',
    params: [{
        name: 'texto',
        description: 'El contenido del mensaje.',
        required: true
    }],
    code: async (d, message) => {
        d.content = message;
        return d;
    }
}