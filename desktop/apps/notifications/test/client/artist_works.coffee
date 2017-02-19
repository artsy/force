_ = require 'underscore'
{ resolve } = require 'path'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
ArtistWorksView = require '../../client/artist_works.coffee'
{ stubChildClasses } = require '../../../../test/helpers/stubs'

describe 'ArtistWorksView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    sinon.stub Backbone, 'sync'
    benv.render resolve(__dirname, '../../templates/index.jade'), { sd: {}, asset: (->) , artists: null }, =>
      @ArtistWorksView = mod = benv.requireWithJadeify(
          (resolve __dirname, '../../client/artist_works'), ['artistHeaderTemplate']
        )
      stubChildClasses @ArtistWorksView, @, ['ArtworkColumnsView'], ['appendArtworks']
      @filterState = new Backbone.Model
        forSale: false
        artist: null
        loading: true
        empty: false
      done()

  afterEach ->
    Backbone.sync.restore()

  describe '#fetchAndRender', ->
    beforeEach ->
      @view = new @ArtistWorksView
        el: $('#notifications-artist-works')
        filterState: @filterState

    it 'fetches the artist\'s works with for_sale filter off', ->
      @view.filterState.set
        artist: 'andy-warhol'
        loading: true
        forSale: false
      _.last(Backbone.sync.args)[1].url.should.containEql '/api/v1/artist/andy-warhol/artworks?published=true'
      _.last(Backbone.sync.args)[2].data.filter[0].should.not.containEql 'for_sale'

    it 'fetches the artist\'s works with for_sale filter on', ->
      @view.filterState.set
        artist: 'andy-warhol'
        loading: true
        forSale: true
      _.last(Backbone.sync.args)[1].url.should.containEql '/api/v1/artist/andy-warhol/artworks?published=true'
      _.last(Backbone.sync.args)[2].data.filter[0].should.containEql 'for_sale'

    it 'resets the loading state after fetching', ->
      @view.filterState.set
        artist: 'andy-warhol'
        loading: true
        forSale: true
      _.last(Backbone.sync.args)[2].success []
      @view.filterState.get('loading').should.be.false()
