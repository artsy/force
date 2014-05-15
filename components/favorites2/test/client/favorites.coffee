_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
CurrentUser = require '../../../../models/current_user'
{ fabricate } = require 'antigravity'
{ resolve } = require 'path'
{ stubChildClasses } = require '../../../../test/helpers/stubs'

describe 'FavoritesView', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      $.fn.hidehover = sinon.stub()
      benv.render resolve(__dirname, '../fixtures/favorites.jade'), { sd: {} }, =>
        { FavoritesView } = mod = benv.requireWithJadeify(
          resolve(__dirname, '../../client/favorites')
          ['hintTemplate']
        )
        mod.__set__ 'mediator', @mediator = trigger: sinon.stub(), on: sinon.stub()
        CurrentUser = mod.__get__ 'CurrentUser'
        CurrentUser.orNull = -> new CurrentUser fabricate 'user'
        stubChildClasses mod, this,
          ['ArtworkColumnsView', 'SuggestedGenesView', 'ShareView']
          ['appendArtworks', 'render']
        $.fn.infiniteScroll  = sinon.stub()
        @view = new FavoritesView el: $('body')
        done()

  afterEach ->
    benv.teardown()

  it 'foos', ->