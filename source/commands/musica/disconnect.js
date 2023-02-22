const { EmbedBuilder } = require('../../structures/builders');

module.exports = {
    name: 'disconnect',
    explan: 'Me desconecta del canal de voz.',
    code: async d => {
        if (!d.interaction.member.voiceState.channelID) return (await d.interaction.createMessage('No estás en un canal de voz.'));
        const player = d.client.manager.players.get(d.interaction.guildID);
        if (!player) return;
        await player.destroy();
        await d.client.leaveVoiceChannel();
        return (await d.interaction.createMessage('Fue un gusto estar contigo.'));
    }
}