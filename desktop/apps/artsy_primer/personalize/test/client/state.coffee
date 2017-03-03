_ = require 'underscore'
CurrentUser = require '../../../../../models/current_user'
PersonalizeState = require '../../client/state'

describe 'state', ->
  beforeEach ->
    @user = new CurrentUser
    @state = new PersonalizeState user: @user

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

      it 'doesnt skip when the price range is the default returned by the server', ->
        @user.set price_range: '-1:1000000000000'
        @state.completedSteps().should.be.empty

    it 'memoizes the value so that it is unaffected by user state modifications', ->
      @state.completedSteps().should.be.empty
      @user.set collector_level: 2
      @state.completedSteps().should.be.empty

  describe '#steps', ->
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
