_ = require 'underscore'
Backbone = require 'backbone'
State = require '../index'

describe 'State', ->
  describe 'context', ->
    it 'always includes a reference to itself', ->
      state = new State
      state.context.state.should.equal state

    describe '#inject', ->
      it 'lets you inject additions to the context at any point', ->
        state = new State
        state.inject foo: 'bar', bar: baz: 'foo'
        state.inject baz: 'qux'
        Object.keys state.context
          .should.eql [
            'state', 'foo', 'bar', 'baz'
          ]
        state.context.foo.should.equal 'bar'
        state.context.bar.should.eql baz: 'foo'
        state.context.baz.should.equal 'qux'

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
        @state.isEnd().should.be.false()
        @state.next().should.equal 'fourth'
        @state.isEnd().should.be.true()
        @state.next().should.equal 'fourth'

  describe 'complex path', ->
    beforeEach ->
      @state = new State
        decisions:
          first_decision: ->
            false
          second_decision: ->
            true
          dependent_decision: ({ some_dependency }) ->
            some_dependency

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
        @state.inject some_dependency: false
        @state.next().should.equal 'false_true_false_first' # Makes dependent_decision

        @state.next().should.equal 'fourth'

    describe '#position; #total', ->
      beforeEach ->
        @state = new State
          decisions:
            on: ->
              'and_on'

          steps: [
            'first'
            'second'
            on:
              and_on: [
                'third'
                'fourth'
              ]
          ]

      it 'keeps track of the position', ->
        @state.current().should.equal 'first'
        @state.position().should.equal 1
        # `total` can only be reliably displayed when on the terminal leaf of a step tree
        @state.total().should.equal 3
        @state.isEnd().should.be.false()

        @state.next().should.equal 'second'
        @state.position().should.equal 2
        @state.total().should.equal 3
        @state.isEnd().should.be.false()

        @state.next().should.equal 'third'
        @state.position().should.equal 3
        @state.total().should.equal 4
        @state.isEnd().should.be.false()

        @state.next().should.equal 'fourth'
        @state.position().should.equal 4
        @state.total().should.equal 4
        @state.isEnd().should.be.true()

  describe 'resumable paths', ->
    beforeEach ->
      @state = new State
        decisions:
          second: ->
            true

          fourth: ->
            false

          sub_fourth: ->
            true

        steps: [
          'first'
          second:
            true: ['second′']
          'third'
          fourth:
            false: [
              'fourth′'
              sub_fourth:
                true: ['fourth″']
            ]
          'fifth'
        ]

    it 'resumes the primary path after travelling down multiple sub-paths', ->
      @state.current().should.equal 'first'
      @state.isEnd().should.be.false()
      @state.next().should.equal 'second′'
      @state.isEnd().should.be.false()
      @state.next().should.equal 'third'
      @state.isEnd().should.be.false()
      @state.next().should.equal 'fourth′'
      @state.isEnd().should.be.false()
      @state.next().should.equal 'fourth″'
      @state.isEnd().should.be.false()
      @state.next().should.equal 'fifth'
      @state.isEnd().should.be.true()

  describe 'conditional steps', ->
    beforeEach ->
      @state = new State
        decisions:
          should_skip: ->
            true

          should_not_skip: ->
            true

        steps: [
          'first'
          { should_skip: false: ['skip_this_second'] }
          { should_not_skip: true: ['land_on_this_second'] }
          'third'
        ]

    it 'skips the second step', ->
      @state.current().should.equal 'first'
      @state.next().should.equal 'land_on_this_second'
      @state.next().should.equal 'third'
      @state.isEnd().should.be.true()
