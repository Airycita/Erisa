const { EmbedBuilder } = require('../../structures/builders');
const { Constants } = require('eris');
const { ApplicationCommandTypes } = Constants;

module.exports = {
    name: 'disconnect',
    explan: 'Me desconecta del canal de voz.',
    type: ApplicationCommandTypes.CHAT_INPUT,
    code: async d => {
        if (!d.interaction.member.voiceState.channelID) return (await d.interaction.createMessage({ embeds: [
            new EmbedBuilder()
                .setAuthor({ name: `¡ALTO!`, iconURL: `${d.client.user.avatarURL}` })
                .setDescription('No estás conectada a un canal de voz.')
                .setFooter({ text: `${d.interaction.member.guild.name}`, icon_url: `${d.interaction.member.guild.iconURL}` })
                .setColor('D1EAF9')
        ] }));
        const player = d.client.manager.players.get(d.interaction.guildID);
        if (!player) return;
        await player.destroy();
        await d.client.leaveVoiceChannel();
        return (await d.interaction.createMessage({ embeds: [
            new EmbedBuilder()
                .setAuthor({ name: `uwu`, iconURL: `${d.client.user.avatarURL}` })
                .setDescription('Fue un gusto estar contigo.')
                .setFooter({ text: `${d.interaction.member.guild.name}`, icon_url: `${d.interaction.member.guild.iconURL}` })
                .setColor('D1EAF9')
        ] }));
    }
}