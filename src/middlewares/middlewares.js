const { config, log, } = require('../config')
const middlewares = {}

middlewares.verifyToken = (req, res, next) => {
  const xToken = req.header('x-token')
  if (xToken === config.xToken) {
    next()
  } else {
    log.info(`Unauthorized ${req.method} request for ${req.originalUrl} from ${req.ip}`)
    res.status(401).send('Unauthorized')
  }
}

module.exports = middlewares
