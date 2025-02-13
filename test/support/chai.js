'use strict'

const edtf = require('../..')
const chai = require('chai')

const { Bitmask } = edtf
const { expect, Assertion } = chai

global.expect = expect

chai.use(function (_, utils) {

  Assertion.addProperty('date', function () {
    expect(utils.flag(this, 'object')).to.be.instanceof(Date)
  })

  Assertion.addProperty('edtf', function () {
    expect(utils.flag(this, 'object')).to.be.instanceof(edtf.Date)
  })

  function year(expected) {
    const date = utils.flag(this, 'object')
    expect(date.getUTCFullYear()).to.eql(expected)
  }

  function months(expected) {
    const date = utils.flag(this, 'object')
    expect(date.getUTCMonth()).to.eql(expected)
  }

  function days(expected) {
    const date = utils.flag(this, 'object')
    expect(date.getUTCDate()).to.eql(expected)
  }

  function minutes(expected) {
    const date = utils.flag(this, 'object')
    expect(date.getUTCMinutes()).to.eql(expected)
  }

  function hours(expected) {
    const date = utils.flag(this, 'object')
    expect(date.getUTCHours()).to.eql(expected)
  }

  function seconds(expected) {
    const date = utils.flag(this, 'object')
    expect(date.getUTCSeconds()).to.eql(expected)
  }

  function ms(expected) {
    const date = utils.flag(this, 'object')
    expect(date.getUTCMilliseconds()).to.eql(expected)
  }

  function time(expected) {
    const date = utils.flag(this, 'object')
    expect(date.getUTCTime()).to.eql(expected)
  }

  function ymd(expected) {
    const date = utils.flag(this, 'object')
    expect(date.getUTCFullYear()).to.eql(expected[0])
    expect(date.getUTCMonth()).to.eql(expected[1])
    expect(date.getUTCDate()).to.eql(expected[2])
  }

  function hms(expected) {
    const date = utils.flag(this, 'object')
    expect(date.getUTCHours()).to.eql(expected[0])
    expect(date.getUTCMinutes()).to.eql(expected[1])
    expect(date.getUTCSeconds()).to.eql(expected[2])
  }

  function bitmask(name, negate = false) {
    return function (expected = true) {
      let obj = utils.flag(this, 'object')
      let neg = negate ^ utils.flag(this, 'negate')

      if (neg) {
        if (Object.prototype.hasOwnProperty.call(obj, name))
          expect(Bitmask.test(obj[name], expected)).to.eql(0)

      } else {
        expect(obj).to.have.property(name)
        expect(Bitmask.test(obj[name], expected)).to.be.above(0)
      }
    }
  }

  Assertion.addChainableMethod('year', year)
  Assertion.addChainableMethod('years', year)

  Assertion.addChainableMethod('month', months)
  Assertion.addChainableMethod('months', months)

  Assertion.addChainableMethod('day', days)
  Assertion.addChainableMethod('days', days)

  Assertion.addChainableMethod('hour', hours)
  Assertion.addChainableMethod('hours', hours)

  Assertion.addChainableMethod('minute', minutes)
  Assertion.addChainableMethod('minutes', minutes)

  Assertion.addChainableMethod('second', seconds)
  Assertion.addChainableMethod('seconds', seconds)

  Assertion.addChainableMethod('ms', ms)
  Assertion.addChainableMethod('milliseconds', ms)

  Assertion.addChainableMethod('time', time)
  Assertion.addChainableMethod('ymd', ymd)
  Assertion.addChainableMethod('hms', hms)

  Assertion.addChainableMethod('produce', function (expected) {
    expect(utils.flag(this, 'object'))
      .to.have.property('values').and.eql(expected)
  })

  Assertion.addChainableMethod('from', function (expected) {
    expect(utils.flag(this, 'object'))
      .to.have.nested.property('values[0].values').and.eql(expected)
  })

  Assertion.addChainableMethod('through', function (expected) {
    expect(utils.flag(this, 'object'))
      .to.have.nested.property('values[1].values').and.eql(expected)
  })

  Assertion.addProperty('rejected', function () {
    expect(utils.flag(this, 'object'))
      .to.throw(/(invalid syntax)|(no possible parsings)/i)
  })

  Assertion.addChainableMethod('uncertain', bitmask('uncertain'))
  Assertion.addChainableMethod('certain', bitmask('uncertain', true))
  Assertion.addChainableMethod('approximate', bitmask('approximate'))
  Assertion.addChainableMethod('precise', bitmask('approximate', true))
  Assertion.addChainableMethod('unspecified', bitmask('unspecified'))
  Assertion.addChainableMethod('specified', bitmask('unspecified', true))

  Assertion.addChainableMethod('level', function (expected) {
    expect(utils.flag(this, 'object'))
      .to.have.property('level', expected)
  })

  Assertion.addChainableMethod('type', function (expected) {
    expect(utils.flag(this, 'object'))
      .to.have.property('type', expected)
  })

  Assertion.addProperty('season', function () {
    expect(utils.flag(this, 'object')).to.have.type('Season')
  })

  Assertion.addProperty('century', function () {
    expect(utils.flag(this, 'object')).to.have.type('Century')
  })

  Assertion.addProperty('decade', function () {
    expect(utils.flag(this, 'object')).to.have.type('Decade')
  })

  Assertion.addProperty('interval', function () {
    expect(utils.flag(this, 'object')).to.have.type('Interval')
  })

  Assertion.addProperty('list', function () {
    expect(utils.flag(this, 'object')).to.have.type('List')
  })

  Assertion.addProperty('set', function () {
    expect(utils.flag(this, 'object')).to.have.type('Set')
  })
})
