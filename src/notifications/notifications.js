const { log, } = require('../config')
const { updatePushToken, removePushToken, } = require('./tokens')
const action = {}

/**
 * Set users' push token for notifications
 */
action.setPushToken = (req, res) => {
  updatePushToken(req.body.token.value, (err) => {
    if (err) {
      log.verbose('There was en error while updating the database')
      return res.json({
        type: 'checklogin',
        success: false,
      })
    } else {
      log.verbose('Push token update succesful')
      return res.json({
        type: 'pushtoken',
        success: true,
      })
    }
  })
}

/**
 * Remove users' push token for notifications
 */
action.removePushToken = (req, res) => {
  log.verbose('Removing push token...')
  removePushToken(req.body.token.value, (err) => {
    if (err) {
      log.verbose('There was en error while updating the redis server')
      return res.json({
        type: 'redis-error',
        success: false,
      })
    } else {
      log.verbose('Push token remove succesful')
      return res.json({
        type: 'pushtoken',
        success: true,
      })
    }
  })
}

module.exports = { action, }
