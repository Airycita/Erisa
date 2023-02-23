const configuration = require('../../constructor');
const { EmbedBuilder } = require('../../structures/builders');
const { Constants } = require('eris');
const { ApplicationCommandTypes } = Constants;

module.exports = {
    name: 'reload',
    explan: 'Recarga los módulos del core de Erisa.',
    type: ApplicationCommandTypes.CHAT_INPUT,
    options: [{
        name: 'modulo',
        description: 'Módulo que deseas reiniciar.',
        required: true,
        choices: [{
            name: 'Comandos',
            value: 'comandos'
        },{
            name: 'Eventos',
            value: 'eventos'
        },{
            name: 'Interacciones',
            value: 'interacciones'
        }],
        type: 3
    }],
    code: async d => {
        if (d.interaction.member.id !== '1077733015846932530') return (await d.interaction.createMessage({ content: 'No tienes permiso para usar este comando.', flags: 64 }));
        const module = d.interaction.data.options?.find(choice => choice.name === 'modulo' && choice.type === 3)?.value || 'comandos';
        if (module === 'comandos') {
            await d.client.loadCommands('./source/commands');
            await d.client.commands.forEach(command => {
                d.client.createGuildCommand(configuration.guild.id, {
                    name: command.name,
                    type: command.type,
                    description: command.explan,
                    options: command.options?.length !== 0 ? command.options : []
                });
            });
            return (await d.interaction.createMessage({ embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `${d.client.user?.username} Core`, iconURL: `${d.client.user.avatarURL}` })
                    .setDescription('¡Comandos recargados!')
                    .setFooter({ text: `${d.interaction.member.guild.name}`, icon_url: `${d.interaction.member.guild.iconURL}` })
                    .setColor('D1EAF9')
            ] }));
        } else if (module === 'eventos') {
            await d.client.loadEvents('./source/events');
            return (await d.interaction.createMessage({ embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `${d.client.user?.username} Core`, iconURL: `${d.client.user.avatarURL}` })
                    .setDescription('¡Eventos recargados!')
                    .setFooter({ text: `${d.interaction.member.guild.name}`, icon_url: `${d.interaction.member.guild.iconURL}` })
                    .setColor('D1EAF9')
            ] }));
        } else if (module === 'interacciones') {
            await d.client.loadInteractions('./source/interactions');
            return (await d.interaction.createMessage({ embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `${d.client.user?.username} Core`, iconURL: `${d.client.user.avatarURL}` })
                    .setDescription('¡Interacciones recargados!')
                    .setFooter({ text: `${d.interaction.member.guild.name}`, icon_url: `${d.interaction.member.guild.iconURL}` })
                    .setColor('D1EAF9')
            ] }));
        } else {
            return (await d.interaction.createMessage({ embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `${d.client.user?.username} Core`, iconURL: `${d.client.user.avatarURL}` })
                    .setDescription('¡Selección inválida!')
                    .setFooter({ text: `${d.interaction.member.guild.name}`, icon_url: `${d.interaction.member.guild.iconURL}` })
                    .setColor('D1EAF9')
            ] }));
        }
    }
}