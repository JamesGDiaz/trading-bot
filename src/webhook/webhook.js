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
  log.verbose(
    `${messageType}: ${messageType === 'status' ? value2 : JSON.parse(value2)}`
  )
  redisClient.smembers('pushTokens', (err, pushTokenList) => {
    if (err) {
      log.error('Error while searching database for pushTokens')
    } else {
      // log.verbose(`Token List: ${pushTokenList}`)
      const out = {}
      switch (messageType) {
      case 'status':
        statusNotifcationBuilder(value2)
        break
      case 'buy':
      case 'buycancel':
        buyNotificationBuilder(value2)
        break
      case 'sell':
      case 'sellcancel':
        sellNotificationBuilder(value2)
        break

      default:
        break
      }
      // Only send push notifications while in production
      // if (process.env.NODE_ENV === 'production') { broadcastPushNotification(pushTokens, out.type, out.message) }
      if (out) {
        broadcastPushNotification(
          pushTokenList,
          out.title,
          out.message,
          out.data
        )
      }
    }
  })
}

const statusNotifcationBuilder = (value2) => {
  if (value2 === 'running') {
    return { title: 'Status: running', message: 'The bot is started', }
  }
  if (value2.includes('*Exchange')) {
    return { title: 'Configuration', message: value2, }
  }
  if (value2 === 'process died') {
    return { title: 'ALERT', message: 'Process Died', }
  }

  return null
}
const buyNotificationBuilder = (messageType, value2) => {
  const payload = JSON.parse(value2)
  return {
    title: `${messageType.toUpperCase()} ${payload.pair} at ${
      payload.current_rate
    }`,
    message:
      `Amount: ${payload.amount}\n` +
      `Open date: ${payload.open_date}\n` +
      `Limit: ${payload.limit}` +
      `Stake: ${payload.stake_amount}${payload.stake_currency}` +
      `Order type: ${payload.order_type}`,
  }
}
const sellNotificationBuilder = (messageType, value2) => {
  const payload = JSON.parse(value2)
  return {
    title: `${messageType.toUpperCase()} ${payload.pair}. ${payload.gain} ${
      payload.profit_amount
    } (${payload.profit_ratio})`,
    message:
      `Amount: ${payload.amount}\n` +
      `Sell reason: ${payload.sell_reason}\n` +
      `Close date: ${payload.close_date}\n` +
      `Open date: ${payload.open_date}\n` +
      `Limit: ${payload.limit}` +
      `Stake: ${payload.stake_amount}${payload.stake_currency}` +
      `Order type: ${payload.order_type}`,
  }
}
module.exports = { webhook, }
