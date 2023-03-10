const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('../../classes/builders');
const { Constants } = require('oceanic.js');
const { ApplicationCommandTypes, ApplicationCommandOptionTypes } = Constants;

module.exports = {
    name: 'music',
    description: 'Comandos de música de Erisa.',
    type: ApplicationCommandTypes.CHAT_INPUT,
    options: [{
        name: 'disconnect',
        description: 'Me desconecta del canal de voz.',
        type: ApplicationCommandOptionTypes.SUB_COMMAND,
        callback: async d => {
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
    },{
        name: 'join',
        description: 'Me deja unirme al canal de voz donde te encuentras.',
        type: ApplicationCommandOptionTypes.SUB_COMMAND,
        callback: async d => {
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
    },{
        name: 'pause',
        description: 'Pausa la canción en curso.',
        type: ApplicationCommandOptionTypes.SUB_COMMAND,
        callback: async d => {
            if (!d.interaction.member.voiceState.channelID) return (await d.interaction.createMessage({ embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `¡ALTO!`, iconURL: `${d.client.user.avatarURL}` })
                    .setDescription('No estás conectada a un canal de voz.')
                    .setFooter({ text: `${d.interaction.member.guild.name}`, icon_url: `${d.interaction.member.guild.iconURL}` })
                    .setColor('D1EAF9')
            ] }));
            const player = d.client.manager.players.get(d.interaction.guildID);
            if (!player) return;
            player.pause(true);
            return (await d.interaction.createMessage({ embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `${d.client.user?.username} DJ`, iconURL: `${d.client.user.avatarURL}` })
                    .setDescription('Canción pausada.')
                    .setFooter({ text: `${d.interaction.member.guild.name}`, icon_url: `${d.interaction.member.guild.iconURL}` })
                    .setColor('D1EAF9')
            ] }));
        }
    },{
        name: 'play',
        description: 'Reproduce un poco de música. uwu',
        type: ApplicationCommandOptionTypes.SUB_COMMAND,
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
        callback: async d => {
            if (!d.interaction.member.voiceState.channelID) return (await d.interaction.createMessage({ embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `¡ALTO!`, iconURL: `${d.client.user.avatarURL}` })
                    .setDescription('No estás conectada a un canal de voz.')
                    .setFooter({ text: `${d.interaction.member.guild.name}`, icon_url: `${d.interaction.member.guild.iconURL}` })
                    .setColor('D1EAF9')
            ] }));
            //d.interaction.defer(); /* Básicamente, el defer nos da tiempo para que se procese la información. */
            const platform = d.interaction.data.options[0].options.find(choice => choice.name === 'plataforma' && choice.type === 3)?.value || 'soundcloud';
            const search = d.interaction.data.options[0].options.find(str => str.name === 'nombre' && str.type === 3)?.value;
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
    },{
        name: 'resume',
        description: 'Reanuda la reproducción de una canción pausada.',
        type: ApplicationCommandOptionTypes.SUB_COMMAND,
        callback: async d => {
            if (!d.interaction.member.voiceState.channelID) return (await d.interaction.createMessage({ embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `¡ALTO!`, iconURL: `${d.client.user.avatarURL}` })
                    .setDescription('No estás conectada a un canal de voz.')
                    .setFooter({ text: `${d.interaction.member.guild.name}`, icon_url: `${d.interaction.member.guild.iconURL}` })
                    .setColor('D1EAF9')
            ] }));
            const player = d.client.manager.players.get(d.interaction.guildID);
            if (!player) return;
            player.pause(false);
            return (await d.interaction.createMessage({ embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `${d.client.user?.username} DJ`, iconURL: `${d.client.user.avatarURL}` })
                    .setDescription('Canción resumida.')
                    .setFooter({ text: `${d.interaction.member.guild.name}`, icon_url: `${d.interaction.member.guild.iconURL}` })
                    .setColor('D1EAF9')
            ] }));
        }
    }]
}