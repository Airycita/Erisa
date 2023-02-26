module.exports = {
    name: 'footer',
    explan: 'Pone un footer al mensaje embed.',
    params: [{
        name: 'texto',
        description: 'El texto del footer.',
        required: true
    },{
        name: 'iconURL',
        description: 'El ícono del footer.',
        required: false
    }],
    code: async (d, texto, iconURL, index = 0) => {
        iconURL ? d.message.embeds[index].setFooter({ text: texto, icon_url: iconURL }) : d.message.embeds[index].setFooter({ text: texto });
        return d;
    }
}