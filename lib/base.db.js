const ObjectId = require('mongodb').ObjectId

module.exports = coll => ({
    aggregate: (conn, pipeline, options = {}) => conn.collection(coll).aggregate(pipeline, options).toArray(),

    count: (conn, query, options = {}) => conn.collection(coll).countDocuments(query, options),

    createIndexes: (conn, indexSpecs, options = {}) => conn.collection(coll).createIndexes(indexSpecs, options),

    find: (conn, query, options = {}) => conn.collection(coll).find(query, options).toArray(),

    findById: (conn, id, options = {}) => conn.collection(coll).findOne({ _id: this.id(id) }, options),

    findOne: (conn, query, options = {}) => conn.collection(coll).findOne(query, options),

    findOneAndUpdate: (conn, query, update, options = {returnOriginal: false}) => conn.collection(coll).findOneAndUpdate(query, update, options),

    id: id => {
        if(id == undefined || (id && typeof id == 'string')) 
            return new ObjectId(id)
        if(id && id instanceof ObjectId)
            return id
        return null
    },

    insertOne: (conn, doc, options = {}) => conn.collection(coll).insertOne(doc, options),

    insertMany: (conn, docs, options = {}) => conn.collection(coll).insertMany(docs, options),

    updateOne: (conn, query, update, options = {}) => conn.collection(coll).updateOne(query, update, options),

    updateMany: (conn, query, update, options = {}) => conn.collection(coll).updateMany(query, update, options)
})