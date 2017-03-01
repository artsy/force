_ = require 'underscore'
CurrentUser = require '../../../../../models/current_user'
PersonalizeState = require '../../../client/state'

describe 'state', ->
  beforeEach ->
    @user = new CurrentUser
    @state = new PersonalizeState user: @user

  it 'has a default current_step', ->
    @state.get('current_step').should.equal 'collect'

  it 'has the appropriate set of steps for the appropriate level', ->
    @state.steps().should.eql @state.get('__steps__')[@state.stepKey()]

  describe '#stepKey', ->
    it 'returns the correct key', ->
      @state.set current_level: 2, reonboarding: true
      @state.stepKey().should.equal 'existing_2'
      @state.set current_level: 1, reonboarding: false
      @state.stepKey().should.equal 'new_1'
      @state.set current_level: 3
      @state.unset 'reonboarding'
      @state.stepKey().should.equal 'new_3'

  describe '#completedSteps', ->
    describe 'returns an array of steps that have already been completed', ->
      beforeEach ->
        # Kill memoization
        @state.__completedSteps__ = null

      it 'is empty by default', ->
        @state.completedSteps().should.be.empty

      it 'handles a user who has a collector_level set above the default', ->
        @user.set collector_level: 2
        @state.completedSteps().should.eql ['collect']

      it 'handles a user who has a price range already set', ->
        @user.set price_range: 'existy'
        @state.completedSteps().should.eql ['price_range']

      it 'doesnt skip when the price range is the default returned by the server', ->
        @user.set price_range: '-1:1000000000000'
        @state.completedSteps().should.be.empty

      it 'handles some combination of completed steps', ->
        @user.set collector_level: 2
        @state.completedSteps().should.eql ['collect']

    it 'memoizes the value so that it is unaffected by user state modifications', ->
      @state.completedSteps().should.be.empty
      @user.set collector_level: 2
      @state.completedSteps().should.be.empty

  describe '#steps', ->
    it 'reflects the actual state of the steps the casual user needs to complete on initialization', ->
      @state.set current_level: 1
      @state.steps().should.eql @state.get('__steps__')['new_1']

    it 'reflects the actual state of the steps the collector user needs to complete on initialization', ->
      @state.set current_level: 2
      @state.steps().should.eql @state.get('__steps__')['new_2']

    it 'reflects the actual state of the steps the collector user who has a semi-complete profile needs to complete on initialization', ->
      @state.__completedSteps__ = null
      @state.set current_level: 2
      @user.set collector_level: 2
      @state.steps().should.eql _.without(@state.get('__steps__')['new_2'], 'collect')

  describe '#currentStepIndex', ->
    it 'returns the appropriate index', ->
      @state.currentStepIndex().should.equal 0
      @state.next()
      @state.currentStepIndex().should.equal 1

  describe '#currentStepLabel', ->
    it 'humanizes and capitalizes the step name', ->
      @state.set current_step: 'price_range'
      @state.currentStepLabel().should.equal 'Price Range'
      @state.set current_step: 'artists'
      @state.currentStepLabel().should.equal 'Artists'

  describe '#stepDisplay', ->
    it 'displays a human readable step count', ->
      @state.stepDisplay().should.equal "Step 1 of #{@state.steps().length}"
      @state.next()
      @state.stepDisplay().should.equal "Step 2 of #{@state.steps().length}"

  describe '#almostDone', ->
    it 'lets you know if you are on the last step', ->
      @state.almostDone().should.not.be.ok()
      last_step = _.last @state.steps()
      @state.set current_step: last_step
      @state.almostDone().should.be.ok()

  describe '#next', ->
    beforeEach ->
      @last_step = _.last @state.steps()
      @state.set current_step: @last_step

    it 'should not be able to step past the last step', ->
      @state.next()
      @state.get('current_step').should.equal @last_step

    it 'triggers done', (done) ->
      @state.on 'done', done
      @state.next()
      @state.off 'done'

  describe 'can be driven through all the state transitions depending on the user level', ->
    describe 'new users', ->
      it 'works for a user that is just looking and learning (level 1)', (done) ->
        state = new PersonalizeState user: @user, current_level: 1
        state.on 'done', -> done()
        state.get('current_step').should.equal 'collect'
        state.next()
        state.get('current_step').should.equal 'categories'
        state.next()
        state.get('current_step').should.equal 'favorites'
        state.next()
        state.get('current_step').should.equal 'artists'
        state.next() # Done

      it 'works for a user that is interested in starting to buy art (level 2)', (done) ->
        state = new PersonalizeState user: @user, current_level: 2
        state.on 'done', -> done()
        state.get('current_step').should.equal 'collect'
        state.next()
        state.get('current_step').should.equal 'price_range'
        state.next()
        state.get('current_step').should.equal 'categories'
        state.next()
        state.get('current_step').should.equal 'favorites'
        state.next()
        state.get('current_step').should.equal 'artists'
        state.next() # Done

      it 'works for a user that buys art (level 3)', (done) ->
        state = new PersonalizeState user: @user, current_level: 3
        state.on 'done', -> done()
        state.get('current_step').should.equal 'collect'
        state.next()
        state.get('current_step').should.equal 'price_range'
        state.next()
        state.get('current_step').should.equal 'bookmarks'
        state.next()
        state.get('current_step').should.equal 'artists'
        state.next() # Done

    describe 'existing users (reonboarding)', ->
      it 'works for a user that is just looking and learning (level 1)', (done) ->
        state = new PersonalizeState user: @user, current_level: 1, reonboarding: true
        state.on 'done', -> done()
        state.get('current_step').should.equal 'collect'
        state.next()
        state.get('current_step').should.equal 'categories'
        state.next()
        state.get('current_step').should.equal 'favorites'
        state.next()
        state.get('current_step').should.equal 'artists'
        state.next() # Done

      it 'works for a user that is interested in starting to buy art (level 2)', (done) ->
        state = new PersonalizeState user: @user, current_level: 2, reonboarding: true
        state.on 'done', -> done()
        state.get('current_step').should.equal 'collect'
        state.next()
        state.get('current_step').should.equal 'price_range'
        state.next()
        state.get('current_step').should.equal 'categories'
        state.next()
        state.get('current_step').should.equal 'favorites'
        state.next()
        state.get('current_step').should.equal 'artists'
        state.next() # Done

      it 'works for a user that buys art (level 3)', (done) ->
        state = new PersonalizeState user: @user, current_level: 3, reonboarding: true
        state.on 'done', -> done()
        state.get('current_step').should.equal 'collect'
        state.next()
        state.get('current_step').should.equal 'price_range'
        state.next()
        state.get('current_step').should.equal 'bookmarks'
        state.next()
        state.get('current_step').should.equal 'artists'
        state.next() # Done
