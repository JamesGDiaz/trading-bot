'use strict'

const express = require('express')
const router = express.Router()
const api = require('../src/api')

// router.get('/test', api.test)
router.get('/ping', api.ping)
router.get('/balance', api.balance)
router.get('/count', api.count)
router.get('/daily', api.daily)
router.get('/edge', api.edge)
router.get('/profit', api.profit)
router.get('/performance', api.performance)
router.get('/status', api.status)
router.get('/version', api.show_config)
router.get('/trades', api.trades)
router.get('/whitelist', api.whitelist)
router.get('/blacklist', api.blacklist)
router.get('/show_config', api.show_config)

router.post('/blacklist', api.blacklist)
router.post('/stop', api.stop)
router.post('start', api.start)
router.post('/stopbuy', api.stopbuy)
router.post('/reload_conf', api.reload_conf)
router.post('/forcebuy', api.forcebuy)
router.post('/forcesell', api.forcesell)

module.exports = router
