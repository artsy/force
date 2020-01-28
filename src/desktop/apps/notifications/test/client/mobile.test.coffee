_ = require 'underscore'
Q = require 'bluebird-q'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
Notifications = require '../../../../collections/notifications.coffee'
Artworks = require '../../../../collections/artworks.coffee'
Artist = require '../../../../models/artist.coffee'
NotificationsView = benv.requireWithJadeify require.resolve('../../client/mobile'), [
  'template'
  'artworkColumnsTemplate'
  'emptyTemplate'
]

xdescribe 'NotificationsView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      $.onInfiniteScroll = sinon.stub()
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub(Backbone, 'sync').returns Q.resolve()

  afterEach ->
    Backbone.sync.restore()

  describe 'without artist_id', ->
    beforeEach (done) ->
      benv.render require.resolve('../../templates/mobile/index.jade'), { sd: {} }, =>
        @view = new NotificationsView el: $('body')
        done()

    it 'makes the right API call', ->
      _.last(Backbone.sync.args)[2].url.should.containEql '/api/v1/me/notifications'
      _.last(Backbone.sync.args)[2].data.page.should.equal 1

    it 'groups and renders properly', ->
      bittyArtwork1 = fabricate 'artwork', published_changed_at: '2012-05-07T04:00:00+00:00', artist: fabricate 'artist', { id: 'bitty', name: 'Bitty Z' }
      bittyArtwork2 = fabricate 'artwork', published_changed_at: '2012-05-07T04:00:00+00:00', artist: fabricate 'artist', { id: 'bitty', name: 'Bitty Z' }
      percyArtwork1 = fabricate 'artwork', published_changed_at: '2012-05-06T04:00:00+00:00', artist: fabricate 'artist', { id: 'percy', name: 'Percy Z' }
      _.last(Backbone.sync.args)[2].success [bittyArtwork1, bittyArtwork2, percyArtwork1]
      @view.$el.find('.notifications-list-item').length.should.equal 2 # One for Bitty, One for Percy
      @view.$el.html().should.containEql 'Bitty Z'
      @view.$el.html().should.containEql 'Percy Z'
      @view.$el.html().should.containEql '/artist/bitty'
      @view.$el.html().should.containEql '/artist/percy'
      @view.$el.html().should.containEql '2 works added'
      @view.$el.html().should.containEql '1 work added'

    describe 'no notifications', ->
      it 'renders the empty notice', ->
        _.last(Backbone.sync.args)[2].success []
        @view.$el.html().should.containEql 'Nothing here yet'

  describe 'with artist_id', ->
    beforeEach (done) ->
      benv.render require.resolve('../../templates/mobile/index.jade'), { sd: {} }, =>
        sinon.stub(NotificationsView::, 'params').returns artist_id: 'emile-ajar'
        @view = new NotificationsView el: $('body')
        done()

    afterEach ->
      @view.params.restore()

    it 'makes the right API calls', ->
      Backbone.sync.args[0][1].url.should.containEql 'api/v1/artist/emile-ajar/artworks'

    it 'groups and renders properly', ->
      Backbone.sync.args[0][2].success([fabricate 'artwork', id: 'emile-ajar-artwork', artist: name: 'Émile Ajar'])

      @view.$el.html().should.containEql 'Émile Ajar'
      @view.$el.html().should.containEql 'emile-ajar-artwork'

      bittyArtwork1 = fabricate 'artwork', published_changed_at: '2012-05-07T04:00:00+00:00', artist: fabricate 'artist', { id: 'bitty', name: 'Bitty Z' }
      bittyArtwork2 = fabricate 'artwork', published_changed_at: '2012-05-07T04:00:00+00:00', artist: fabricate 'artist', { id: 'bitty', name: 'Bitty Z' }
      percyArtwork1 = fabricate 'artwork', published_changed_at: '2012-05-06T04:00:00+00:00', artist: fabricate 'artist', { id: 'percy', name: 'Percy Z' }
      _.last(Backbone.sync.args)[2].success [bittyArtwork1, bittyArtwork2, percyArtwork1]
      @view.$el.find('.notifications-list-item').length.should.equal 3 # One for Émile, Bitty, One for Percy
      @view.$el.html().should.containEql 'Bitty Z'
      @view.$el.html().should.containEql 'Percy Z'
      @view.$el.html().should.containEql '/artist/bitty'
      @view.$el.html().should.containEql '/artist/percy'
      @view.$el.html().should.containEql '2 works added'
      @view.$el.html().should.containEql '1 work added'
