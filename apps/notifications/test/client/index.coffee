_ = require 'underscore'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
rewire = require 'rewire'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
Notifications = require '../../../../collections/notifications.coffee'
Artworks = require '../../../../collections/artworks.coffee'
CurrentUser = require '../../../../models/current_user.coffee'
Artist = require '../../../../models/artist.coffee'
{ stubChildClasses } = require '../../../../test/helpers/stubs'

describe 'NotificationsView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    sinon.stub Backbone, 'sync'
    sinon.stub CurrentUser, 'orNull'
    CurrentUser.orNull.returns new CurrentUser fabricate 'user'
    benv.render resolve(__dirname, '../../templates/index.jade'), { sd: {}, asset: (->) }, =>
      { @NotificationsView, @init } = mod = benv.requireWithJadeify resolve(__dirname, '../../client/index'), ['artistTemplate', 'emptyTemplate']
      stubChildClasses mod, this,
        ['ArtworkColumnsView']
        ['render']
      $.fn.waypoint = sinon.stub()
      $.waypoints = sinon.stub()
      done()

  afterEach ->
    Backbone.sync.restore()
    CurrentUser.orNull.restore()

  describe 'without an artist_id', ->
    beforeEach ->
      @view = new @NotificationsView el: $('body')

    describe '#initialize', ->
      it 'makes the right API call', ->
        _.last(Backbone.sync.args)[2].url.should.containEql '/api/v1/notifications'
        _.last(Backbone.sync.args)[2].data.should.containEql type: 'ArtworkPublished', since: 30, page: 1, size: 10

      it 'groups and renders properly', ->
        bittyArtwork1 = fabricate 'artwork', published_changed_at: '2012-05-07T04:00:00+00:00', artist: fabricate 'artist', { id: 'bitty', name: 'Bitty Z' }
        bittyArtwork2 = fabricate 'artwork', published_changed_at: '2012-05-07T04:00:00+00:00', artist: fabricate 'artist', { id: 'bitty', name: 'Bitty Z' }
        percyArtwork1 = fabricate 'artwork', published_changed_at: '2012-05-06T04:00:00+00:00', artist: fabricate 'artist', { id: 'percy', name: 'Percy Z' }
        _.last(Backbone.sync.args)[2].success([ bittyArtwork1, bittyArtwork2, percyArtwork1 ])
        @view.$el.find('.notifications-list-item').length.should.equal 2 # One for Bitty, One for Percy
        @view.$el.html().should.containEql 'Bitty Z'
        @view.$el.html().should.containEql 'Percy Z'
        @view.$el.html().should.containEql "/artist/bitty"
        @view.$el.html().should.containEql "/artist/percy"
        @view.$el.html().should.containEql "2 works added"
        @view.$el.html().should.containEql "1 work added"

    describe '#toggleForSale', ->
      it 'turns on the for_sale boolean in the fetch and starts from the first page', ->
        @view.nextPage()
        _.last(Backbone.sync.args)[2].data.should.containEql page: 2
        @view.$('#for-sale').click()
        _.last(Backbone.sync.args)[2].data.should.containEql
          for_sale: true
          type: 'ArtworkPublished'
          since: 30
          page: 1
          size: 10

  describe 'with an artist_id param', ->
    beforeEach ->
      sinon.stub(@NotificationsView::, 'params').returns artist_id: 'foobar'
      @view = new @NotificationsView el: $('body')

    afterEach ->
      @view.params.restore()

    it 'fetches the artist slug first; pins it', ->
      @view.$pins.find('.notifications-list-item').length.should.equal 1
      Backbone.sync.args[0][1].url().should.containEql 'api/v1/artist/foobar'
      Backbone.sync.args[1][1].url.should.containEql 'api/v1/artist/foobar/artworks?published=true'

  describe '#isEmpty', ->
    beforeEach ->
      @view = new @NotificationsView el: $('body')

    it 'returns true when there are no notifications and no pins', ->
      @view.notifications.reset()
      @view.notifications.length.should.equal 0
      @view.pinnedArtworks?.should.be.false
      @view.isEmpty().should.be.true

    it 'returns false when there are some notifications and no pins', ->
      @view.notifications.add existy: true
      @view.notifications.length.should.equal 1
      @view.pinnedArtworks?.should.be.false
      @view.isEmpty().should.be.false

    it 'returns false when there are no notifications and some pins', ->
      @view.pinnedArtworks = new Backbone.Collection(fabricate 'artwork')
      @view.pinnedArtworks.length.should.equal 1
      @view.notifications.length.should.equal 0
      @view.isEmpty().should.be.false

    it 'returns true when there are no notifications and some pins and for sale is enabled', ->
      @view.pinnedArtworks = new Backbone.Collection(fabricate 'artwork')
      @view.pinnedArtworks.length.should.equal 1
      @view.notifications.length.should.equal 0
      @view.forSale = true
      @view.isEmpty().should.be.true

  describe '#publishedAt', ->
    beforeEach ->
      @view = new @NotificationsView el: $('body')

    it 'returns the formatted maximum published_changed_at for the group of artworks', ->
      @view.publishedAt(new Backbone.Collection [
        { published_changed_at: '2015-03-23T09:10:03.000Z' }
        { published_changed_at: '2015-03-23T09:10:04.000Z' }
      ]).should.equal 'Mar. 23rd'

    it 'returns undefined when there is no published_changed_at', ->
      _.isUndefined(@view.publishedAt(new Backbone.Collection [
        { published_changed_at: undefined }
        { published_changed_at: undefined }
      ])).should.be.true
