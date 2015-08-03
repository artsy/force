rewire = require 'rewire'
CurrentUser = require '../../../models/current_user'
Artwork = require '../../../models/artwork'
State = require '../../branching_state'
map = require '../map'

describe 'map', ->
  beforeEach ->
    @Logger = rewire '../logger'
    @Cookies = @Logger.__get__ 'Cookies'
    store = {}
    @Cookies.set = (name, value) -> store[name] = value
    @Cookies.get = (name) -> store[name]
    @logger = new @Logger

    @state = new State map
    @user = new CurrentUser # logged in user
    @artwork = new Artwork
    @state.inject
      user: @user
      state: @state
      artwork: @artwork
      logger: @logger

  describe 'logged in user', ->
    describe 'default', ->
      it 'follows the path to the end', ->
        @user.set collector_level: 1
        @state.current().should.equal 'inquiry'
        @state.next().should.equal 'commercial_interest'
        @user.set collector_level: 3 # is_collector => true
        @state.next().should.equal 'basic_info'
        @state.next().should.equal 'artists_in_collection'
        @state.next().should.equal 'done'
        @state.isEnd().should.be.true()

    describe 'pre_qualify', ->
      beforeEach ->
        @artwork.related().partner.set 'pre_qualify', true

      it 'follows the path to the end', ->
        @user.set collector_level: 1
        @state.current().should.equal 'commercial_interest'
        @user.set collector_level: 2 # is_collector => false
        @state.next().should.equal 'how_can_we_help'
        @state.set 'value', 'purchase'
        @state.next().should.equal 'basic_info'
        @state.next().should.equal 'inquiry'
        @state.next().should.equal 'done'
        @state.isEnd().should.be.true()

    describe "I've… seen things... you people wouldn't believe.", ->
      beforeEach ->
        @logger.log 'artists_in_collection'

      it 'follows the path to the end', ->
        @user.set collector_level: 1
        @state.current().should.equal 'inquiry'
        @state.next().should.equal 'commercial_interest'
        @user.set collector_level: 3 # is_collector => true
        @state.next().should.equal 'basic_info'
        # Skips over `artists_in_collection`
        @state.next().should.equal 'done'
        @state.isEnd().should.be.true()
