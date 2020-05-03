'use strict'

const express = require('express')
const router = express.Router()
const api = require('../src/api')

router.get('/test', api.test)

module.exports = router
