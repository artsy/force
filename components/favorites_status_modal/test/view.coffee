benv      = require 'benv'
sinon     = require 'sinon'
Backbone  = require 'backbone'
sd        = require('sharify').data
mediator  = require '../../../lib/mediator'
rewire    = require 'rewire'

describe 'FavoritesStatusModalView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      $('body').html $ "<div id='fixture'></div>"
      @FavoritesStatusModalView = rewire '../view'
      @FavoritesStatusModalView.__set__ 'readCookie', (@cookie = sinon.stub())
      sinon.stub @FavoritesStatusModalView::, 'initialize'
      done()

  after ->
    benv.teardown()

  describe '#makePublic', ->
    beforeEach ->
      @close = sinon.stub @FavoritesStatusModalView::, 'close'
      @view = new @FavoritesStatusModalView el: $('#fixture')
      @trigger = sinon.stub mediator, 'trigger'

    afterEach ->
      @close.restore()
      @trigger.restore()

    it 'triggers the favorites:make:public event and close the modal after making public', ->
      @view.makePublic()
      @trigger.args[0][0].should.equal 'favorites:make:public'
      @close.calledOnce.should.be.ok

    it 'closes the modal after canceling', ->
      @view.cancel()
      @close.calledOnce.should.be.ok

    describe 'cookie behavior', ->
      beforeEach ->
        @cookie.returns true
        sinon.stub @FavoritesStatusModalView::, 'remove'
        @FavoritesStatusModalView::initialize.restore()

      it 'if cancelled then the modal should not present itself again', ->
        @view = new @FavoritesStatusModalView el: $('#fixture')
        @FavoritesStatusModalView::remove.called.should.be.true
