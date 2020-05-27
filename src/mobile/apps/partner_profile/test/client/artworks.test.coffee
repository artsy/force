benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
path = require 'path'
Artworks = require '../../../../collections/artworks.coffee'
Artwork = require '../../../../models/artwork.coffee'
Profile = require '../../../../models/profile'
{ fabricate } = require '@artsy/antigravity'

describe 'PartnerArtworksView', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      $.onInfiniteScroll = sinon.stub()
      Backbone.$ = $
      sinon.stub Backbone, 'sync'

      artworkColumns = [[new Artwork(fabricate('artwork'))], [new Artwork(fabricate('artwork'))]]
      benv.render path.resolve(__dirname, '../../templates/artworks.jade'),
        sd: {}
        profile: new Profile(fabricate('profile'))
        artworkColumns: artworkColumns
      , =>
        { PartnerArtworksView } = benv.requireWithJadeify path.resolve(__dirname, '../../client/artworks.coffee'), ['artworkColumnsTemplate']
        @view = new PartnerArtworksView(
          collection: new Artworks([]),
          el: $ 'body'
          params: {}
        )
        done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()

  describe '#render', ->
    it 'appends artworks in collection to columns', ->
      $('.artwork-columns-column').length.should.equal 2
      $('.artwork-columns-column').eq(0).find('.artwork-columns-artwork').length.should.equal 1
      $('.artwork-columns-column').eq(1).find('.artwork-columns-artwork').length.should.equal 1

      artworks = new Artworks([fabricate('artwork'), fabricate('artwork'), fabricate('artwork')])
      @view.collection = artworks
      @view.render()

      $('.artwork-columns-column').length.should.equal 2
      $('.artwork-columns-column').eq(0).find('.artwork-columns-artwork').length.should.equal 3
      $('.artwork-columns-column').eq(1).find('.artwork-columns-artwork').length.should.equal 2
