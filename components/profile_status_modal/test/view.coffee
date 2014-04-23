benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
sd = require('sharify').data
mediator = require '../../../lib/mediator'

describe 'ProfileStatusModalView', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      $('body').html $ "<div id='fixture'></div>"
      @ProfileStatusModalView = require '../view'
      sinon.stub @ProfileStatusModalView.prototype, 'initialize'
      done()

  after ->
    benv.teardown()

  describe '#makePublic', ->

    beforeEach ->
      @close = sinon.stub @ProfileStatusModalView.prototype, 'close'
      @view = new @ProfileStatusModalView el: $('#fixture')
      @trigger = sinon.stub mediator, 'trigger'

    afterEach ->
      @close.restore()
      @trigger.restore()

    it 'triggers the profile:make:public event and close the modal after making public', ->
      @view.makePublic()
      @trigger.args[0][0].should.equal 'profile:make:public'
      @close.calledOnce.should.be.ok

    it 'closes the modal after canceling', ->
      @view.cancel()
      @close.calledOnce.should.be.ok
