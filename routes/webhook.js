'use strict'

const express = require('express')
const router = express.Router()
const { webhook, } = require('../src/webhook')

router.post('/', webhook)

module.exports = router
