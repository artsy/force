_ = require 'underscore'
{ sortedNestedGroupByDate, sortedByDate } = require '../util'

describe 'util', ->
  describe '#sortedByDate', ->
    beforeEach ->
      items = [
        { year: '1999', month: 2, day: 1 }
        { year: '2010', month: 1, day: 1 }
        { year: '2010', month: 'February', day: 1 }
        { year: '1999', month: 'November', day: 1 }
        { year: '1999', month: 'March', day: 1 }
        { year: '2005', month: 0, day: 1 }
        { year: '2010', month: 'December', day: 1 }
        { year: '2005', month: 'January', day: 1 }
      ]

      @sorted = sortedByDate items

    it 'sets a correct timestamp for zero-indexed numeric months and named months', ->
      [a, b] = _.first @sorted, 2
      _.isUndefined(a.timestamp).should.be.false()
      a.timestamp.should.equal b.timestamp

    it 'sorts items correctly', ->
      _.map @sorted, _.partial _.pick, _, 'year', 'month', 'day'
        .should.eql [
          { year: '1999', month: 2, day: 1 }
          { year: '1999', month: 'March', day: 1 }
          { year: '1999', month: 'November', day: 1 }
          { year: '2005', month: 0, day: 1 }
          { year: '2005', month: 'January', day: 1 }
          { year: '2010', month: 1, day: 1 }
          { year: '2010', month: 'February', day: 1 }
          { year: '2010', month: 'December', day: 1 }
        ]

  describe '#sortedNestedGroupByDate', ->
    it 'takes in items and returns a sorted (reverse chron) grouped hash according to month and year', ->
      items = [
        { year: '1999', month: 'March', day: 2 }
        { year: '1999', month: 'March', day: 10 }
        { year: '1999', month: 'March', day: 1 }
        { year: '2010', month: 'January' }
        { year: '2010', month: 'February' }
        { year: '1999', month: 'November' }
        { year: '2005', month: 'January' }
        { year: '2010', month: 'December' }
      ]

      sortedGroups = sortedNestedGroupByDate items

      _2010 = _.first sortedGroups
      _2010.year.should.equal '2010'
      _2010.months.should.have.lengthOf 3
      _.first(_2010.months).month.should.equal 'December'
      _.last(_2010.months).month.should.equal 'January'

      _1999 = _.last sortedGroups
      _1999.year.should.equal '1999'
      _1999.months.should.have.lengthOf 2
      _.first(_1999.months).month.should.equal 'November'
      _.last(_1999.months).month.should.equal 'March'

      marches = _.last _1999.months
      _.first(marches.items).day.should.equal 1
      _.last(marches.items).day.should.equal 10
