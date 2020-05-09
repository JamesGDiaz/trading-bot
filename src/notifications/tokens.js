const { log, } = require('../config')
const { Expo, } = require('expo-server-sdk')
const { redisClient, } = require('../redis')

// Create a new Expo SDK client
const expo = new Expo()

const broadcastPushNotification = (tokenList, title, body, data) => {
  const messages = []
  for (const pushToken of tokenList) {
    // Check that all your push tokens appear to be valid Expo push tokens
    if (!Expo.isExpoPushToken(pushToken)) {
      log.error(`Push token ${pushToken} is not a valid Expo push token`)
      continue
    }
    messages.push({
      to: pushToken,
      title,
      body,
      data,
      priority: 'high',
      channelId: 'trading-bot',
    })
  }

  const chunks = expo.chunkPushNotifications(messages)
  const tickets = []
  ;(async () => {
    for (const chunk of chunks) {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk)
        log.verbose(`ticketChunk: ${ticketChunk}`)
        tickets.push(...ticketChunk)
      } catch (error) {
        log.error(error)
      }
    }
  })()
  const receiptIds = []
  for (const ticket of tickets) {
    if (ticket.id) {
      receiptIds.push(ticket.id)
    }
  }

  const receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds)
  ;(async () => {
    for (const chunk of receiptIdChunks) {
      try {
        const receipts = await expo.getPushNotificationReceiptsAsync(chunk)
        log.verbose(`receipts: ${receipts}`)
        for (const receipt of receipts) {
          if (receipt.status === 'ok') {
            continue
          } else if (receipt.status === 'error') {
            log.error(
              `There was an error sending a notification: ${receipt.message}`
            )
            if (receipt.details && receipt.details.error) {
              log.error(`The error code is ${receipt.details.error}`)
            }
          }
        }
      } catch (error) {
        log.error(error)
      }
    }
  })()
}

/**
 * Set expo push token for a certain user
 * @param {} email
 * @param {} token
 * @param {} callback
 */
const updatePushToken = (token, callback) => {
  redisClient.sadd('pushTokens', token, (err, reply) => {
    log.verbose(`Setting new push token ${token}`)
    if (!err && reply) {
      log.verbose('Redis update success')
      return callback(null, reply)
    } else {
      log.error('Redis update error' + err)
      return callback(err)
    }
  })
  // redisClient.expire('pushTokens', 20) // set expiration of the key an hour from now
}

/**
 * Remove a push token
 * @param {*} token
 * @param {*} callback
 */
const removePushToken = (token, callback) => {
  redisClient.srem('pushTokens', token, (err, reply) => {
    log.verbose(`Removing push token '${token}'...`)
    if (!err && reply) {
      log.verbose('DB update success')
      return callback(null, reply)
    } else {
      log.error('DB update error' + err)
      return callback(err)
    }
  })
}

module.exports = {
  updatePushToken,
  removePushToken,
  broadcastPushNotification,
}
