_             = require 'underscore'
Backbone      = require 'backbone'
benv          = require 'benv'
sinon         = require 'sinon'
{ resolve }   = require 'path'
FlashMessage  = require '../index'
FlashMessage::startRemoveTimer = sinon.stub()

describe 'FlashMessage', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      $.support.transition = end: 'transitionend'
      $.fn.emulateTransitionEnd = -> @trigger $.support.transition.end
      benv.render resolve(__dirname, '../template.jade'), {}, =>
        done()

  afterEach ->
    benv.teardown()

  describe '#initialize', ->
    it 'requires a message option', ->
      (-> new FlashMessage).should.throw 'You must pass a message option'
    it 'accepts the message option', ->
      flash = new FlashMessage message: 'A caesura'
      flash.message.should.equal 'A caesura'
    describe 'accepts the autoclose option', ->
      beforeEach ->
        FlashMessage::startRemoveTimer = sinon.stub()
      it 'can autoclose', ->
        flash = new FlashMessage message: 'A caesura', autoclose: true
        flash.startRemoveTimer.called.should.be.true
      it 'can autoclose', ->
        flash = new FlashMessage message: 'A caesura', autoclose: false
        flash.startRemoveTimer.called.should.be.false

  describe '#setup', ->
    beforeEach ->
      @flash = new FlashMessage message: 'Goodbye world.'
    it 'renders the flash message', ->
      $('#main-layout-flash').length.should.equal 1
      $('.fullscreen-flash-message').length.should.equal 1
      $('.fullscreen-flash-message').text().should.equal 'Goodbye world.'

  describe '#close', ->
    beforeEach ->
      @flash = new FlashMessage message: 'Goodbye world.'
    it 'removes the flash message when clicked, leaving the container empty', (done) ->
      @flash.$el.on 'transitionend', =>
        _.defer ->
          $('body').html().should.equal '<div id="main-layout-flash"></div>'
          done()
      @flash.$el.click()

  describe '#update', ->
    beforeEach ->
      @flash = new FlashMessage message: 'Goodbye world.'
    it 'updates the message', ->
      $('.fullscreen-flash-message').text().should.equal 'Goodbye world.'
      @flash.update 'Hello world.'
      $('.fullscreen-flash-message').text().should.equal 'Hello world.'
