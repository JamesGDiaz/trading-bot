'use strict'

const { log, } = require('../config')
const { broadcastPushNotification, } = require('../notifications/tokens')
const { redisClient, } = require('../redis')

const moment = require('moment')
moment().format()

const webhook = (req, res) => {
  log.debug('webhook route requested')
  const messageType = JSON.parse(req.body.value1).messageType
  sendNotification(messageType, req.body.value2)
  res.status(200).end()
}

const sendNotification = async (messageType, value2 = {}) => {
  redisClient.smembers('pushTokens', (err, pushTokenList) => {
    if (err) {
      log.error('Error while searching database for pushTokens')
    } else {
      let out = {}
      switch (messageType) {
      case 'status':
        out = statusNotifcationBuilder(value2)
        break
      case 'buy':
      case 'buycancel':
        out = buyNotificationBuilder(messageType, value2)
        break
      case 'sell':
      case 'sellcancel':
        out = sellNotificationBuilder(messageType, value2)
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
    return { title: 'Configuration:', message: value2, }
  }
  if (value2 === 'process died') {
    return { title: 'ALERT', message: 'Process Died', }
  }
  return null
}
const buyNotificationBuilder = (messageType, value2) => {
  log.debug(messageType)
  log.debug(value2)
  try {
    JSON.parse(value2)
  } catch (error) {
    log.error(error)
    return
  }
  const payload = JSON.parse(value2)
  return {
    title: `${messageType.toUpperCase()} ${payload.pair} at ${Number(
      payload.current_rate
    ).toFixed(5)}`,
    message:
      `Amount: ${Number(payload.amount).toFixed(6)}\n` +
      `Order: ${Number(payload.limit).toFixed(6)} ${payload.order_type}\n`,
  }
}
const sellNotificationBuilder = (messageType, value2) => {
  log.debug(messageType)
  log.debug(value2)
  try {
    JSON.parse(value2)
  } catch (error) {
    log.error(error)
    return
  }
  const payload = JSON.parse(value2)
  return {
    title: `${messageType.toUpperCase()} ${payload.pair} ${
      payload.profit_amount > 0 ? '+' : '-'
    }`,
    message:
      `${payload.gain}: ${Number(payload.profit_ratio).toFixed(2)}% (${Number(
        payload.profit_amount
      ).toFixed(2)})\n` +
      `Sell reason: ${payload.sell_reason}\n` +
      `Order: ${payload.limit} ${payload.order_type}\n` +
      `Open date: ${moment
        .utc(payload.open_date)
        .utcOffset('-05:00')
        .format('D/MMM/YY H:m:s')}\n`,
  }
}
module.exports = { webhook, }
