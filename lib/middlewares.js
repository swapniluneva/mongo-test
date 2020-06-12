const db = require('./db'),
    config = require('../config/server'),
    logger = require('./logger')

const setDB = (req, res, next) => {
    const tenant = config.dbName;
    if(!tenant) return next("Tenant ID not found")
    db.getDB(tenant)
        .then(tenantDB => {
            logger.info(`tenant: ${tenant}`)
            req.conn = tenantDB
            next()
        }).catch(err => {
            next(err)
        })
}

const logRequest = (req, res, next) => {
    logger.info(req.originalUrl, new Date())
    next()
}

const formatQuery = (req, res, next) => {
    next()
}

module.exports = {
    setDB,
    logRequest,
    formatQuery
}