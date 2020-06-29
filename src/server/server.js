'use strict'

const {
  config,
  express,
  log,
  stats,
  redis,
} = require('../config')
const routes = require('../../routes')
// const mongoose = require('mongoose')
const http = require('http')
let server = null

/**
 * Start HTTP/2 server, database
 * Load routes, services, check memory usage
 * @function
 */
const listen = () => {
  const app = express.init()
  server = http.createServer(app).listen(config.port)
  log.info(`✓ Listening at http://${config.host}:${config.port}`)
  log.info(`✓ Freqtrade is running at http://${config.freqtradeHost}:${config.freqtradePort}`)
  redis.init()
  routes.init(app)
  stats.memory()
}

/**
 * Close server, database connection
 * @function
 */
const close = () => {
  server.close()
  // mongoose.disconnect()
  log.info('Server is offline. Bye!')
}

module.exports = {
  listen,
  close,
}
