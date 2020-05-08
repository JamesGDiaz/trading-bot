'use strict'

const { log, } = require('../config')
const { broadcastPushNotification, } = require('../notifications/tokens')
const { redisClient, } = require('../redis')

const moment = require('moment')
moment().format()

const webhook = (req, res) => {
  log.debug('webhook route requested')
  // log.debug(JSON.stringify(req.body, 2))
  const messageType = JSON.parse(req.body.value1).messageType
  sendNotification(messageType, req.body.value2)
  res.status(200).end()
}

/**
 * {"value1":"{\"messageType\":\"status\"}","value2":"*Exchange:* `binance`\n*Stake per trade:* `15 USDT`\n*Minimum ROI:* `{'0': 0.15965, '36': 0.05506, '79': 0.03882, '180': 0}`\n*Trailing Stoploss:* `-0.25`\n*Ticker Interval:* `5m`\n*Strategy:* `Ichis360D_Hyper2`","value3":""}
 */

const sendNotification = async (messageType, value2 = {}) => {
  redisClient.smembers('pushTokens', (err, pushTokenList) => {
    if (err) {
      log.error('Error while searching database for pushTokens')
    } else {
      log.debug(`Token List: ${pushTokenList}`)
      const out = {}
      console.log(`messageType: ${messageType}`)
      if (messageType === 'status') {
        out.title = 'status notification'
        out.message = 'status notification'
      } else {
        out.title = 'status notification'
        out.message = 'other type'
      }
      console.log(JSON.stringify(out))
      // Only send push notifications while in production
      // if (process.env.NODE_ENV === 'production') { broadcastPushNotification(pushTokens, out.type, out.message) }
      broadcastPushNotification(pushTokenList, out.type, out.message) // comment this when publishing!
    }
  })
}

module.exports = { webhook, }
