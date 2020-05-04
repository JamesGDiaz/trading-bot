const { log } = require('../config')
const { PythonShell } = require('python-shell')
const request = require('request')
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
      if (err) {
        log.error(err)
        resolve(err)
      } else {
        // results is an array consisting of messages collected during execution
        log.debug(results[0])
        resolve(JSON.parse(
          results[0].replace(/'/g, '"')
            .split('True').join('true')
            .split('False').join('false')
            .split('None').join('null')
        ))
      }
    })
  })
}

/**
 * ping
 */
api.ping = async (req, res, next) => {
  log.verbose('/api/ping requested')
  var options = {
    method: 'GET',
    url: 'http://127.0.0.1:8080/api/v1/ping'
  }
  request(options, function (error, response) {
    if (error) throw new Error(error)
    log.debug(response.body)
    res.send(response.body)
  })
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
api.blacklist = async (req, res, next) => {
  log.verbose('/api/blacklist requested')
  res.send(await restClientCall('blacklist'))
}

/**
 * count
 * Return the amount of open trades.
 */
api.count = async (req, res, next) => {
  log.verbose('/api/count requested')
  res.send(await restClientCall('count'))
}

/**
 * daily
 * Return the amount of open trades.
 */
api.daily = async (req, res, next) => {
  log.verbose('/api/daily requested')
  res.send(await restClientCall('daily'))
}

/**
 * edge
 * Return information about edge.
 */
api.edge = async (req, res, next) => {
  log.verbose('/api/edge requested')
  res.send(await restClientCall('edge'))
}

/**
 * forcebuy
 * Buy an asset.
 * :param pair: Pair to buy (ETH/BTC)
 * :param price: Optional - price to buy
 */
api.forcebuy = async (req, res, next) => {
  log.verbose('/api/forcebuy requested')
  res.send(await restClientCall('forcebuy'))
}

/**
 * forcesell
 * Force-sell a trade.

        :param tradeid: Id of the trade (can be received via status command)
 */
api.forcesell = async (req, res, next) => {
  log.verbose('/api/forcesell requested')
  res.send(await restClientCall('forcesell'))
}

/**
 * performance
 * Return the performance of the different coins.
 */
api.performance = async (req, res, next) => {
  log.verbose('/api/performance requested')
  res.send(await restClientCall('performance'))
}

/**
 * profit
 * Return the profit summary.
 */
api.profit = async (req, res, next) => {
  log.verbose('/api/profit requested')
  res.send(await restClientCall('profit'))
}

/**
 * reload_conf
 * Reload configuration.
 */
api.reload_conf = async (req, res, next) => {
  log.verbose('/api/reload_conf requested')
  res.send(await restClientCall('reload_conf'))
}

/**
 * show_config
 * Returns part of the configuration, relevant for trading operations.
 */
api.show_config = async (req, res, next) => {
  log.verbose('/api/show_config requested')
  res.send(await restClientCall('show_config'))
}

/**
 * start
 * Start the bot if it's in the stopped state.
 */
api.start = async (req, res, next) => {
  log.verbose('/api/start requested')
  res.send(await restClientCall('start'))
}

/**
 * status
 * Get the status of open trades.
 */
api.status = async (req, res, next) => {
  log.verbose('/api/status requested')
  res.send(await restClientCall('status'))
}

/**
 * stop
 * Stop the bot. Use 'start' to restart.
 */
api.stop = async (req, res, next) => {
  log.verbose('/api/stop requested')
  res.send(await restClientCall('stop'))
}

/**
 * stopbuy
 * Stop buying (but handle sells gracefully). Use 'reload_conf' to reset.
 */
api.stopbuy = async (req, res, next) => {
  log.verbose('/api/stopbuy requested')
  res.send(await restClientCall('stopbuy'))
}

/**
 *
 * trades
 * Return trades history.
 * :param limit: Limits trades to the X last trades. No limit to get all the trades.
 */
api.trades = async (req, res, next) => {
  log.verbose('/api/trades requested')
  res.send(await restClientCall('trades'))
}

/**
 * version
 * Return the version of the bot.
 */
api.version = async (req, res, next) => {
  log.verbose('/api/version requested')
  res.send(await await restClientCall('version'))
}

/**
 * whitelist
 * Show the current whitelist.
 */
api.whitelist = async (req, res, next) => {
  log.verbose('/api/whitelist requested')
  res.send(await restClientCall('whitelist'))
}

module.exports = api
