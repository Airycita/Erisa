const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('../../classes/builders');
const { Constants } = require('eris');
const { ApplicationCommandTypes } = Constants;

module.exports = {
    name: 'play',
    explan: 'Reproduce un poco de música. uwu',
    type: ApplicationCommandTypes.CHAT_INPUT,
    options: [{
        name: 'nombre',
        description: 'Nombre de la canción que deseas buscar.',
        required: true,
        type: 3
    },{
        name: 'plataforma',
        description: '¿Desde donde quieres reproducir la canción?',
        required: false,
        choices: [{
            name: 'YouTube',
            value: 'youtube'
        },{
            name: 'SoundCloud',
            value: 'soundcloud'
        }],
        type: 3
    }],
    code: async d => {
        if (!d.interaction.member.voiceState.channelID) return (await d.interaction.createMessage({ embeds: [
            new EmbedBuilder()
                .setAuthor({ name: `¡ALTO!`, iconURL: `${d.client.user.avatarURL}` })
                .setDescription('No estás conectada a un canal de voz.')
                .setFooter({ text: `${d.interaction.member.guild.name}`, icon_url: `${d.interaction.member.guild.iconURL}` })
                .setColor('D1EAF9')
        ] }));
        d.interaction.defer(); /* Básicamente, el defer nos da tiempo para que se procese la información. */
        const platform = d.interaction.data.options?.find(choice => choice.name === 'plataforma' && choice.type === 3)?.value || 'soundcloud';
        const search = d.interaction.data.options?.find(str => str.name === 'nombre' && str.type === 3)?.value;
        if (!platform || !search) return (await d.interaction.createMessage({ content: 'Datos faltantes.', flags: 64 }));
        const res = await d.client.manager.search(search, { engine: platform, requester: d.interaction.member });
        let player = d.client.manager.players.get(d.interaction.guildID);
        if (!player) {
            player = await d.client.manager.createPlayer({
                guildId: d.interaction.guildID,
                voiceId: d.interaction.member.voiceState.channelID,
                textId: d.interaction.channel.id
            });
        }
        const song = res.tracks[0]
        player.queue.add(song);
        if (!player.playing && !player.paused && !player.queue.size) {
            player.play();
        }
        if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) {
            player.play();
        }
        let buttons = {
            pause: new ButtonBuilder().setCustomId('pause').setDisabled(false).setLabel('Pausar'),
            skip: new ButtonBuilder().setCustomId('skip').setDisabled(false).setLabel('Saltar'),
            stop: new ButtonBuilder().setCustomId('stop').setDisabled(false).setLabel('Detener')
        }
        let row = new ActionRowBuilder().addComponents(buttons.stop, buttons.pause, buttons.skip);
        return (await d.interaction.createMessage({ embeds: [
            new EmbedBuilder()
                .setAuthor({ name: `${d.client.user?.username} DJ`, iconURL: `${d.client.user.avatarURL}` })
                .setThumbnail(song.thumbnail ? song.thumbnail : d.interaction.member.guild.iconURL)
                .setDescription(`**[${song.title}](${song.uri})** ha sido añadido a la cola.`)
                .setFooter({ text: `${d.interaction.member.guild.name} | ${platform === 'soundcloud' ? 'Potenciada por SoundCloud' : 'uwu'}`, icon_url: `${d.interaction.member.guild.iconURL}` })
                .setColor('D1EAF9')
        ], components: [row] }));

    }
}