/* eslint-env mocha */

const assert = require('assert')
const sinon = require('sinon')
const subject = require('../../lib/alerting')

describe('Alerting', function () {
  beforeEach(() => {
    this.clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    this.clock.restore()
  })

  it('should remove timestamps older than thresholdInterval', () => {
    this.clock.tick(62 * 1000)

    const { updatedRequestTimestamps } = subject({
      wasAlerting: true,
      requestTimestamps: [1000, 2000, 10000],
      thresholdInterval: 1,
      thresholdCount: 10
    })

    assert.deepEqual(updatedRequestTimestamps, [2000, 10000])
  })

  it('should alert if the request count goes above threshold', () => {
    const { shouldAlert, updatedRequestTimestamps } = subject({
      wasAlerting: false,
      requestTimestamps: [1000, 2000],
      thresholdInterval: 1,
      thresholdCount: 1
    })

    assert.equal(shouldAlert, true)
    assert.deepEqual(updatedRequestTimestamps, [1000, 2000])
  })

  it('should clear the alert if the request count drops below threshold', () => {
    const { shouldAlert } = subject({
      wasAlerting: true,
      requestTimestamps: [],
      thresholdInterval: 1,
      thresholdCount: 10
    })

    assert.equal(shouldAlert, false)
  })
})
