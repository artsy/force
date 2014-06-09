should      = require 'should'
String = require '../string'

describe 'String', ->

  describe '#parameterize', ->

    results =
      'New York': 'new-york'
      ' Needs Trimming  ': 'needs-trimming'

    for from, to of results
      it "transforms #{from} into #{to}", ->
        String.parameterize(from).should.equal to
