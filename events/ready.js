const client = require('../index').client
client.on('ready' , client => {
    console.log(`${client.user.tag} est en ligne`)
})