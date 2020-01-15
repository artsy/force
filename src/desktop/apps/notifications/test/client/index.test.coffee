_ = require 'underscore'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'
rewire = require 'rewire'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
Notifications = require '../../../../collections/notifications.coffee'
Artworks = require '../../../../collections/artworks.coffee'
CurrentUser = require '../../../../models/current_user.coffee'
Artist = require '../../../../models/artist.coffee'
Artists = require '../../../../collections/artists.coffee'
{ stubChildClasses } = require '../../../../test/helpers/stubs'
SidebarView = null

# FIXME: cannot set location on undefined (window) in benv setup
xdescribe 'NotificationsView', ->
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
    sinon.stub CurrentUser, 'orNull'
    CurrentUser.orNull.returns new CurrentUser fabricate 'user'
    artists = null
    location.search = ''
    benv.render resolve(__dirname, '../../templates/index.jade'), { sd: {}, asset: (->) , artists: artists }, =>
      { @NotificationsView } = mod = rewire '../../client/index.coffee'
      mod.__set__ 'SidebarView', sinon.stub()
      mod.__set__ 'scrollFrame', sinon.stub()
      mod.__set__ 'UrlUpdater', sinon.stub()
      mod.__set__ 'Cookies', { expire: (->) }
      done()

  afterEach ->
    Backbone.sync.restore()
    CurrentUser.orNull.restore()

  describe '#initialize', ->

    beforeEach ->
      @view = new @NotificationsView el: $('body')

    it 'should create a filterState model with defaults', ->
      @view.filterState.get('forSale').should.equal true
      @view.filterState.get('loading').should.equal true
      (@view.filterState.get('artist') == null).should.equal true

  describe '#render', ->

    beforeEach ->
      @view = new @NotificationsView el: $('body')

    it 'should set the data-state when loading', ->
      @view.filterState.set 'loading', true
      @view.render()
      $('#notifications-page').attr('data-state').should.equal 'loading'

    it 'should set the data-state when an artist is selected', ->
      @view.filterState.set
        artist: 'andy-warhol'
        loading: false
      @view.render()
      $('#notifications-page').attr('data-state').should.equal 'artist'

    it 'should set the data-state when no artist is selected and not loading', ->
      @view.filterState.set
        loading: false
        artist: null
      @view.render()
      $('#notifications-page').attr('data-state').should.equal 'recent-works'

    it 'sets the data-forsale when filtering', ->
      @view.filterState.set
        forSale: true
      @view.render()
      $('#notifications-page').attr('data-forsale').should.equal 'true'
