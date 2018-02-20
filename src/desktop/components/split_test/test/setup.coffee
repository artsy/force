sinon = require 'sinon'
rewire = require 'rewire'

describe 'setup', ->
  before ->
    @setup = rewire '../setup'
    @setup.__set__ 'runningTests',
      header_design:
        key: 'header_design'
        outcomes: old: 0, new: 100
        edge: 'old'

      some_other_test:
        key: 'some_other_test'
        outcomes: old: 100, new: 0
        edge: 'new'

      local_test:
        key: 'local_test'
        outcomes: old: 100, new: 0
        scope: 'local'

  beforeEach ->
    @outcomeSpy = sinon.spy @setup.__get__('SplitTest')::, 'get'

  afterEach ->
    @outcomeSpy.restore()

  it 'sets up all existing tests by calling outcome on them', ->
    @setup()
    @outcomeSpy.callCount.should.equal 2
