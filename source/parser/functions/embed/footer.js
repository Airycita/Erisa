module.exports = {
    name: 'footer',
    explan: 'Pone un footer al mensaje embed.',
    usage: '$footer: Hola | https://icon.png;',
    params: [{
        name: 'texto',
        description: 'El texto del footer.',
        required: true
    },{
        name: 'iconURL',
        description: 'El ícono del footer.',
        required: false
    }],
    code: async (d, embed, texto, iconURL) => {
        iconURL ? embed.setFooter({ text: texto, icon_url: iconURL }) : embed.setFooter({ text: texto });
        return d;
    }
}