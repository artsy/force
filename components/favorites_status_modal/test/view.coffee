benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
sd = require('sharify').data
mediator = require '../../../lib/mediator'

describe 'FavoritesStatusModalView', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      $('body').html $ "<div id='fixture'></div>"
      @FavoritesStatusModalView = require '../view'
      sinon.stub @FavoritesStatusModalView.prototype, 'initialize'
      done()

  after ->
    benv.teardown()

  describe '#makePublic', ->

    beforeEach ->
      @close = sinon.stub @FavoritesStatusModalView.prototype, 'close'
      @view = new @FavoritesStatusModalView el: $('#fixture')

    afterEach ->
      @close.restore()

    it 'triggers the favorites:make:public event and close the modal after making public', ->
      @trigger = sinon.stub mediator, 'trigger'
      @view.makePublic()
      @trigger.args[0][0].should.equal 'favorites:make:public'
      @close.calledOnce.should.be.ok

    it 'closes the modal after canceling', ->
      @view.cancel()
      @close.calledOnce.should.be.ok
