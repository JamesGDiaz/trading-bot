'use strict'

const log = require('./logging')

/**
 * log current memory usage
 * @function
 */
const memory = () => {
  const totalAllocated = process.memoryUsage().rss
  const totalUsed = process.memoryUsage().heapUsed

  log.debug(
    `Memory allocated: ${Math.round((totalAllocated / 1024 / 1024) * 100) /
      100} MB`
  )
  log.debug(
    `Memory used: ${Math.round((totalUsed / 1024 / 1024) * 100) / 100} MB`
  )
}

module.exports = {
  memory
}
