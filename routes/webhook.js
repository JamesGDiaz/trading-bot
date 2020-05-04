'use strict'

const express = require('express')
const router = express.Router()
const { webhook, webhookbuy, webhooksell, webhookbuycancel, webhooksellcancel, webhookstatus } = require('../src/webhook')

router.post('/webhookbuy', webhookbuy)
router.post('/webhookbuycancel', webhookbuycancel)
router.post('/webhooksell', webhooksell)
router.post('/webhooksellcancel', webhooksellcancel)
router.post('/webhookstatus', webhookstatus)
router.all('/', webhook)

module.exports = router
