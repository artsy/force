_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
PersonalizeState = require '../../client/state'
CurrentUser = require '../../../../../models/current_user'
{ fabricate } = require 'antigravity'
{ resolve } = require 'path'
FavoritesView = null

describe 'FavoritesView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      FavoritesView = benv.requireWithJadeify resolve(__dirname, '../../client/views/favorites'), ['template']
      FavoritesView.__set__ 'ArtworkColumnsView', Backbone.View
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub(Backbone, 'sync').yieldsTo 'success', [fabricate 'artwork']

    @user = new CurrentUser fabricate 'user', collector_level: 2
    @state = new PersonalizeState user: @user
    @view = new FavoritesView state: @state, user: @user

    @view.render()

  afterEach ->
    Backbone.sync.restore()

  describe '#fetchArtworks', ->
    it 'fetches the artworks set', ->
      Backbone.sync.args[0][2].url.should.containEql '/api/v1/set/53c554ec72616961ab9a2000/items'
