'use strict'

const apiRoute = require('./api')
const errorRoute = require('./error')
const webhookRoute = require('./webhook')
const middlewares = require('../src/middlewares')

const verifyToken = middlewares.verifyToken

/**
 * Initialize routes
 */
const init = app => {
  app.use('/api', verifyToken, apiRoute)
  app.use('/webhook', verifyToken, webhookRoute)
  app.use('*', errorRoute)
  app.get('/', (req, res, next) => {
    res.send('Server OK<br>What were you looking for?')
  })
}

module.exports = {
  init
}
