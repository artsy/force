State = require '../../client/models/state'

describe 'State', ->
  before ->
    @state = new State

  describe '#value', ->
    it 'returns the initial value for type', ->
      @state.value('type').should.equal 'Other'

    it 'returns the appropriate value depending on the current mode', ->
      @state.set 'mode', 'gallery'
      @state.value('type').should.equal 'Gallery'

