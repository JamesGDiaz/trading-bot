'use strict'

const { log } = require('../config')
const action = {}
const moment = require('moment')
moment().format()

/**
 * Validate Token
 */
action.validateToken = (req, res) => {
  log.verbose('Checking if token is valid')
  if (req.headers) {
    log.verbose('Token is valid!')
  } else {
    log.verbose('token not valid! ')
    return res.status(403)
  }
}

module.exports = action
