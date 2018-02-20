benv = require 'benv'
blurb = require '../index'
sinon = require 'sinon'

describe 'blurb', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      $.fn.imagesLoaded = (cb) -> cb()
      done()

  after ->
    benv.teardown()

  beforeEach ->
    $('body').html "
      <div class='to-blurb' style='height: 400px'>A short text ...</div>
    "
    @$el = $('.to-blurb')

  describe 'long text', ->

    it 'blurbifies the text if height is greater than limit', ->
      blurb @$el, limit: 399, label: 'Read more by clicking here'
      @$el.css('max-height').should.equal '399px'
      @$el.hasClass('gradient-blurb').should.be.true()
      @$el.find('.gradient-blurb-read-more').should.have.lengthOf 1
      @$el.find('.gradient-blurb-read-more').text().trim().should.equal 'Read more by clicking here'

  describe 'short text', ->

    it 'does not blurbify the text if height is not greater than limit', ->
      blurb @$el, limit: 401, label: 'Read more by clicking here'
      @$el.css('max-height').should.equal ''
      @$el.hasClass('gradient-blurb').should.be.false()
      @$el.find('.gradient-blurb-read-more').should.have.lengthOf 0

  describe 'with an offset window specified', ->

    it 'blurbifies the text if height is greater than limit and offset window', ->
      blurb @$el, limit: 389, label: 'Read more by clicking here', heightBreakOffset: 10
      @$el.css('max-height').should.equal '389px'
      @$el.hasClass('gradient-blurb').should.be.true()
      @$el.find('.gradient-blurb-read-more').should.have.lengthOf 1
      @$el.find('.gradient-blurb-read-more').text().trim().should.equal 'Read more by clicking here'

    it 'does not blurbify text if height is not greater than limit and offset window', ->
      blurb @$el, limit: 399, label: 'Read more by clicking here', heightBreakOffset: 10
      @$el.css('max-height').should.equal ''
      @$el.hasClass('gradient-blurb').should.be.false()
      @$el.find('.gradient-blurb-read-more').should.have.lengthOf 0

  describe 'gradient', ->

    it 'renders a gradient by default', ->
      blurb @$el
      @$el.hasClass('mask-gradient').should.be.true()
      @$el.hasClass('mask-block').should.be.false()

    it 'does not render a gradient', ->
      blurb @$el, showGradient: false
      @$el.hasClass('mask-gradient').should.be.false()
      @$el.hasClass('mask-block').should.be.true()

  describe 'default button', ->

    it 'renders a default button if options.$button is not provided', ->
      blurb @$el
      @$el.hasClass('gradient-blurb').should.be.true()
      @$el.find('.gradient-blurb-read-more').text().trim().should.equal 'Read More'

  describe 'custom button', ->

    it 'renders a custom button if options.$button is provided', ->
      $button = $("""
        <div class='custom-container'>
          <a class='custom-button' href='#'>
            Expand
          </a>
        </div>
      """
      )

      blurb @$el,
        $button: $button

      @$el.find('.custom-button').text().trim().should.equal 'Expand'
