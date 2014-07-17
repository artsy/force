_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
Artwork = require '../../../../models/artwork.coffee'
Artworks = require '../../../../collections/artworks.coffee'
Feature = require '../../../../models/feature.coffee'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'

describe 'FeatureView', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      @FeatureView = require '../../client/index.coffee'
      done()

  after ->
    benv.teardown()

  xdescribe 'on init', ->

    beforeEach (done) ->
      @artworks = [
        new Artwork fabricate 'artwork', { artist: fabricate 'artist', { name: 'Matthew Abbott', sortable_id: 'abbott-matthew' } }
        new Artwork fabricate 'artwork', { artist: fabricate 'artist', { name: 'Leo Da Vinci', sortable_id: 'da-vinci-leo' } }
        new Artwork fabricate 'artwork', { artist: fabricate 'artist', { name: 'Pablo Picasso', sortable_id: 'picasso-pablo' } }
        new Artwork fabricate 'artwork', { artist: fabricate 'artist', { name: 'Frank Calloway', sortable_id: 'calloway-frank' } }
        new Artwork fabricate 'artwork', { artist: fabricate 'artist', { name: 'Ellen Eagle', sortable_id: 'eagle-ellen' } }
        new Artwork fabricate 'artwork', { artist: fabricate 'artist', { name: 'Andy Warhol', sortable_id: 'warhol-andy' } }
      ]
      for artwork in @artworks
        artwork.set 'saleArtwork', fabricate('sale_artwork')
      @feature = new Feature fabricate 'feature'

      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../../templates/index.jade'), {
        feature: @feature
        sd: { FEATURE: @feature }
      }, =>
        { PartnerView, @init } = mod = benv.requireWithJadeify(
          (resolve __dirname, '../../client/index'), ['setsTemplate', 'artistsTemplate']
        )

        @featureTemplate = sinon.stub()
        mod.__set__ 'setsTemplate', @setsTemplate
        mod.__set__ 'artistsTemplate', @artistsTemplate
        @view = new @FeatureView
          model: @profile
          el: $ 'body'
        @view.partner.set 'displayable_shows_count', 1
        done()

    afterEach ->
      Backbone.sync.restore()

    describe '#getArtworksOrderedByArtist', ->

      it 'sorts the collection for the artist list', ->
        true.should.be.false

    describe '#renderArtistList', ->

      it 'adds an artist list to top of the last artwork column', ->
