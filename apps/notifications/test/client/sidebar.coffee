_ = require 'underscore'
{ resolve } = require 'path'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
Notifications = require '../../../../collections/notifications.coffee'
SidebarView = null
{ stubChildClasses } = require '../../../../test/helpers/stubs'

describe 'SidebarView', ->
  before (done) ->
    benv.setup ->
      benv.expose
        $: benv.require 'jquery'
        jQuery: benv.require 'jquery'
      Backbone.$ = $
      SidebarView = require '../../client/sidebar.coffee'
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    sinon.stub Backbone, 'sync'
    artists = {}
    artist1 = get: -> { name: 'Kina', id: 'kina-abe', published_artworks_count: 4 }
    artist2 = get: -> { name: 'Kana', id: 'kana-abe', published_artworks_count: 5 }
    artists.models = [ artist1, artist2 ]
    benv.render resolve(__dirname, '../../templates/index.jade'), { sd: { FOLLOWING: artists }, asset: (->) }, =>
      @SidebarView = mod = benv.requireWithJadeify(
          (resolve __dirname, '../../client/sidebar.coffee'), ['filterArtistTemplate']
        )
      @filterState = new Backbone.Model
        forSale: false
        artist: null
        loading: true
        empty: false
      sinon.stub(@SidebarView::,"setupSearch")
      @view = new @SidebarView
        el: $('#notifications-filter')
        filterState: @filterState
      done()

  afterEach ->
    Backbone.sync.restore()

  describe '#toggleArtist, #clearArtistWorks', ->

    it 'selects the artist when clicked', ->
      @view.$('.filter-artist[data-artist=kina-abe] .filter-artist-name').click()
      @view.$('.filter-artist[data-artist=kina-abe]').attr('data-state').should.containEql 'selected'

    it 'clears artist and shows feed without for_sale selected', ->
      @view.$('.filter-artist[data-artist=kina-abe] .filter-artist-name').click()
      @view.$('.filter-artist[data-artist=kina-abe] .filter-artist-clear').click()
      @view.filterState.get('forSale').should.be.false()
      @view.filterState.has('artist').should.be.false()

    it 'clears artist and shows feed with for_sale selected', ->
      @view.$('.filter-artist[data-artist=kina-abe] .filter-artist-name').click()
      @view.$('.filter-artist[data-artist=kina-abe] .filter-artist-clear').click()
      @view.filterState.has('artist').should.be.false()

    it 'sets filterState with for_sale filter off', ->
      @view.filterState.set 'forSale', false
      @view.$('.filter-artist[data-artist=kina-abe] .filter-artist-name').click()
      @view.filterState.get('forSale').should.be.false()
      @view.filterState.get('artist').should.equal 'kina-abe'

    it 'sets filterState with for_sale filter on', ->
      @view.filterState.set 'forSale', true
      @view.$('.filter-artist[data-artist=kina-abe] .filter-artist-name').click()
      @view.filterState.get('forSale').should.be.true()
      @view.filterState.get('artist').should.equal 'kina-abe'
