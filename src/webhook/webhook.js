'use strict'

const { log } = require('../config')
const action = {}
const moment = require('moment')
moment().format()

action.webhook = (req, res) => {
  log.debug('webhook route requested')
  log.debug(req.params)
  log.debug(JSON.stringify(req.params))
  res.status(200).end()
}

action.webhookbuy = (req, res) => {
  console.log(JSON.stringify(req.body))
  res.status(200).end()
}
action.webhookbuycancel = (req, res) => {
  console.log(JSON.stringify(req.body))
  res.status(200).end()
}
action.webhooksell = (req, res) => {
  console.log(JSON.stringify(req.body))
  res.status(200).end()
}
action.webhooksellcancel = (req, res) => {
  console.log(JSON.stringify(req.body))
  res.status(200).end()
}
action.webhookstatus = (req, res) => {
  console.log(JSON.stringify(req.body))
  res.status(200).end()
}

module.exports = action
