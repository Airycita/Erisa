const { EmbedBuilder } = require('../classes/builders');
const { Constants } = require('eris');
const { ApplicationCommandTypes, ApplicationCommandOptionTypes } = Constants;

/**
 * 
 * @param {string} username El nombre de usuario para generar un mensaje bonito.
 * @returns {string}
 */
const messages = (username) => {
    let texts = [
        'Si me pudiera enamorar de alguien, sería de @user;. <3',
        'No hay persona más bonita que @user;. uwu',
        'Hola, espero la información de @user; te sea útil.',
        'Hola @user;, soy tu fan. uwu',
        'Heyyyy @user!;'
    ]
    return texts[Math.floor(Math.random() * texts.length)].replace('@user;', username);
}

module.exports = {
    name: 'member',
    description: 'Muestra información miscelánea de un miembro del servidor.',
    type: ApplicationCommandTypes.CHAT_INPUT,
    options: [{
        name: 'info',
        description: 'Muestra información acerca del miembro seleccionado.',
        type: ApplicationCommandOptionTypes.SUB_COMMAND,
        options: [{
            name: 'miembro',
            description: 'El miembro deseado.',
            type: ApplicationCommandOptionTypes.USER,
            required: false
        }],
        callback: async d => {
            let member = d.interaction.data.options[0].options.length === 0 ? d.interaction.member.id : d.interaction.data.options[0].options[0].value;
            member = await d.client.getRESTGuildMember(d.interaction.guildID, member).catch(e => null);
            if (!member) return (await d.interaction.createMessage({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: `Algo inesperado ocurrió.`, iconURL: `${d.client.user.avatarURL}` })
                        .setDescription(`No pude obtener los datos del miembro seleccionado debido a un error desconocido.`)
                        .setFooter({ text: `${d.interaction.member.guild.name}`, icon_url: `${d.interaction.member.guild.iconURL}` })
                        .setColor('D1EAF9')
                ],
                flags: 64
            }));
            return (await d.interaction.createMessage({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: `Información de ${member.user?.username}.`, iconURL: `${d.client.user.avatarURL}` })
                        .setDescription(`${member.user?.username === d.client.user?.username ? 'Hey! soy yo. uwu' : messages(member.user?.username)}`)
                        .setThumbnail(`${member.user?.avatarURL}`)
                        .addFields([{
                            name: 'Nombre de usuario:',
                            value: `${member.user?.username}`,
                            inline: false
                        },{
                            name: 'Discriminador',
                            value: `${member.user?.discriminator}`,
                            inline: false
                        },{
                            name: 'Identificador',
                            value: `${member.user?.id}`,
                            inline: false
                        },{
                            name: 'Unión al servidor',
                            value: `<t:${(member.joinedAt / 1000).toFixed(0)}:F> | <t:${(member.joinedAt / 1000).toFixed(0)}:R>`,
                            inline: false
                        }])
                        .setFooter({ text: `${d.interaction.member.guild.name}`, icon_url: `${d.interaction.member.guild.iconURL}` })
                        .setColor('D1EAF9')
                ]
            }));
        }
    }]
}