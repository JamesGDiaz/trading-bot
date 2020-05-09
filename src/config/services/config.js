'use strict'

const path = require('path')
let basePath = path.join(__dirname, '../../../')
const env = process.env.NODE_ENV
if (env === 'production') {
  basePath = './'
}
const envPath = path.join(basePath, `.env/${env}.config.env`)
const envConfig = require('dotenv').config({
  path: envPath,
})
if (envConfig.error) {
  throw envConfig.error
}

/**
 * Test config
 */
const test = {
  env,
  host: process.env.HOST,
  port: process.env.PORT,
  redisUrl: process.env.REDIS_URL,
  emailAddress: process.env.EMAIL_ADDRESS,
  emailPassword: process.env.EMAIL_PASS,
  xToken: process.env.XTOKEN,
}

/**
 * Development config
 */
const development = {
  env,
  host: process.env.HOST,
  port: process.env.PORT,
  redisUrl: process.env.REDIS_URL,
  emailAddress: process.env.EMAIL_ADDRESS,
  emailPassword: process.env.EMAIL_PASS,
  xToken: process.env.XTOKEN,
}
/**
 * Production config
 */
const production = {
  env,
  host: process.env.HOST,
  port: process.env.PORT,
  redisUrl: process.env.REDIS_URL,
  emailAddress: process.env.EMAIL_ADDRESS,
  emailPassword: process.env.EMAIL_PASS,
  xToken: process.env.XTOKEN,
}

const config = {
  test,
  development,
  production,
}

module.exports = config[env]
