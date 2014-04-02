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
      view = new FlashMessage message: 'A caesura'
      view.message.should.equal 'A caesura'

  describe '#setup', ->
    beforeEach ->
      @view = new FlashMessage message: 'Goodbye world.'
    it 'renders the flash message', ->
      $('#main-layout-flash').length.should.equal 1
      $('.fullscreen-flash-message').length.should.equal 1
      $('.fullscreen-flash-message').text().should.equal 'Goodbye world.'

  describe '#close', ->
    beforeEach ->
      @view = new FlashMessage message: 'Goodbye world.'
    it 'removes the flash message when clicked, leaving the container empty', (done) ->
      @view.$el.on 'transitionend', =>
        _.defer ->
          $('body').html().should.equal '<div id="main-layout-flash"></div>'
          done()
      @view.$el.click()
