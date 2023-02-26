const { EmbedBuilder } = require('../../classes/builders')

module.exports = {
    name: 'skip',
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
        if (!player.queue.current) return d.interaction.createMessage({ content: 'No hay canciones reproduciendose.', flags: 64 });
        const song = player.queue.current;
        player.skip();
        return d.interaction.acknowledge().then(() => d.interaction.editMessage(d.interaction.message.id, { embeds: [
            new EmbedBuilder()
                .setAuthor({ name: `${d.client.user?.username} DJ`, iconURL: `${d.client.user.avatarURL}` })
                .setThumbnail(song.thumbnail ? song.thumbnail : d.interaction.member.guild.iconURL)
                .setDescription(`Reproduciendo: **[${song.title}](${song.uri})**`)
                .setFooter({ text: `${d.interaction.member.guild.name}`, icon_url: `${d.interaction.member.guild.iconURL}` })
                .setColor('D1EAF9')
        ] }));
    }
}