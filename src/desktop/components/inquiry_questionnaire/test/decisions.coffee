_ = require 'underscore'
rewire = require 'rewire'
CurrentUser = require '../../../models/current_user'
Artwork = require '../../../models/artwork'
State = require '../../branching_state'
map = null
benv = require 'benv'

describe 'decisions', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      map = require '../map'
      @Logger = rewire '../../logger'
      @Cookies = @Logger.__get__ 'Cookies'
      store = {}
      @Cookies.set = (name, value) -> store[name] = value
      @Cookies.get = (name) -> store[name]
      @logger = new @Logger 'map'

      @state = new State map
      @user = new CurrentUser # logged in user
      @artwork = new Artwork
      @state.inject
        user: @user
        state: @state
        artwork: @artwork
        logger: @logger
      done()

  afterEach ->
    benv.teardown()
    @logger.reset()

  describe 'has_completed_profile', ->
    it 'returns true when the user has met all relevant conditions, otherwise false', ->
      @state.decide('has_completed_profile').should.be.false()

      @user.isCollector().should.be.false()

      @logger.log 'commercial_interest'

      @state.decide('has_completed_profile').should.be.false()

      @user.set
        profession: 'Foo'
        location: existy: true
        phone: '555-555-5555'

      @state.decide('has_completed_profile').should.be.false()

      @user.set 'share_follows', false # Finally completed basic_info

      @state.decide('has_completed_profile').should.be.true()

  describe 'has_basic_info', ->
    it 'returns true when the user has all basic info false when some or all is missing', ->
      @state.decide('has_basic_info').should.be.false()

      @user.set
        profession: 'Foo'
        location: existy: true
        phone: '555-555-5555'
        share_follows: false

      @state.decide('has_basic_info').should.be.true()

      @user.unset 'share_follows'

      @state.decide('has_basic_info').should.be.false()
