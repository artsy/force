_ = require 'underscore'
PersonalizeState = require '../../client/personalize_state'
fabricate = require '../../../../test/helpers/fabricate'

describe 'PersonalizeState', ->
  beforeEach ->
    @personalizeState = new PersonalizeState fabricate 'personalize_state'

  describe '#setStep', ->
    it 'should have a default current_step', ->
      @personalizeState.get('current_step').should.equal 'collect'

    it 'should set the current_step', ->
      next_step = 'location'
      @personalizeState.setStep(next_step)
      @personalizeState.get('current_step').should.equal next_step

    it 'should set the current_level', ->
      level = 'Yes, I buy art'
      @personalizeState.setLevel(level)
      @personalizeState.get('current_level').should.equal level

    it 'should have the appropriate set of steps for the appropriate track', ->
      @personalizeState.get('steps').should.equal @personalizeState.get('_steps')[@personalizeState.get('track')]

    it 'should not be able to step past the last step', ->
      last_step = _.last @personalizeState.get('steps')
      @personalizeState.setStep last_step
      @personalizeState.next()
      @personalizeState.get('current_step').should.equal last_step
