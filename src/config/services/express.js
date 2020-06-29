'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')

const corsOptions = {
  credentials: true,
}

/**
 * Express configuration
 * @function
 */
const init = () => {
  const app = express()
  app.use(helmet())
  app.use(cors(corsOptions))
  app.use(bodyParser.urlencoded({ extended: true, }))
  app.use(bodyParser.json())
  return app
}

module.exports = {
  init,
}
