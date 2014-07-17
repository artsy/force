should = require 'should'
DateHelpers = require '../date_helpers'

describe 'DateHelpers', ->

  describe '#timespanInWords', ->

    it 'transforms UTC start and end dates into a readable string', ->
      DateHelpers.timespanInWords('2012-09-07T04:00:00+00:00', '2013-01-08T05:00:00+00:00').should.equal "Sep. 7th, 2012 &#x2013; Jan. 8th, 2013"
      DateHelpers.timespanInWords('2012-09-07T04:00:00+00:00', '2012-11-08T05:00:00+00:00').should.equal "Sep. 7th &#x2013; Nov. 8th 2012"
      DateHelpers.timespanInWords('2012-09-01T04:00:00+00:00', '2012-09-30T05:00:00+00:00').should.equal "Sep. 1st &#x2013; 30th 2012"

    it 'does not add a period to the month of May', ->
      DateHelpers.timespanInWords('2013-05-01T04:00:00+00:00', '2013-07-30T05:00:00+00:00').should.equal "May 1st &#x2013; Jul. 30th 2013"
      DateHelpers.timespanInWords('2013-03-01T04:00:00+00:00', '2013-05-30T05:00:00+00:00').should.equal "Mar. 1st &#x2013; May 30th 2013"
      DateHelpers.timespanInWords('2013-05-01T04:00:00+00:00', '2013-05-30T05:00:00+00:00').should.equal "May 1st &#x2013; 30th 2013"
