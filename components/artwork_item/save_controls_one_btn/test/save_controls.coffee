_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
CurrentUser = require '../../../../models/current_user'
{ fabricate } = require 'antigravity'
{ resolve } = require 'path'

describe 'FavoritesView', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../fixtures/favorites.jade'), { sd: {} }, =>
        # ...
        done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()