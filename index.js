const { Client , Intents , Collection, MessageEmbed} = require('discord.js')
const intents = new Intents(32767)
const client = new Client({intents : intents , 
    allowedMentions : {
        repliedUser : false
    },

    partials: ["CHANNEL" , 'GUILD_MEMBER' ,'MESSAGE' , "REACTION" ,"USER"]
})
const fs = require('fs')
const { eventNames } = require('process')
const settings = require('./config.json')
const dbconnection = require('./database/mongoose')
//commande handler
client.commands = new Collection()
client.aliases = new Collection()
client.events = new Collection()
module.exports.client = client
fs.readdirSync('./cmd/').forEach(dir => {

    //in the cmds folder, we gonna check for the category
    fs.readdir(`./cmd/${dir}`, (err, files) => {

        // console log err (catch err)
        if (err) throw err;

         // checking if the files ends with .js if its a javascript file
        var jsFiles = files.filter(f => f.split(".").pop() === "js");

         // if there is no cmds in the file it will return
        if (jsFiles.length <= 0) {
          console.log("Aucune commande trouvée");
          return;
        }

        
        jsFiles.forEach(file => {

            // console the loaded cmds 
            var fileGet = require(`./cmd/${dir}/${file}`);
            console.log(`✅ | ${file}`)

            // gonna let the cmds run
            try {
                client.commands.set(fileGet.help.name, fileGet);

                // it search in the cmds folder if there is any aliases
                fileGet.help.aliases.forEach(alias => {
                    client.aliases.set(alias, fileGet.help.name);
                })

            } catch (err) {
              // catch err in console  
                return console.log(err);
            }
        });
    });
});


//events handler
fs.readdirSync('./events').forEach(file => {
    var jsFiles = fs.readdirSync('./events/').filter(f => f.split(".").pop() === "js")
    if(jsFiles.length <= 0) return console.log('Aucun events trouvé')
    let check = false
    jsFiles.forEach(file => {
        const eventsGet = require(`./events/${file}`)

        try {
            client.events.set(eventsGet.name , eventsGet)
            if(check === false){
                console.log(`✅ | ${file}`)
                check === true
            }
        } catch(error) {
            return console.log(error)
        }
    })
})

dbconnection()

client.login(settings.token)