const { Client , Intents , Collection, MessageEmbed} = require('discord.js')
const intents = new Intents(32767)
const client = new Client({intents : intents , 
    allowedMentions : {
        repliedUser : false
    },

    partials: ["CHANNEL" , 'GUILD_MEMBER' ,'MESSAGE' , "REACTION" ,"USER"]
})
const settings = require('./config.json')

client.on('ready' , client => {
    console.log(`${client.user.tag} est en ligne`)
})

client.on('messageCreate' , (message , client) => {
    if(message.content.startsWith(settings.prefix+"ping")){
        message.channel.send({content : "pong1"}) //renvoie "pong" sans embed
        const embed = new MessageEmbed()
        .setTitle('Pong')
        message.channel.send({embeds : [embed]}) //renvoie "pong" sous en embed

        message.channel.send({content : "pong3" , embeds : [embed]}) //renvoie pong sans et avec embed
    }
})
client.login(settings.token)