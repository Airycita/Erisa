const { EmbedBuilder } = require('../../structures/builders');

module.exports = {
    name: 'helpMenu',
    code: async (d) => {
        if (d.interaction.data.values[0] === 'opt1') {
            d.interaction.acknowledge().then(() => {
                d.interaction.editMessage(d.interaction.message.id, { embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: `Comandos de ${d.client.user?.username}`, iconURL: `${d.client.user.avatarURL}` })
                        .addField('Módulo: Música', '`disconnect`, `join`, `play`')
                        .setFooter({ text: `${d.interaction.member.guild.name}`, icon_url: `${d.interaction.member.guild.iconURL}` })
                        .setColor('D1EAF9')
                ] })
            });
        }
    }
}