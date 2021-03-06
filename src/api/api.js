const { log, } = require('../config')
const axios = require('axios').default
const config = require('../config/').config
const api = {}

const restClientCall = async (command, method = 'GET', params, data) => {
  return new Promise((resolve) => {
    try {
      axios({
        method,
        url: `http://${config.freqtradeHost}:${config.freqtradePort}/api/v1/` + command,
        auth: {
          username: config.username,
          password: config.password,
        },
        params,
        data,
      })
        .then((response) => {
          console.log(response.data)
          resolve(response.data)
        })
        .catch((error) => {
          log.error(error)
          resolve({
            ok: false,
            message:
              'There was an error while making the request. Please try again or check the logs',
          })
        })
    } catch (error) {
      log.error(error)
      return {
        ok: false,
        message:
          'There was an error while making the request. Please try again or check the logs',
      }
    }
  })
}

/**
 * ping
 */
api.ping = async (req, res, next) => {
  log.verbose('/api/ping requested')
  axios({
    url: 'http://127.0.0.1:8080/api/v1/ping',
  }).then((response) => {
    log.debug(response.data)
    res.send(response.data)
  })
}
/**
 * balance
  Get the account balance.
 */
api.balance = async (req, res, next) => {
  log.verbose('/api/balance requested')
  res.send(await restClientCall('balance', req.method))
}

/**
 * blacklist
 * Show the current blacklist.
 * :param add: List of coins to add (example: "BNB/BTC")
 */
api.blacklist = async (req, res, next) => {
  log.verbose('/api/blacklist requested')
  res.send(await restClientCall('blacklist', req.method))
}

/**
 * count
 * Displays number of trades used and available
 */
api.count = async (req, res, next) => {
  log.verbose('/api/count requested')
  res.send(await restClientCall('count', req.method))
}

/**
 * daily
 * Return the amount of open trades.
 */
api.daily = async (req, res, next) => {
  log.verbose('/api/daily requested')
  res.send(
    await restClientCall('daily', req.method, {
      timescale: req.query.timescale,
    })
  )
}

/**
 * edge
 * Return information about edge.
 */
api.edge = async (req, res, next) => {
  log.verbose('/api/edge requested')
  res.send(await restClientCall('edge', req.method))
}

/**
 * forcebuy
 * Buy an asset.
 * :param pair: Pair to buy (ETH/BTC)
 * :param price: Optional - price to buy
 */
api.forcebuy = async (req, res, next) => {
  log.verbose('/api/forcebuy requested')
  const { pair, price, } = req.body
  if (pair) {
    res.send(
      await restClientCall('forcebuy', req.method, null, { pair, price, })
    )
  } else {
    log.error('Bad request')
  }
  res.status(400).end()
}

/**
 * forcesell
 * Force-sell a trade.

        :param tradeid: Id of the trade (can be received via status command)
 */
api.forcesell = async (req, res, next) => {
  log.verbose('/api/forcesell requested')
  log.verbose(req.body.tradeId)
  if (req.body.tradeId !== undefined) {
    res.send(
      await restClientCall('forcesell', req.method, null, {
        tradeid: req.body.tradeId,
      })
    )
  } else {
    log.error('Bad request')
  }
  res.status(400).end()
}

/**
 * performance
 * Return the performance of the different coins.
 */
api.performance = async (req, res, next) => {
  log.verbose('/api/performance requested')
  res.send(await restClientCall('performance', req.method))
}

/**
 * profit
 * Return the profit summary.
 */
api.profit = async (req, res, next) => {
  log.verbose('/api/profit requested')
  res.send(await restClientCall('profit', req.method))
}

/**
 * reload_conf
 * Reload configuration.
 */
api.reload_conf = async (req, res, next) => {
  log.verbose('/api/reload_config requested')
  res.send(await restClientCall('reload_config', req.method))
}

/**
 * show_config
 * Returns part of the configuration, relevant for trading operations.
 */
api.show_config = async (req, res, next) => {
  log.verbose('/api/show_config requested')
  res.send(await restClientCall('show_config', req.method))
}

/**
 * start
 * Start the bot if it's in the stopped state.
 */
api.start = async (req, res, next) => {
  log.verbose('/api/start requested')
  res.send(await restClientCall('start', req.method))
}

/**
 * status
 * Get the status of open trades.
 */
api.status = async (req, res, next) => {
  log.verbose('/api/status requested')
  res.send(await restClientCall('status', req.method))
}

/**
 * stop
 * Stop the bot. Use 'start' to restart.
 */
api.stop = async (req, res, next) => {
  log.verbose('/api/stop requested')
  res.send(await restClientCall('stop', req.method))
}

/**
 * stopbuy
 * Stop buying (but handle sells gracefully). Use 'reload_conf' to reset.
 */
api.stopbuy = async (req, res, next) => {
  log.verbose('/api/stopbuy requested')
  res.send(await restClientCall('stopbuy', req.method))
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
