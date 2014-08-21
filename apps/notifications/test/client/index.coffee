rewire = require 'rewire'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
Notifications = require '../../../../collections/notifications.coffee'
Artworks = require '../../../../collections/artworks.coffee'
CurrentUser = require '../../../../models/current_user.coffee'
Artist = require '../../../../models/artist.coffee'
_ = require 'underscore'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
{ stubChildClasses } = require '../../../../test/helpers/stubs'

setupView = (done) ->
  benv.render resolve(__dirname, '../../templates/index.jade'), {
    sd: {}
  }, =>
    { @NotificationsView, @init } = mod =
      benv.requireWithJadeify resolve(__dirname, '../../client/index'), ['template']
    stubChildClasses mod, this,
      ['ArtworkColumnsView']
      ['render']
    $.onInfiniteScroll = sinon.stub()
    @view = new @NotificationsView el: $('body')
    done()

describe 'NotificationsView', ->

  before (done) ->
    benv.setup ->
      benv.expose
        $: benv.require 'jquery'
        jQuery: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'
    sinon.stub CurrentUser, 'orNull'
    CurrentUser.orNull.returns new CurrentUser fabricate 'user'

  afterEach ->
    Backbone.sync.restore()
    CurrentUser.orNull.restore()

  describe '#initialize', ->
    beforeEach (done) ->
      setupView.call this, done

    it 'makes the right API call', ->
      _.last(Backbone.sync.args)[2].url.should.containEql '/api/v1/notifications'

    it 'groups and renders properly', ->
      bittyArtwork1 = fabricate 'artwork', published_changed_at: '2012-05-07T04:00:00+00:00', artist: fabricate 'artist', { id: 'bitty', name: 'Bitty Z' }
      bittyArtwork2 = fabricate 'artwork', published_changed_at: '2012-05-07T04:00:00+00:00', artist: fabricate 'artist', { id: 'bitty', name: 'Bitty Z' }
      percyArtwork1 = fabricate 'artwork', published_changed_at: '2012-05-06T04:00:00+00:00', artist: fabricate 'artist', { id: 'percy', name: 'Percy Z' }
      _.last(Backbone.sync.args)[2].success([ bittyArtwork1, bittyArtwork2, percyArtwork1 ])
      @view.$el.find('.notifications-list-item').length.should.equal 2   # One for Bitty, One for Percy
      @view.$el.html().should.containEql 'Bitty Z'
      @view.$el.html().should.containEql 'Percy Z'
      @view.$el.html().should.containEql "/artist/bitty"
      @view.$el.html().should.containEql "/artist/percy"
      @view.$el.html().should.containEql "2 works added"
      @view.$el.html().should.containEql "1 work added"
