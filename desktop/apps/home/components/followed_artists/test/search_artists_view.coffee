_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Artists = require '../../../../../collections/artists'
SearchArtistsView = benv.requireWithJadeify require.resolve('../search_artists_view'), ['itemTemplate', 'resultsTemplate']

describe 'SearchArtistsView', ->
  before (done) ->

    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @clock = sinon.useFakeTimers()
    @suggestedArtists = new Artists
    @followedArtists = new Artists

    benv.render resolve(__dirname, '../templates/index.jade'), {
      sd: {}
      asset: (->)
    }

    @view = new SearchArtistsView
      el: $('body')
      initialSuggestions: @suggestedArtists
      followedArtists: @followedArtists

  afterEach ->
    Backbone.sync.restore()
    @clock.restore()

  describe '#render', ->
    it 'renders a suggested artist', ->
      @suggestedArtists.add fabricate 'artist'

      @view.$el.html().should.containEql 'Pablo Picasso'
