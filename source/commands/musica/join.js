const { Constants } = require('eris');
const { ApplicationCommandTypes } = Constants;

module.exports = {
    name: 'join',
    explan: 'Me deja unirme al canal de voz donde te encuentras.',
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
        if (player) return (await d.interaction.createMessage({ embeds: [
            new EmbedBuilder()
                .setAuthor({ name: `¡ALTO!`, iconURL: `${d.client.user.avatarURL}` })
                .setDescription(`Ya estoy conectada en <#${player.voiceId}>`)
                .setFooter({ text: `${d.interaction.member.guild.name}`, icon_url: `${d.interaction.member.guild.iconURL}` })
                .setColor('D1EAF9')
        ] }));
        const newPlayer = await d.client.manager.createPlayer({
            guildId: d.interaction.guildID,
            voiceId: d.interaction.member.voiceState.channelID,
            textId: d.interaction.channel.id
        });
        return (await d.interaction.createMessage({ embeds: [
            new EmbedBuilder()
                .setAuthor({ name: `¡Hola!`, iconURL: `${d.client.user.avatarURL}` })
                .setDescription(`Me he conectado a <#${d.interaction.member.voiceState.channelID}>`)
                .setFooter({ text: `${d.interaction.member.guild.name}`, icon_url: `${d.interaction.member.guild.iconURL}` })
                .setColor('D1EAF9')
        ] }));
    }
}