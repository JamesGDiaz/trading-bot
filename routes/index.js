'use strict'

const userRoute = require('./user')
const apiRoute = require('./api')
const errorRoute = require('./error')
const webhookRoute = require('./webhook')

/**
 * Initialize routes
 */
const init = app => {
  app.use('/api/user', userRoute)
  app.use('/api', apiRoute)
  app.use('/webhook', webhookRoute)
  app.use('*', errorRoute)
  app.get('/', (req, res, next) => {
    res.send('Server OK<br>What were you looking for?')
  })
}

module.exports = {
  init
}
