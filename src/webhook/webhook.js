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
        out = buyNotificationBuilder(messageType, value2)
        break
      case 'sell':
        out = sellNotificationBuilder(messageType, value2)
        break
      case 'buycancel':
      case 'sellcancel':
        out = orderCancelNotificationBuilder(messageType, value2)
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
  return { title: 'Status Notification', message: value2, }
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
    title: `${messageType.toUpperCase()} ${payload.pair} at ${parseFloat(
      Number(payload.current_rate)
    )}`,
    message:
      `Amount: ${parseFloat(Number(payload.amount))} ${
        payload.pair.split('/')[0]
      }\n` +
      `Rate: ${parseFloat(Number(payload.limit))} ${
        payload.pair.split('/')[1]
      }\n`,
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
      `${payload.gain}: ${Number(payload.profit_amount).toFixed(2)} ${
        payload.pair.split('/')[1]
      } (${(Number(payload.profit_ratio) * 100).toFixed(2)}%)\n` +
      `Sell reason: ${payload.sell_reason}\n` +
      `Rate: ${parseFloat(Number(payload.limit))} ${payload.stake_currency}\n` +
      `Open date: ${Date(payload.open_date)}\n`,
  }
}
const orderCancelNotificationBuilder = (messageType, value2) => {
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
    title: `${messageType === 'buyCancel' ? 'BUY' : 'SELL'} order of ${
      payload.pair
    } has been cancelled`,
    message:
      `Amount: ${Number(payload.amount).toFixed(6)}${
        payload.pair.split('/')[0]
      }\n` +
      `Rate: ${Number(payload.limit).toFixed(6)} ${
        payload.pair.split('/')[1]
      }` +
      `Open date: ${Date(payload.open_date)}`,
  }
}
module.exports = { webhook, }
