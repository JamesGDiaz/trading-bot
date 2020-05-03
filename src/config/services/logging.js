'use strict'

const winston = require('winston')

/**
 * Logging configuration (winston)
 */
let level = 'info'
if (process.env.NODE_ENV === 'development') level = 'debug'
const log = winston.createLogger({
  level: level,

  format: winston.format.combine(
    winston.format.timestamp({
      format: 'DD-MM-YYYY HH:mm:ss'
    }),
    winston.format.colorize(),
    winston.format.printf(
      info => `${info.timestamp} ${info.level}: ${info.message}`
    )
  ),
  transports: [
    new winston.transports.File({
      filename: 'error.log',
      level: 'error'
    }),
    new winston.transports.File({
      filename: 'combined.log'
    })
  ]
})

if (process.env.NODE_ENV !== 'test') {
  log.add(
    new winston.transports.Console({
      format: winston.format.printf(
        info => `${info.timestamp} ${info.level}: ${info.message}`
      )
    })
  )
}

module.exports = log
