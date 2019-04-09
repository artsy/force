_ = require 'underscore'
Backbone = require 'backbone'
benv = require 'benv'
sinon = require 'sinon'
{ resolve } = require 'path'
FlashMessage = require '../index'

describe 'FlashMessage', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      $.support.transition = end: 'transitionend'
      $.fn.emulateTransitionEnd = -> @trigger $.support.transition.end
      @sandbox = sinon.sandbox.create()
      @startTimerStub = @sandbox.stub FlashMessage::, 'startTimer'
      benv.render resolve(__dirname, '../template.jade'), {}, =>
        done()

  afterEach ->
    @sandbox.restore()
    benv.teardown()

  describe '#initialize', ->
    it 'requires a message option', ->
      (-> new FlashMessage).should.throw 'You must pass a message option'

    it 'accepts the message option', ->
      flash = new FlashMessage message: 'A caesura'
      flash.message.should.equal 'A caesura'

    describe 'accepts the autoclose option', ->
      it 'can autoclose', ->
        flash = new FlashMessage message: 'A caesura', autoclose: true
        flash.startTimer.called.should.be.true()

      it 'can autoclose', ->
        flash = new FlashMessage message: 'A caesura', autoclose: false
        flash.startTimer.called.should.be.false()

    describe 'accepts a backdrop option', ->
      it 'defaults to true', (done) ->
        # `backdrop` defaults to true
        flash = new FlashMessage message: 'A caesura'
        _.defer ->
          flash.$el.hasClass('is-sans-backdrop').should.be.false()
          done()

      it 'may be false', (done) ->
        flash = new FlashMessage message: 'A caesura', backdrop: false
        _.defer ->
          flash.$el.hasClass('is-sans-backdrop').should.be.true()
          done()

  describe '#setup', ->
    beforeEach ->
      @flash = new FlashMessage message: 'Goodbye world.'

    it 'renders the flash message', ->
      $('#main-layout-flash').length.should.equal 1
      $('.fullscreen-flash-message').length.should.equal 1
      $('.fullscreen-flash-message').text().should.equal 'Goodbye world.'

    it 'takes over the el of an existing flash message and updates the message if a flash is already on screen', (done) ->
      @flash.$container.text().should.equal 'Goodbye world.'
      anotherFlash = new FlashMessage message: 'Hello world.'
      sinon.spy anotherFlash, 'update'
      _.defer =>
        anotherFlash.update.called.should.be.true()
        @flash.$container.text().should.equal 'Hello world.'
        done()

  describe '#close', ->
    beforeEach ->
      location.assign = sinon.stub()
      @flash = new FlashMessage message: 'Goodbye world.'

    it 'removes the flash message when clicked, leaving the container empty', (done) ->
      @flash.$el.on 'transitionend', ->
        _.defer ->
          $('body').html().should.equal '<div id="main-layout-flash"></div>'
          done()
      @flash.$el.click()

    it 'redirects if an href is present', (done) ->
      flash = new FlashMessage message: 'A caesura', href: '/something/else', autoclose: false
      @flash.$el.on 'transitionend', ->
        _.defer ->
          location.assign.args[0][0].should.equal '/something/else'
          done()
      @flash.$el.click()

    it 'accepts a callback', (done) ->
      flash = new FlashMessage message: 'A caesura', autoclose: false
      @flash.close ->
        true.should.be.true()
        done()

  describe '#update', ->
    beforeEach ->
      @flash = new FlashMessage message: 'Goodbye world.'

    it 'updates the message', ->
      $('.fullscreen-flash-message').text().should.equal 'Goodbye world.'
      @flash.update 'Hello world.'
      $('.fullscreen-flash-message').text().should.equal 'Hello world.'

  describe 'XSS', ->
    it 'escapes HTML', ->
      flash = new FlashMessage message: '><img src=x onerror=alert("PWN")>'
      $('body').text().should.equal '><img src=x onerror=alert("PWN")>'

    it 'allows for HTML when passed the `safe: false` option', ->
      flash = new FlashMessage safe: false, message: '<strong>I <em>am</em> strong</strong>'
      $('body').text().should.equal 'I am strong'

  describe '#open', ->
    it 'checks to see if the container is empty before starting the timer', ->
      firstFlash = new FlashMessage message: 'Goodbye world.'
      $('body').text().should.equal 'Goodbye world.'
      @startTimerStub.restore()
      @startTimerStub = @sandbox.stub FlashMessage::, 'startTimer'
      secondFlash = new FlashMessage message: 'A caesura', autoclose: true
      secondFlash.startTimer.called.should.be.false()
      $('body').text().should.equal 'Goodbye world.'

