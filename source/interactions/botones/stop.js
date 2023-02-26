const { EmbedBuilder } = require('../../classes/builders')

module.exports = {
    name: 'stop',
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
        await player.destroy();
        d.interaction.acknowledge().then(() => d.interaction.editMessage(d.interaction.message.id, { embeds: [
            new EmbedBuilder()
                .setAuthor({ name: `${d.client.user?.username} DJ`, iconURL: `${d.client.user.avatarURL}` })
                .setDescription('Desconectada, fue un placer estar contigo.')
                .setFooter({ text: `${d.interaction.member.guild.name}`, icon_url: `${d.interaction.member.guild.iconURL}` })
                .setColor('D1EAF9')
        ], components: [] }));
        return (await d.client.leaveVoiceChannel());
    }
}