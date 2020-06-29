'use strict'

const basicAuth = require('express-basic-auth')

const apiRoute = require('./api')
const errorRoute = require('./error')
const webhookRoute = require('./webhook')
const userRoute = require('./user')
const { config, } = require('../src/config')

const users = { [config.username]: config.password, }
console.log(users)
/**
 * Initialize routes
 */
const init = (app) => {
  app.use('/api', basicAuth({
    users,
  }), apiRoute)
  app.use('/user', basicAuth({
    users,
  }), userRoute)
  app.use('/webhook', webhookRoute)
  app.use('*', errorRoute)
  app.get('/', (req, res, next) => {
    res.send('Server OK<br>What were you looking for?')
  })
}

module.exports = {
  init,
}
