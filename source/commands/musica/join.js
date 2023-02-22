module.exports = {
    name: 'join',
    explan: 'Me deja unirme al canal de voz donde te encuentras.',
    code: async d => {
        if (!d.interaction.member.voiceState.channelID) return (await d.interaction.createMessage('No estás en un canal de voz.'));
        const player = d.client.manager.players.get(d.interaction.guildID);
        if (player) return (await d.interaction.createMessage(`Ya estoy conectada en <#${player.voiceId}>.`));
        const newPlayer = await d.client.manager.createPlayer({
            guildId: d.interaction.guildID,
            voiceId: d.interaction.member.voiceState.channelID,
            textId: d.interaction.channel.id
        });
        return (await d.interaction.createMessage(`Conectada a <#${d.interaction.member.voiceState.channelID}>`));
    }
}