_ = require 'underscore'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
Notifications = require '../../../../collections/notifications.coffee'
Artworks = require '../../../../collections/artworks.coffee'
{ stubChildClasses } = require '../../../../test/helpers/stubs'

describe 'RecentlyAddedWorksView', ->
  before (done) ->
    benv.setup ->
      benv.expose
        $: benv.require('jquery')
        jQuery: benv.require('jquery')
        Waypoint: {
          destroyAll: sinon.stub()
          refreshAll: sinon.stub()
        }
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    sinon.stub Backbone, 'sync'
    benv.render resolve(__dirname, '../../templates/index.jade'), { sd: {}, asset: (->) , artists: null }, =>
      @RecentlyAddedWorksView = mod = benv.requireWithJadeify(
          (resolve __dirname, '../../client/recently_added_works'), ['emptyTemplate', 'artistTemplate']
        )
      stubChildClasses @RecentlyAddedWorksView, this,
        ['ArtworkColumnsView']
        ['params']
      @filterState = new Backbone.Model
        forSale: false
        artist: null
        loading: true
        empty: false
      @notifications = new Notifications

      $.fn.waypoint = sinon.stub()
      done()

  afterEach ->
    Backbone.sync.restore()

  describe 'without an artist_id', ->
    beforeEach ->
      @view = new @RecentlyAddedWorksView
        el: $('body')
        filterState: @filterState
        notifications: @notifications
      @filterState.trigger 'change'

    describe '#initialize', ->
      it 'makes the right API call', ->
        _.last(Backbone.sync.args)[2].url.should.containEql '/api/v1/me/notifications'
        _.last(Backbone.sync.args)[2].data.should.containEql type: 'ArtworkPublished', since: 30, page: 1, size: 10

      it 'groups and renders properly', ->
        bittyArtwork1 = fabricate 'artwork', published_at: '2012-05-07T04:00:00+00:00', artist: fabricate 'artist', { id: 'bitty', name: 'Bitty Z' }
        bittyArtwork2 = fabricate 'artwork', published_at: '2012-05-07T04:00:00+00:00', artist: fabricate 'artist', { id: 'bitty', name: 'Bitty Z' }
        percyArtwork1 = fabricate 'artwork', published_at: '2012-05-06T04:00:00+00:00', artist: fabricate 'artist', { id: 'percy', name: 'Percy Z' }
        _.last(Backbone.sync.args)[2].success([ bittyArtwork1, bittyArtwork2, percyArtwork1 ])
        @view.$el.find('.notifications-list-item').length.should.equal 2 # One for Bitty, One for Percy
        @view.$el.html().should.containEql 'Bitty Z'
        @view.$el.html().should.containEql 'Percy Z'
        @view.$el.html().should.containEql "/artist/bitty"
        @view.$el.html().should.containEql "/artist/percy"
        @view.$el.html().should.containEql "2 works added"
        @view.$el.html().should.containEql "1 work added"

  describe '#render', ->

    beforeEach ->
      @view = new @RecentlyAddedWorksView
        el: $('body')
        filterState: @filterState
        notifications: @notifications

    it 'should fetch data with for_sale toggled off', ->
      @view.filterState.set
        artist: null
        loading: true
        forSale: true
      @view.filterState.set
        artist: null
        loading: true
        forSale: false
      _.last(Backbone.sync.args)[2].data.should.containEql
        for_sale: false
        type: 'ArtworkPublished'
        since: 30
        page: 1
        size: 10

    it 'should fetch data with for_sale toggled on', ->
      @view.filterState.set
        artist: null
        loading: true
        forSale: true
      _.last(Backbone.sync.args)[2].data.should.containEql
        for_sale: true
        type: 'ArtworkPublished'
        since: 30
        page: 1
        size: 10

  describe 'with an artist_id param', ->
    beforeEach ->
      sinon.stub(@RecentlyAddedWorksView::, 'params').returns artist_id: 'foobar'
      @view = new @RecentlyAddedWorksView
        el: $('body')
        filterState: @filterState
        notifications: @notifications

    afterEach ->
      @view.params.restore()

    it 'fetches the artist slug first; pins it', (done) ->
      _.defer =>
        @view.$pins.find('.notifications-list-item').length.should.equal 1
        Backbone.sync.args[0][1].url().should.containEql 'api/v1/artist/foobar'
        Backbone.sync.args[1][1].url.should.containEql 'api/v1/artist/foobar/artworks?published=true'
        done()

  describe '#isEmpty', ->
    beforeEach ->
      @view = new @RecentlyAddedWorksView
        el: $('body')
        filterState: @filterState
        notifications: @notifications

    it 'returns true when there are no notifications and no pins', ->
      @view.notifications.reset()
      @view.notifications.length.should.equal 0
      @view.pinnedArtworks?.should.be.false()
      @view.isEmpty().should.be.true()

    it 'returns false when there are some notifications and no pins', ->
      @view.notifications.add existy: true
      @view.notifications.length.should.equal 1
      @view.pinnedArtworks?.should.be.false()
      @view.isEmpty().should.be.false()

    it 'returns false when there are no notifications and some pins', ->
      @view.pinnedArtworks = new Backbone.Collection(fabricate 'artwork')
      @view.pinnedArtworks.length.should.equal 1
      @view.notifications.length.should.equal 0
      @view.isEmpty().should.be.false()

  describe '#publishedAt', ->
    beforeEach ->
      @view = new @RecentlyAddedWorksView
        el: $('body')
        filterState: @filterState
        notifications: @notifications

    it 'returns the formatted maximum published_at for the group of artworks', ->
      @view.publishedAt(new Backbone.Collection [
        { published_changed_at: '2015-03-23T09:10:03.000Z' }
        { published_changed_at: '2015-03-23T09:10:04.000Z' }
      ]).should.equal 'Mar 23rd'
