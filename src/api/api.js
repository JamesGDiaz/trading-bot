// const { log } = require('../config')
// const request = require('request')
// const config = require('../config/').config
const api = {}

api.test = (req, res, next) => {
  res.json({ message: 'Hello World!' })
}

module.exports = api
