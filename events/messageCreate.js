const client = require('../index').client
const { MessageEmbed } = require('discord.js')
const config = require('../config.json')

client.on('messageCreate' , async (message) => {
   
    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1)

    let commands = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)));

    if(commands) {
        //Fonction argument manquant
        if(commands.help.args === true && !args.length){
            const arg = new MessageEmbed()
            .setTitle('`❓`・Nous avons pas assez d\'information')
            .setColor('RED')
            .setDescription(`Il nous faut plus de précision !`)
            const argS = new MessageEmbed()
            .setTitle('`❓`・Nous avons pas assez d\'information')
            .setColor('RED')
            .setDescription(`Il nous faut plus de précision !\nVoici comment utilisé la commande: \`${prefix}${commands.help.name} ${commands.help.usage}\``)
            let NoArgsReply = arg
            if (commands.help.usage) {
                var Usage = argS
            } else {
                var Usage = arg
            }

            if (commands.help.usage) Usage;
            return message.channel.send({embeds : [Usage]});
                        

        }
        //OnlyGuild
        if(commands.help.onlyGuild === true){
            if(message.guild.id !== config.PrincipalGuildId) {
                const guild = new MessageEmbed()
                .setTitle('`🚫`・Commande interdite sur se serveur')
                .setDescription("Cette commande est pas autorisé sur votre serveur mais sur [celui la](https://discord.gg/9yyGjkTs)")
                return message.channel.send({embeds : [guild]})
            }
        }
        //Perms
        if (!message.member.permissions.has(commands.help.UserPerms || [])) {
            const NoPerms = new MessageEmbed()
            .setTitle('`🚫`・Vous avez pas les perms')
            .setColor('RED')
            .setDescription(`Cette commande requit les permissions : \`${commands.help.UserPerms || []}\``)
            return message.channel.send({ embeds : [NoPerms]})
        }

        commands.run(client, message, args, prefix);
    }
})