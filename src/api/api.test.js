'use strict'
/* eslint-disable no-unused-expressions */

process.env.NODE_ENV = 'test'

const expect = require('chai').expect
const api = require('./index')

describe('Api', function () {
  it('should get api object', () => {
    expect(api).to.be.an('object')
  })
  it('api should contain some services', () => {
    expect(api).to.not.be.empty
  })
})
