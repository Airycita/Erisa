const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('../../structures/builders')

module.exports = {
    name: 'pause',
    code: async d => {
        if (!d.interaction.member.voiceState.channelID) return (await d.interaction.createMessage({ embeds: [
            new EmbedBuilder()
                .setAuthor({ name: `¡ALTO!`, iconURL: `${d.client.user.avatarURL}` })
                .setDescription('No estás conectada a un canal de voz.')
                .setFooter({ text: `${d.interaction.member.guild.name}`, icon_url: `${d.interaction.member.guild.iconURL}` })
                .setColor('D1EAF9')
        ], flags: 64 }));
        const player = d.client.manager.players.get(d.interaction.guildID);
        if (!player) return;
        let buttons = {
            resume: new ButtonBuilder().setCustomId('resume').setDisabled(false).setLabel('Reanudar'),
            skip: new ButtonBuilder().setCustomId('skip').setDisabled(false).setLabel('Saltar'),
            stop: new ButtonBuilder().setCustomId('stop').setDisabled(false).setLabel('Detener')
        }
        let row = new ActionRowBuilder().addComponents(buttons.stop, buttons.resume, buttons.skip);
        player.pause(true);
        return d.interaction.acknowledge().then(() => d.interaction.editMessage(d.interaction.message.id, { embeds: [
            new EmbedBuilder()
                .setAuthor({ name: `${d.client.user?.username} DJ`, iconURL: `${d.client.user.avatarURL}` })
                .setDescription('Estado: pausada.')
                .setFooter({ text: `${d.interaction.member.guild.name}`, icon_url: `${d.interaction.member.guild.iconURL}` })
                .setColor('D1EAF9')
        ], components: [row] }));
    }
}