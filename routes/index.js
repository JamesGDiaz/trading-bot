'use strict'

const apiRoute = require('./api')
const errorRoute = require('./error')
const webhookRoute = require('./webhook')
const userRoute = require('./user')
const middlewares = require('../src/middlewares')

const verifyToken = middlewares.verifyToken

/**
 * Initialize routes
 */
const init = (app) => {
  app.use('/api', verifyToken, apiRoute)
  app.use('/webhook', webhookRoute)
  app.use('/user', verifyToken, userRoute)
  app.use('*', errorRoute)
  app.get('/', (req, res, next) => {
    res.send('Server OK<br>What were you looking for?')
  })
}

module.exports = {
  init,
}
