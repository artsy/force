_ = require 'underscore'
rewire = require 'rewire'
CurrentUser = require '../../../models/current_user'
Artwork = require '../../../models/artwork'
State = require '../../branching_state'
map = null
benv = require 'benv'

describe 'map', ->
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

      @state.on 'next', (step) =>
        @logger.log step

      done()

  afterEach ->
    @logger.reset()
    @state.off 'next'

  describe 'logged in user', ->
    beforeEach ->
      @user.related().collectorProfile.set collector_level: 1 # 'Looking and learning' or default

    describe 'default (partner does not have pre-qualification on)', ->
      it 'follows the path to the end', ->
        @state.current().should.equal 'inquiry'
        @state.next().should.equal 'confirmation'

        @state.next().should.equal 'commercial_interest'
        @user.related().collectorProfile.set collector_level: 3 # 'Yes'
        @user.isCollector().should.be.true()

        @state.next().should.equal 'basic_info'
        @state.next().should.equal 'artists_in_collection'
        @state.next().should.equal 'galleries_you_work_with'
        @state.next().should.equal 'auction_houses_you_work_with'
        @state.next().should.equal 'fairs_you_attend'
        @state.next().should.equal 'institutional_affiliations'

        @state.next().should.equal 'done'
        @state.isEnd().should.be.true()

    describe 'the partner has turned on pre-qualification', ->
      beforeEach ->
        @artwork.related().partner.set 'pre_qualify', true

      describe 'a user that responseds "Not yet" to the commercial_interest step', ->
        it 'follows the path to the end', ->
          @state.current().should.equal 'commercial_interest'
          @user.related().collectorProfile.set collector_level: 2 # 'Not yet'
          @user.isCollector().should.be.false()

          @state.next().should.equal 'how_can_we_help'
          @state.set 'value', 'purchase' # 'I want to purchase this work'

          # Dispatch to basic_info + inquiry
          @state.next().should.equal 'basic_info'
          @state.next().should.equal 'inquiry'

          # No more steps, skips confirmation, move straight to `done`
          @state.next().should.equal 'done'
          @state.isEnd().should.be.true()

    describe 'the partner belongs to an auction', ->
      beforeEach ->
        @artwork.set 'is_in_auction', true

      describe 'starts with a specialist inquiry', ->
        it 'and ends after the specialist step', ->
          @state.current().should.equal 'specialist'
          @state.next().should.equal 'done'
          @state.isEnd().should.be.true()

    describe 'A user that has previously seen some steps', ->
      beforeEach ->
        @logger.log 'artists_in_collection'
        @logger.log 'auction_houses_you_work_with'

      it 'follows the path to the end', ->
        @state.current().should.equal 'inquiry'
        @state.next().should.equal 'confirmation'

        @state.next().should.equal 'commercial_interest'
        @user.related().collectorProfile.set collector_level: 3 # 'Yes'
        @user.isCollector().should.be.true()

        @state.next().should.equal 'basic_info'

        # Skips over `artists_in_collection`
        @state.next().should.equal 'galleries_you_work_with'
        # Skips over `auction_houses_you_work_with`
        @state.next().should.equal 'fairs_you_attend'
        @state.next().should.equal 'institutional_affiliations'

        @state.next().should.equal 'done'
        @state.isEnd().should.be.true()
