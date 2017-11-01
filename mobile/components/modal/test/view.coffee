_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
path = require 'path'

describe 'ModalView', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      filename = path.resolve(__dirname, '../view.coffee')
      ModalView = benv.requireWithJadeify filename, ['template']

      @triggerSpy = sinon.stub()
      ModalView.__set__ 'mediator', on: sinon.stub()

      @view = new ModalView
        el: $('body')

      @view.remove = sinon.stub()
      sinon.stub(_, 'delay').callsFake (cb) -> cb()
      done()

  afterEach ->
    benv.teardown()

  describe '#fadeOut', ->

    it 'removes the view after is-fadeout is applied', (done) ->
      @view.fadeOut()

      @view.remove.called.should.equal true
      done()

