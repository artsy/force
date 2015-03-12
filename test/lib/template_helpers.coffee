{ buildBodyClass } = require '../../lib/template_helpers'

describe 'Helpers', ->
  describe '#buildBodyClass', ->
    it 'returns a body class given an empty object and base class', ->
      buildBodyClass({}, 'my-base-class').should.equal 'my-base-class'

    it 'returns a body class given a data object and base class', ->
      buildBodyClass({
        IGNORE: true, MICROSITE: true, EIGEN: false
      }, 'my-base-class').should.equal 'my-base-class is-microsite'

      buildBodyClass({
        IGNORE: true, MICROSITE: true, EIGEN: true
      }, 'my-base-class').should.equal 'my-base-class is-microsite body-eigen'

    it 'returns a body class given a data object', ->
      buildBodyClass({
        IGNORE: true, MICROSITE: true, EIGEN: true
      }).should.equal 'is-microsite body-eigen'
