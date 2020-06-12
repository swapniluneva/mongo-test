const MongoClient = require('mongodb').MongoClient
const config = require('../config/server')
let mongoDB = {};

module.exports = {
    getDB: id => {
        return new Promise ((resolve, reject) => {
            if (mongoDB[id]) return resolve(mongoDB[id])
            MongoClient.connect(config.mongodb.url, (err, dbObj) => {
                if (err) return reject(err)
                mongoDB[id] = dbObj.db(id)
                return resolve(mongoDB[id])
            })
        })
    }
}