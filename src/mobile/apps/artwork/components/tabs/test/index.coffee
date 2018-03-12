jade = require 'jade'
benv = require 'benv'
path = require 'path'
fs = require 'fs'
{ fabricate } = require 'antigravity'
{ resolve } = require 'path'

describe 'Artwork tabs templates', ->
  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    @artwork = fabricate 'artwork'
    @artwork.bibliography = "<p>Literature:  Plagens, Peter. &quot;The Sculpture of Peter Alexander.&quot; <em>Artforum</em> Oct. 1970: 48-51 for similar example from the same period illustrated.</p>↵"
    @artwork.provenance = "<p>Provenance:  Private Collection, Los Angeles, California (acquired directly from the artist, 1968)</p>↵"
    benv.render resolve(__dirname, '../templates/index.jade'), {
      artwork: @artwork
      sd: ARTWORK: @artwork
      asset: (->)
    }, =>
      @accordionFunction = require('../index.coffee')

      done()


  describe 'shows tab content when clicked', ->
    beforeEach ->
      @accordionFunction()

    xit 'expands the correct tab', ->
      $('.js-artwork-tab-link').filter("[data-id=bibliography]").click()
      $('.artwork-tab').filter("[data-id=bibliography]").css('display').should.equal('block')
      $('.js-artwork-item').filter("[data-id=bibliography]").hasClass('is-active').should.equal true
