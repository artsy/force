benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
path = require 'path'
Artworks = require '../../../collections/artworks.coffee'
FilterArtworks = require '../../../collections/filter_artworks.coffee'
Artists = require '../../../collections/artists.coffee'
Gene = require '../../../models/gene.coffee'
{ fabricate } = require '@artsy/antigravity'

xdescribe 'GeneArtworksView', ->
  # FIXME: conflicts with jsdom in beforeEach from filter2
  beforeEach (done) ->
    benv.setup =>
      # artworks = new Artworks [fabricate('artwork'), fabricate('artwork'), fabricate('artwork')]
      artworks = new FilterArtworks [fabricate('artwork'), fabricate('artwork'), fabricate('artwork')]
      # artworks.url = "/api/v1/filter/artworks?gene_id=foo"
      # artworks.parse = sinon.stub()
      gene = new Gene fabricate 'gene', { type: { name: 'medium' } }
      benv.render path.resolve(__dirname, '../templates/index.jade'),
        sd: { PARAMS: gene_id: gene.id }
        asset: (->)
        gene: gene
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      $.fn.error = sinon.stub()
      @e = new $.Event('click')
      sinon.stub Backbone, 'sync'
      filename = path.resolve(__dirname, '../client.coffee')
      { GeneArtworksView } = module = benv.requireWithJadeify filename, ['artworkColumnsTemplate']
      @PoliteInfiniteScrollView = module.__get__ 'PoliteInfiniteScrollView'
      @politeScroll = sinon.stub(@PoliteInfiniteScrollView.prototype, 'initialize')
      @view = new GeneArtworksView
        collection: artworks
        el: $ 'body'
        model: gene
        params: {}
      @view.params = {}
      done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()
    @politeScroll.restore()

  describe '#readMore', ->

    it 'initially covers text with fade', ->
      $('.gene-read-more-fade').css('display').should.not.containEql 'none'

    it 'shows rest of description on click', ->
      @view.readMore(@e)
      $('.gene-description-text').css('max-height').should.containEql 9999


describe 'GeneArtistsView', ->

  beforeEach (done) ->
    benv.setup =>
      artists = new Artists [ fabricate('artist'), fabricate('artist'), fabricate('artist') ]
      artists.url = "/api/v1/search/filtered/gene/foo"
      gene = new Gene fabricate 'gene'
      benv.expose { $: benv.require 'jquery' }
      $.fn.error = sinon.stub()
      Backbone.$ = $
      @e = new $.Event('click')
      benv.render path.resolve(__dirname, '../templates/index.jade'),
        sd: {}
        asset: (->)
        gene: gene
      sinon.stub Backbone, 'sync'
      filename = path.resolve(__dirname, '../client.coffee')
      { GeneArtistsView } = module = benv.requireWithJadeify filename, ['artistTemplate']
      @PoliteInfiniteScrollView = module.__get__ 'PoliteInfiniteScrollView'
      @politeScroll = sinon.stub(@PoliteInfiniteScrollView.prototype, 'initialize')
      @view = new GeneArtistsView
        collection: artists
        el: $ 'body'
        model: gene
        params: {}
      @view.params = {}
      done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()
    @politeScroll.restore()

  describe '#initialize', ->

    it 'should fetch one more page', ->
      @view.onInitialFetch()
      Backbone.sync.callCount.should.equal 1

  describe '#onSync', ->

    it 'shows correct message when no artists are available', ->
      @view.collection = []
      @view.onSync()
      $('#gene-artists-empty-message').css('display').should.not.containEql 'none'

    it 'adds collection to page when artists are available', ->
      @view.onSync()
      $('#gene-artists-empty-message').css('display').should.equal 'none'
      $('#gene-artists-container a').length.should.equal 3

  describe '#readMore', ->

    it 'initially covers text with fade', ->
      $('.gene-read-more-fade').css('display').should.not.containEql 'none'

    it 'shows rest of description on click', ->
      @view.readMore(@e)
      $('.gene-description-text').css('max-height').should.containEql 9999
