'use strict'

const { log } = require('../config')
const moment = require('moment')
moment().format()

const webhook = (req, res) => {
  log.debug('webhook route requested')
  log.debug(req.body)
  log.debug(JSON.stringify(req.body))
  res.status(200).end()
}

const webhookbuy = (req, res) => {
  console.log(JSON.stringify(req.body))
  res.status(200).end()
}
const webhookbuycancel = (req, res) => {
  console.log(JSON.stringify(req.body))
  res.status(200).end()
}
const webhooksell = (req, res) => {
  console.log(JSON.stringify(req.body))
  res.status(200).end()
}
const webhooksellcancel = (req, res) => {
  console.log(JSON.stringify(req.body))
  res.status(200).end()
}
const webhookstatus = (req, res) => {
  console.log(JSON.stringify(req.body))
  res.status(200).end()
}

module.exports = { webhook, webhookbuy, webhookbuycancel, webhooksell, webhooksellcancel, webhookstatus }
