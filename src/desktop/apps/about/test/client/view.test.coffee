_ = require 'underscore'
benv = require 'benv'
rewire = require 'rewire'
sinon = require 'sinon'
Backbone = require 'backbone'
mediator = require '../../../../lib/mediator.coffee'

describe 'AboutView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      sinon.spy mediator, 'trigger'
      done()

  after ->
    mediator.trigger.restore()
    benv.teardown()

  beforeEach ->
    @AboutView = rewire '../../client/view'
    sinon.stub @AboutView::, 'initialize'
    @view = new @AboutView el: $('body')

  afterEach ->
    @view.initialize.restore()

  it '#signup opens auth modal', ->
    e = { preventDefault: sinon.stub() }
    @AboutView::signup(e)
    e.preventDefault.called.should.be.true()
    mediator.trigger.args[0][0].should.containEql 'open:auth'
    mediator.trigger.args[0][1].mode.should.containEql 'signup'
    mediator.trigger.args[0][1].copy.should.containEql 'Sign up to save artworks'
