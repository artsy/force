benv = require 'benv'
sinon = require 'sinon'

describe 'blurb', ->
  before (done) ->
    benv.setup ->
      benv.expose
        $: benv.require 'jquery'
      window.jQuery = $
      $.fn.imagesLoaded = (cb) -> cb()
      done()

  after ->
    benv.teardown()

  describe 'long text', ->
    beforeEach ->
      $('body').html "
        <div class='to-blurb' style='height: 400px'>A long text ...</div>
      "
      @$el = $('.to-blurb')

    it 'blurbifies the text', ->
      blurb = require '../index'
      blurb @$el, limit: 399, label: 'Read more by clicking here'
      @$el.css('max-height').should.equal '399px'
      @$el.hasClass('gradient-blurb').should.be.true()
      @$el.find('.gradient-blurb-read-more').should.have.lengthOf 1
      @$el.find('.gradient-blurb-read-more').text().should.equal 'Read more by clicking here'

  describe 'short text', ->
    beforeEach ->
      $('body').html "
        <div class='to-blurb' style='height: 200px'>A short text ...</div>
      "
      @$el = $('.to-blurb')

    it 'does not blurbify the text', ->
      blurb = require '../index'
      blurb @$el, limit: 399, label: 'Read more by clicking here'

      @$el.css('max-height').should.equal ''
      @$el.hasClass('gradient-blurb').should.be.false()
      @$el.find('.gradient-blurb-read-more').should.have.lengthOf 0
