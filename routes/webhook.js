'use strict'

const express = require('express')
const router = express.Router()
const { webhook } = require('../src/webhook')

router.all('/', webhook)

module.exports = router
