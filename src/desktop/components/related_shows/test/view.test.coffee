_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'
Artist = require '../../../models/artist'
RelatedShowsView = benv.requireWithJadeify resolve(__dirname, '../view.coffee'), ['template']

describe 'RelatedShowsView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    sinon.stub Backbone, 'sync'
    @artist = new Artist fabricate 'artist'
    @view = new RelatedShowsView model: @artist, collection: @artist.related().shows, nUp: 3
    done()

  afterEach ->
    Backbone.sync.restore()

  describe 'has a single show', ->
    beforeEach (done) ->
      @show = fabricate 'show', name: 'Foobar Show'
      @artist.related().shows.reset [@show], parse: true
      @view.collection.trigger 'sync'
      done()

    it 'renders correctly', ->
      html = @view.$el.html()
      html.should.containEql 'grid-3-up'
      @view.$('.fsfs-show-name').text().should.equal 'Foobar Show'
      @view.$('.grid-item').length.should.equal 1

  describe 'has multiple shows', ->
    beforeEach (done) ->
      @shows = [
        fabricate 'show'
        fabricate 'show'
        fabricate 'show'
      ]
      @artist.related().shows.reset @shows, parse: true
      @view.collection.trigger 'sync'
      done()

    it 'renders correctly', ->
      @view.$('.grid-item').length.should.equal 3
