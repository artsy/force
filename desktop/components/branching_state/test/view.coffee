benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
State = require '../index'
StateView = require '../view'

describe 'StateView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @FirstView = class FirstView extends Backbone.View
    @SecondView = class SecondView extends Backbone.View
    @ThirdView = class ThirdView extends Backbone.View

    for view in @views = [FirstView, SecondView, ThirdView]
      sinon.stub(view::, 'render').callsFake -> this
      sinon.stub view::, 'remove'

    @state = new State steps: ['first', 'second', 'noview', 'third']

    @stateView = new StateView
      state: @state
      views:
        first: FirstView
        second: SecondView
        third: ThirdView

  afterEach ->
    for view in @views
      view::render.restore()
      view::remove.restore()

  it 'constructs and tearsdown views following the path determined by the state object', ->
    @stateView.render()

    @stateView.view.constructor.name.should.equal 'FirstView'
    @FirstView::remove.called.should.be.false()
    @FirstView::render.called.should.be.true()

    @state.next()

    @stateView.view.constructor.name.should.equal 'SecondView'
    @FirstView::remove.called.should.be.true()
    @SecondView::remove.called.should.be.false()
    @SecondView::render.called.should.be.true()

    # It also works on steps without views
    @state.on 'next', (step) =>
      if step is 'noview'
        step.should.equal 'noview'
        @state.next()

    @state.next()

    @stateView.view.constructor.name.should.equal 'ThirdView'
    @SecondView::remove.called.should.be.true()
    @ThirdView::remove.called.should.be.false()
    @ThirdView::render.called.should.be.true()

    @state.next()

    # No where to go, re-renders the ThirdView
    @stateView.view.constructor.name.should.equal 'ThirdView'
    @ThirdView::remove.called.should.be.true()
    @ThirdView::render.called.should.be.true()
