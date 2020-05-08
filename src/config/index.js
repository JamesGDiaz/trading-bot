'use strict'

const config = require('./services/config')
const express = require('./services/express')
const smtpTransport = require('./services/nodemailer')
const log = require('./services/logging')
const stats = require('./services/stats')
const redis = require('./services/redis')

module.exports = {
  config,
  express,
  log,
  smtpTransport,
  stats,
  redis,
}
