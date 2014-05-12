_                 = require 'underscore'
PersonalizeState  = require '../../client/state.coffee'

describe 'state', ->
  beforeEach ->
    @state = new PersonalizeState

  it 'has a default current_step', ->
    @state.get('current_step').should.equal 'collect'

  it 'has the appropriate set of steps for the appropriate track', ->
    @state.get('steps').should.equal @state.get('_steps')[@state.get('track')]

  describe 'can be driven through all the state transitions depending on the user level', ->
    it 'works for a user that buys art (level 3)', (done) ->
      @state.on 'done', -> done()
      @state.setLevel 3
      @state.get('current_step').should.equal 'collect'
      @state.next()
      @state.get('current_step').should.equal 'categories'
      @state.next()
      @state.get('current_step').should.equal 'price_range'
      @state.next()
      @state.get('current_step').should.equal 'artists'
      @state.next()
      @state.get('current_step').should.equal 'location'
      @state.next()
      @state.get('current_step').should.equal 'galleries'
      @state.next()
      @state.get('current_step').should.equal 'institutions'
      @state.next() # Done

    it 'works for a user that is interested in starting to buy art (level 2)', (done) ->
      @state.on 'done', -> done()
      @state.setLevel 2
      @state.get('current_step').should.equal 'collect'
      @state.next()
      @state.get('current_step').should.equal 'categories'
      @state.next()
      @state.get('current_step').should.equal 'price_range'
      @state.next()
      @state.get('current_step').should.equal 'artists'
      @state.next()
      @state.get('current_step').should.equal 'location'
      @state.next()
      @state.get('current_step').should.equal 'galleries'
      @state.next()
      @state.get('current_step').should.equal 'institutions'
      @state.next() # Done

    it 'works for a user that is just looking and learning (level 1)', (done) ->
      @state.on 'done', -> done()
      @state.setLevel 1
      @state.get('current_step').should.equal 'collect'
      @state.next()
      @state.get('current_step').should.equal 'location'
      @state.next()
      @state.get('current_step').should.equal 'galleries'
      @state.next()
      @state.get('current_step').should.equal 'institutions'
      @state.next()
      @state.get('current_step').should.equal 'categories'
      @state.next()
      @state.get('current_step').should.equal 'artists'
      @state.next() # Done

  describe '#setStep', ->
    it 'sets the current_step', ->
      next_step = 'location'
      @state.setStep next_step
      @state.get('current_step').should.equal next_step

  describe '#setLevel', ->
    it 'sets the current_level', ->
      level = 'Yes, I buy art'
      @state.setLevel level
      @state.get('current_level').should.equal level

  describe '#chooseTrack', ->
    it 'returns casual for level 1—otherwise collector', ->
      @state.chooseTrack(1).should.equal 'casual'
      @state.chooseTrack(2).should.equal 'collector'
      @state.chooseTrack(3).should.equal 'collector'

  describe '#currentStepIndex', ->
    it 'returns the appropriate index', ->
      @state.currentStepIndex().should.equal 0
      @state.next()
      @state.currentStepIndex().should.equal 1

  describe '#currentStepLabel', ->
    it 'humanizes and capitalizes the step name', ->
      @state.setStep 'price_range'
      @state.currentStepLabel().should.equal 'Price Range'
      @state.setStep 'artists'
      @state.currentStepLabel().should.equal 'Artists'


  describe '#stepDisplay', ->
    it 'displays a human readable step count', ->
      @state.stepDisplay().should.equal "Step 0 of #{@state.get('steps').length - 1}"
      @state.next()
      @state.stepDisplay().should.equal "Step 1 of #{@state.get('steps').length - 1}"

  describe '#almostDone', ->
    it 'lets you know if you are on the last step', ->
      @state.almostDone().should.not.be.ok
      last_step = _.last @state.get('steps')
      @state.setStep last_step
      @state.almostDone().should.be.ok

  describe '#next', ->
    beforeEach ->
      @last_step = _.last @state.get('steps')
      @state.setStep @last_step

    it 'should not be able to step past the last step', ->
      @state.next()
      @state.get('current_step').should.equal @last_step

    it 'triggers done', (done) ->
      @state.on 'done', done
      @state.next()
      @state.off 'done'
