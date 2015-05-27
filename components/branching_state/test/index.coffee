Backbone = require 'backbone'
_ = require 'underscore'
State = require '../index'

describe 'State', ->
  describe 'single path', ->
    beforeEach ->
      @state = new State steps: [
        'first'
        'second'
        'third'
        'fourth'
      ]

    describe '#current', ->
      it 'returns the first step in the path', ->
        @state.current().should.equal 'first'

    describe '#next', ->
      it 'moves through the steps; stopping at the end', ->
        @state.next().should.equal 'second'
        @state.current().should.equal 'second'
        @state.next().should.equal 'third'
        @state.isEnd().should.be.false
        @state.next().should.equal 'fourth'
        @state.isEnd().should.be.true
        @state.next().should.equal 'fourth'

  describe 'complex path', ->
    beforeEach ->
      @state = new State
        predicates:
          first_decision: ->
            false
          second_decision: ->
            true
          dependent_decision: (dependency) ->
            dependency

        steps: [
          'first'
          'second'
          first_decision:
            true: ['true_first', 'true_second']
            false: [
              'false_first'
              second_decision:
                true: [
                  'false_true_first'
                  dependent_decision:
                    true: ['false_true_true_first']
                    false: ['false_true_false_first']
                ]
                false: ['false_false_first']
            ]
          'fourth'
        ]

    describe '#next', ->
      it 'moves through the states; making decisions and stopping at the end', ->
        @state.current().should.equal 'first'
        @state.next().should.equal 'second'
        @state.next().should.equal 'false_first' # Makes first_decision
        @state.next().should.equal 'false_true_first' # Makes second_decision
        # Inject dependencies at a later time
        @state.inject 'dependent_decision', false
        @state.get('predicates').dependent_decision().should.be.false
        @state.next().should.equal 'false_true_false_first' # Makes dependent_decision
