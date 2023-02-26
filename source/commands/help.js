const { Embed } = require('eris');
const { ActionRowBuilder, EmbedBuilder, SelectMenuBuilder } = require('../classes/builders');
const { Constants } = require('eris');
const { ApplicationCommandTypes } = Constants;

module.exports = {
    name: 'help',
    explan: 'Despliega la lista de comandos de Erisa.',
    type: ApplicationCommandTypes.CHAT_INPUT,
    code: async d => {
        const embed = new EmbedBuilder()
            .setAuthor({ name: `Comandos de ${d.client.user?.username}`, iconURL: `${d.client.user.avatarURL}` })
            .setFooter({ text: `${d.interaction.member.guild.name}`, icon_url: `${d.interaction.member.guild.iconURL}` })
            .setColor('D1EAF9')
        const stringSelectMenu = new SelectMenuBuilder()
            .setType(3) // StringSelect
            .setCustomId('helpMenu')
            .setPlaceholder('Selecciona un módulo perteneciente al menú.')
            .setMinValues(1)
            .setMaxValues(1)
            .setDisabled(false)
            .addOptions([
                { label: 'Música', description: 'Listado de comandos del sistema de música.', value: 'opt1', default: false }
            ])
        const row = new ActionRowBuilder().addComponents(stringSelectMenu);
            
        return (await d.interaction.createMessage({ embeds: [embed], components: [row] }));
    }
}