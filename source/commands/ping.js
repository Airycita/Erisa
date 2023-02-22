const { Embed } = require('eris');
const { ActionRowBuilder, EmbedBuilder, SelectMenuBuilder } = require('../structures/builders');
 
module.exports = {
    name: 'ping',
    explan: 'Muestra la latencia de Erisa.',
    code: async d => {
        const embed = new EmbedBuilder()
            .setAuthor({ name: `${d.client.user?.username} latency`, iconURL: `${d.client.user.avatarURL}` })
            .setDescription(`Latencia: ${d.client.guilds.get(d.interaction.guildID)?.shard.latency ?? 0} ms`)
            .setFooter({ text: `${d.interaction.member.guild.name}`, icon_url: `${d.interaction.member.guild.iconURL}` })
            .setColor('D1EAF9')
            
        return (await d.interaction.createMessage({ embeds: [embed] }));
    }
}