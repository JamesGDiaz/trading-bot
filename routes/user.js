'use strict'

const express = require('express')
const router = express.Router()
const { action, } = require('../src/notifications')
router.post('/removePushToken', action.removePushToken)
router.post('/updatePushToken', action.setPushToken)

module.exports = router
