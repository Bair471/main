const { MongoClient } = require('mongodb'); 
const {URL} = require(`./secret.js`);

let dbConnection;

module.exports = {
    connectTodb: (cb) => {
        MongoClient
        .connect(URL)
        .then((client) => {
            console.log('Connected to MongoDB');
            dbConnection = client.db(`bikes`);
            return cb();
        })
        .catch((err) => {
            return cb(err);
        })
    },
    getDb: () => dbConnection,
}