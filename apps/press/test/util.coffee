_ = require 'underscore'
{ transform } = require '../util'

items = [
  { year: '1999', month: 'March' }
  { year: '2010', month: 'January' }
  { year: '2010', month: 'February' }
  { year: '1999', month: 'November' }
  { year: '2005', month: 'January' }
  { year: '2010', month: 'December' }
]

describe 'util', ->
  describe '#transform', ->
    it 'takes in items and returns back a sorted (reverse chron) grouped hash according to month and year', ->
      transformed = transform items

      _2010 = _.first transformed
      _2010.year.should.equal '2010'
      _2010.months.should.have.lengthOf 3
      _.first(_2010.months).month.should.equal 'December'
      _.last(_2010.months).month.should.equal 'January'

      _1999 = _.last transformed
      _1999.year.should.equal '1999'
      _1999.months.should.have.lengthOf 2
      _.first(_1999.months).month.should.equal 'November'
      _.last(_1999.months).month.should.equal 'March'
