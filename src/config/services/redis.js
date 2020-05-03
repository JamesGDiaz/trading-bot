const { redisClient } = require('../../redis')
const log = require('./logging')

/**
 * Set-up redis client for in-memory storage solutions
 * @function
 */

const init = () => {
  redisClient.on('connect', () => {
    log.info('Connected to redis server')
  })
}

module.exports = {
  init
}
