_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
CurrentUser = require '../../../../models/current_user'
{ stubChildClasses } = require '../../../../test/helpers/stubs'
{ fabricate } = require 'antigravity'
{ resolve } = require 'path'

describe 'FavoritesView', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      $.fn.hidehover = sinon.stub()
      $.fn.infiniteScroll  = sinon.stub()
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../fixtures/favorites.jade'), { sd: {} }, =>
        { EditCollectionModal } = mod = benv.requireWithJadeify(
          resolve(__dirname, '../../client/favorites')
          ['newTemplate', 'editTemplate']
        )
        mod.__set__ 'mediator', @mediator = trigger: sinon.stub(), on: sinon.stub()
        CurrentUser = mod.__get__ 'CurrentUser'
        sinon.stub CurrentUser, 'orNull'
        CurrentUser.orNull.returns new CurrentUser fabricate 'user'
        stubChildClasses mod, this,
          ['ArtworkColumnsView', 'SuggestedGenesView', 'ShareView']
          ['appendArtworks', 'render']
        @view = new FavoritesView el: $('body')
        done()

  afterEach ->
    CurrentUser.orNull.restore()
    benv.teardown()
    Backbone.sync.restore()

  describe '#initialize', ->