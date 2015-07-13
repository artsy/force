_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
modalize = require '../index'

class SampleView extends Backbone.View
  render: ->
    @$el.html 'SampleView'
    this

describe 'modalize', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      $.support.transition = end: 'transitionend'
      $.fn.emulateTransitionEnd = -> @trigger $.support.transition.end
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @view = new SampleView
    @modal = modalize @view, dimensions: width: '456px'

  afterEach (done) ->
    @modal.close done

  describe '#open', ->
    it 'opens the modal', ->
      $('.modalize').should.have.lengthOf 0
      @modal.open()
      $('.modalize').should.have.lengthOf 1

    it 'sets the correct width', ->
      @modal.open()
      @modal.opened.should.be.true()
      $('.modalize-dialog').width().should.equal 456

    it 'avoids being double opened', ->
      $('.modalize').should.have.lengthOf 0
      @modal.open()
      $('.modalize').should.have.lengthOf 1
      @modal.open()
      @modal.open()
      @modal.open()
      $('.modalize').should.have.lengthOf 1

  describe '#close', ->
    it 'closes the modal', (done) ->
      $('.modalize').should.have.lengthOf 0
      @modal.open()
      $('.modalize').should.have.lengthOf 1
      @modal.close ->
        $('.modalize').should.have.lengthOf 0
        done()

  describe '#load', ->
    it 'sets the loading state; accepts a callback; removes the loading state when done', (specDone) ->
      @modal.load (modalDone) =>
        @modal.view.$el.hasClass('is-loading').should.be.true()
        modalDone()
        @modal.view.$el.hasClass('is-loading').should.be.false()
        specDone()

  describe 'behavior', ->
    beforeEach ->
      @modal.open()

    it 'renders the subView', ->
      $('body').html().should.containEql 'SampleView'

    it 'is able to be closed by clicking the close button', (done) ->
      $('.js-modalize-close').click()
      $('.modalize').should.have.lengthOf 1
      _.defer ->
        $('.modalize').should.have.lengthOf 0
        done()

    it 'is able to be closed by clicking the backdrop', (done) ->
      $('.js-modalize-backdrop').click()
      $('.modalize').should.have.lengthOf 1
      _.defer ->
        $('.modalize').should.have.lengthOf 0
        done()
