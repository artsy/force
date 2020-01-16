sinon = require 'sinon'
Backbone = require 'backbone'
_ = require 'underscore'
Show = require '../../models/show'
Artwork = require '../../models/artwork'
{ fabricate } = require '@artsy/antigravity'
moment = require 'moment'

describe 'Show', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @show = new Show fabricate 'show'

  afterEach ->
    Backbone.sync.restore()

  describe '#formattedDateRange', ->

    it 'formates the date range of the show', ->
      @show.formattedDateRange().should.containEql moment(@show.get 'start_at').format('MMM. Do')
      @show.formattedDateRange().should.containEql moment(@show.get 'end_at').format('MMM. Do')

  describe '#artworks', ->

    it 'wraps the artworks in a collection', ->
      @show.set artworks: [fabricate 'artwork', title: 'Foobar']
      @show.artworks().first().get('title').should.equal 'Foobar'

  describe '#fairHref', ->

    beforeEach ->
      @show.set fair: fabricate 'fair'

    it 'returns an href to the fair', ->
      @show.fairHref().should.equal "/#{@show.get('fair').organizer.profile_id}"

    it 'returns nothing if there is no default_profile_id', ->
      delete @show.attributes.fair.default_profile_id
      _.isUndefined(@show.fairHref()).should.be.true()

    it 'returns nothing if there is no fair', ->
      delete @show.set 'fair', null
      _.isUndefined(@show.fairHref()).should.be.true()

  describe '#feedHeader', ->

    it 'shows the fair name if its a fair', ->
      @show.set fair: { name: 'foobar' }
      @show.feedHeader().should.equal 'foobar'

    it 'shows the artist name if no show name and no fair', ->
      @show.set(
        artists: [fabricate('artist', name: 'foo'), fabricate('artist', name: 'bar')]
        name: ''
      )
      @show.feedHeader().should.equal 'foo, bar'

  describe '#feedSubheaderAppend', ->

    it 'shows the fair location if a fair booth', ->
      @show.set fair: {}, fair_location: { display: 'foo at the bar' }
      @show.feedSubheaderAppend().should.equal 'foo at the bar'

    it 'shows the location city if not at a fair', ->
      @show.set location: { city: 'Cincinnati' }, fair: null
      @show.feedSubheaderAppend().should.equal 'Cincinnati'

  describe '#formattedLocation', ->

    it 'gives the fair location if its a fair booth', ->
      fairLocation = "Pier 94 - Contemporary, Booth 833"
      @show.set fair: fabricate('fair', name: 'The Foobar Show')
      @show.set 'fair_location', { display: fairLocation }
      @show.formattedLocation().should.equal fairLocation

    it 'gives the city and address if not a fair', ->
      @show.set location: { city: 'Cincinnati', address: 'Spinningwheel Ln.' }
      @show.formattedLocation().should.equal 'Cincinnati, Spinningwheel Ln.'

  describe '#fetchArtworks', ->

    it 'fetches the shows artworks', (done) ->
      @show.fetchArtworks success: (artworks) ->
        artworks.first().get('title').should.equal 'FooBarBaz'
        done()
      Backbone.sync.args[0][2].url.should.containEql "show/#{@show.get 'id'}/artworks"
      Backbone.sync.args[0][2].success [fabricate 'artwork', title: 'FooBarBaz']

  describe '#hasImageUrl', ->

    it 'returns false if the image is empty', ->
      @show.set(artowrks: undefined, image_url: '', image_versions: [])
      @show.hasImageUrl().should.be.false()

  describe '#imageUrl', ->

    it 'is medium by default', ->
      @show.set(image_url: 'foo/:version/bar').imageUrl().should.equal 'foo/medium/bar'

    it 'works if has no artworks', ->
      @show.set(artworks: undefined, image_url: '',  image_versions: [])
      @show.imageUrl().should.equal ''

    it 'falls back to an artwork if available', ->
      artwork = fabricate 'artwork'
      artworkModel = new Artwork artwork
      @show.set({ image_url: '',  image_versions: [], artworks: [artwork] })
      @show.imageUrl().should.equal artworkModel.defaultImageUrl()

  describe '#posterImage', ->

    it 'returns featured if it exists', ->
      @show.set(image_versions: ['featured', 'larger'], image_url: 'cat/bitty/:version').posterImage().should.equal 'cat/bitty/featured'

    it 'returns larger if it exists', ->
      @show.set(image_versions: ['large', 'larger'], image_url: 'cat/bitty/:version').posterImage().should.equal 'cat/bitty/larger'
