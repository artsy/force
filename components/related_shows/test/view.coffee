_               = require 'underscore'
benv            = require 'benv'
Backbone        = require 'backbone'
sinon           = require 'sinon'
{ resolve }     = require 'path'
{ fabricate }   = require 'antigravity'

Artist            = require '../../../models/artist'
RelatedShowsView  = benv.requireWithJadeify resolve(__dirname, '../view.coffee'), ['template']

describe 'RelatedShowsView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    sinon.stub Backbone, 'sync'
    @artist   = new Artist fabricate 'artist'
    @view     = new RelatedShowsView
      model      : @artist
      collection : @artist.relatedShows
    done()

  afterEach ->
    Backbone.sync.restore()

  describe 'has a single show', ->
    beforeEach (done) ->
      @show = fabricate 'show'
      Backbone.sync.args[0][2].success [@show]
      @view.collection.trigger 'sync'
      _.defer done

    it 'displays itself', ->
      @view.$el.is(':visible').should.be.true
      @view.$el.attr('class').should.include 'is-fade-in'

    it 'renders correctly', ->
      html = @view.$el.html()
      html.should.include 'Shows including Pablo Picasso'
      html.should.not.include '.related-shows-rest'
      @view.$('.rsf-name').text().should.equal @show.name
      @view.$('.related-show').length.should.equal 0

  describe 'has multiple shows', ->
    beforeEach (done) ->
      @shows = [
        fabricate 'show'
        fabricate 'show'
        fabricate 'show'
      ]
      Backbone.sync.args[0][2].success @shows
      @view.collection.trigger 'sync'
      _.defer done

    it 'renders correctly', ->
      @view.$('.related-show-featured').length.should.equal 0
      @view.$('.related-show').length.should.equal 3
