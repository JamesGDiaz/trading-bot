'use strict'

process.env.NODE_ENV = 'test'

const expect = require('chai').expect
const { redisClient } = require('./index')

describe('redisClient', () => {
  it('should get redis object', () => {
    expect(redisClient).to.be.an('object')
  })
})
