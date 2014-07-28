benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'

Artworks = require '../../../../collections/artworks'
Artwork = require '../../../../models/artwork'
Sale = require '../../../../models/sale'

describe 'SaleView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    sinon.stub(Backbone, 'sync')
    SaleView = benv.requireWithJadeify resolve(__dirname, '../../client/sale'), ['template', 'artworkColumnsTemplate']

    @artwork = new Artwork fabricate 'artwork'
    @sale = new Sale(fabricate 'sale')

    @sale.fetchArtworks = sinon.stub().yieldsTo 'success', new Backbone.Collection

    @view = new SaleView el: $('<div></div>'), sale: @sale, saved: {}
    done()

  afterEach ->
    Backbone.sync.restore()

  describe '#initialize', ->
    it 'sets up artworks on success', ->
      @view.artworks.constructor.name.should.equal 'Artworks'

  describe '#rendered', ->
    it 'has the correct title', ->
      text = @view.$('h2').text()
      text.should.containEql 'Works from'
      text.should.containEql 'Whitney Art Party'
    it 'has a container for the artwork columns', ->
      @view.$('#sale-artwork-columns').length.should.be.ok
    it 'links to the feature', ->
      @view.$('a').attr('href').should.equal '/feature/whtney-art-party'
    it 'renders sale artwork columns', ->
      saleArtwork = new Backbone.Model(fabricate 'sale_artwork')
      # A bug with the comparator means you can't add to this collection (FWIW)
      # So we reset it completely here
      @view.artworks = Artworks.fromSale [saleArtwork]
      artwork = @view.artworks.first()
      @view.render()

      # Various content assertions
      link = @view.$('.artwork-item-image-link')
      link.length.should.be.ok
      link.attr('href').should.equal artwork.href()

      @view.$('.artwork-item-blurb').text().should.equal artwork.get('saleArtwork').get('user_notes')
