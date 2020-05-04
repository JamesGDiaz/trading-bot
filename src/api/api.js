const { log } = require('../config')
const { PythonShell } = require('python-shell')
// const request = require('request')
// const config = require('../config/').config
const api = {}

const restClientCall = async (command, args = []) => {
  const options = {
    mode: 'text',
    pythonPath: '/usr/bin/python3',
    pythonOptions: ['-u'], // get print results in real-time
    args: [command, ...args]
  }
  return new Promise(resolve => {
    PythonShell.run('./src/api/rest_client.py', options, function (err, results) {
      if (err) log.error(err)
      // results is an array consisting of messages collected during execution
      console.log('Results : %j', results)
      resolve(results)
    })
  })
}

/**
 * ping
 */
api.ping = async (req, res, next) => {
  log.verbose('/api/ping requested')
  res.json({ status: 'pong' })
}
/**
 * balance
  Get the account balance.
 */
api.balance = async (req, res, next) => {
  log.verbose('/api/balance requested')
  res.send(await restClientCall('balance'))
}

/**
 * blacklist
 * Show the current blacklist.
 * :param add: List of coins to add (example: "BNB/BTC")
 */
api.blacklist = (req, res, next) => {
  log.verbose('/api/blacklist requested')
  res.status(200).end()
}

/**
 * count
 * Return the amount of open trades.
 */
api.count = (req, res, next) => {
  log.verbose('/api/count requested')
  restClientCall('count')
  res.status(200).end()
}

/**
 * daily
 * Return the amount of open trades.
 */
api.daily = (req, res, next) => {
  log.verbose('/api/daily requested')
  restClientCall('daily')
  res.status(200).end()
}

/**
 * edge
 * Return information about edge.
 */
api.edge = (req, res, next) => {
  log.verbose('/api/edge requested')
  restClientCall('edge')
  res.status(200).end()
}

/**
 * forcebuy
 * Buy an asset.
 * :param pair: Pair to buy (ETH/BTC)
 * :param price: Optional - price to buy
 */
api.forcebuy = (req, res, next) => {
  log.verbose('/api/forcebuy requested')
  restClientCall('forcebuy')
  res.status(200).end()
}

/**
 * forcesell
 * Force-sell a trade.

        :param tradeid: Id of the trade (can be received via status command)
 */
api.forcesell = (req, res, next) => {
  log.verbose('/api/forcesell requested')
  restClientCall('forcesell')
  res.status(200).end()
}

/**
 * performance
 * Return the performance of the different coins.
 */
api.performance = (req, res, next) => {
  log.verbose('/api/performance requested')
  restClientCall('performance')
  res.status(200).end()
}

/**
 * profit
 * Return the profit summary.
 */
api.profit = (req, res, next) => {
  log.verbose('/api/profit requested')
  restClientCall('profit')
  res.status(200).end()
}

/**
 * reload_conf
 * Reload configuration.
 */
api.reload_conf = (req, res, next) => {
  log.verbose('/api/reload_conf requested')
  restClientCall('reload_conf')
  res.status(200).end()
}

/**
 * show_config
 * Returns part of the configuration, relevant for trading operations.
 */
api.show_config = (req, res, next) => {
  log.verbose('/api/show_config requested')
  restClientCall('show_config')
  res.status(200).end()
}

/**
 * start
 * Start the bot if it's in the stopped state.
 */
api.start = (req, res, next) => {
  log.verbose('/api/start requested')
  restClientCall('start')
  res.status(200).end()
}

/**
 * status
 * Get the status of open trades.
 */
api.status = (req, res, next) => {
  log.verbose('/api/status requested')
  restClientCall('status')
  res.status(200).end()
}

/**
 * stop
 * Stop the bot. Use 'start' to restart.
 */
api.stop = (req, res, next) => {
  log.verbose('/api/stop requested')
  restClientCall('stop')
  res.status(200).end()
}

/**
 * stopbuy
 * Stop buying (but handle sells gracefully). Use 'reload_conf' to reset.
 */
api.stopbuy = (req, res, next) => {
  log.verbose('/api/stopbuy requested')
  restClientCall('stopbuy')
  res.status(200).end()
}

/**
 *
 * trades
 * Return trades history.
 * :param limit: Limits trades to the X last trades. No limit to get all the trades.
 */
api.trades = (req, res, next) => {
  log.verbose('/api/trades requested')
  restClientCall('trades')
  res.status(200).end()
}

/**
 * version
 * Return the version of the bot.
 */
api.version = (req, res, next) => {
  log.verbose('/api/version requested')
  restClientCall('version')
  res.status(200).end()
}

/**
 * whitelist
 * Show the current whitelist.
 */
api.whitelist = (req, res, next) => {
  log.verbose('/api/whitelist requested')
  restClientCall('whitelist')
  res.status(200).end()
}

module.exports = api
