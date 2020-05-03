'use strict'

const express = require('express')
const router = express.Router()

router.get('/test', function (req, res) {
  req.app.io.emit('tx', { key: 'Connected' })
  req.app.io.emit()
})

module.exports = router
