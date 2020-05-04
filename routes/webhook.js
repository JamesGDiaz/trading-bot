'use strict'

const express = require('express')
const router = express.Router()
const { webhook } = require('../src/webhook')

router.post('/webhookbuy', webhook.webhookbuy)
router.post('/webhookbuycancel', webhook.webhookbuycancel)
router.post('/webhooksell', webhook.webhooksell)
router.post('/webhooksellcancel', webhook.webhooksellcancel)
router.post('/webhookstatus', webhook.webhookstatus)
router.all('/', webhook)

module.exports = router
