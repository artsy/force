_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
PersonalizeState = require '../../client/state'
CurrentUser = require '../../../../models/current_user.coffee'
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
    sinon.stub CurrentUser::, 'initialize'
    @user = new CurrentUser fabricate 'user', collector_level: 2
    @state = new PersonalizeState user: @user
    @view = new FavoritesView state: @state, user: @user

    @view.render()

  afterEach ->
    CurrentUser::initialize.restore()
    Backbone.sync.restore()

  describe '#render', ->
    it 'renders the template', ->
      @view.$el.html().should.containEql 'Add works to your favorites'
      @view.$('#personalize-favorites-container').length.should.equal 1

  describe '#fetchArtworks', ->
    it 'fetches the artworks set', ->
      Backbone.sync.args[0][2].url.should.containEql '/api/v1/set/53c554ec72616961ab9a2000/items'
