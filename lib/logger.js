const winston = require('winston')

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: "info",
      handleExceptions: false,
      json: false,
      timestamp: () => new Date(),
      formatter: options => {
        // Return string will be passed to logger.
        return options.timestamp() + ' ' + options.level.toUpperCase() + ': ' +
          (options.message ? options.message : '') +
          (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(
            options.meta) : '')
      },
      colorize: true
    }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

/*const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  //defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.Console({
      level: 'info',
      handleExceptions: false,
      json: false,
      timestamp: () => new Date(),
      formatter: options => {
        // Return string will be passed to logger.
        return options.timestamp() + ' ' + options.level.toUpperCase() + ': ' +
          (options.message ? options.message : '') +
          (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(
            options.meta) : '')
      },
      colorize: true
    })
  ]
})*/

module.exports = logger

module.exports.stream = {
  write: (message, encoding) => {
    logger.info(message)
  }
}