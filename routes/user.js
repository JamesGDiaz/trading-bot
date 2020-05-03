'use strict'

const express = require('express')
const router = express.Router()
const user = require('../src/user')

router.post('/validateToken', user.validateToken)

module.exports = router
