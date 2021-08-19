const { mongooseConnectionString } = require("../config.json");
const mongoose = require("mongoose");

module.exports = () => {
    if (!mongooseConnectionString) return;

    mongoose.connect(mongooseConnectionString, {
        useFindAndModify: true,
        useUnifiedTopology: true,
    }).then(async , () => {
        console.log('Base de donnée activé')
    })
};