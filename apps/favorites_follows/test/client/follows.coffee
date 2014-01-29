rewire        = require 'rewire'
benv          = require 'benv'
Backbone      = require 'backbone'
sinon         = require 'sinon'
FollowArtists = require '../../../../collections/follow_artists'
FollowArtist  = require '../../../../models/follow_artist'
CurrentUser   = require '../../../../models/current_user.coffee'
Gene          = require '../../../../models/gene'
_             = require 'underscore'
{ resolve }   = require 'path'
{ fabricate } = require 'antigravity'

describe 'FollowsView', ->

  before (done) ->
    sinon.stub _, 'defer'
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      done()

  after ->
    _.defer.restore()
    benv.teardown()

  describe 'without following items', ->

    beforeEach (done) ->
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../../templates/follows.jade'), {
        sd: { type: 'artists' }
      }, =>
        { FollowsView, @init } = mod = benv.requireWithJadeify(
          (resolve __dirname, '../../client/follows'), ['itemTemplate', 'hintTemplate']
        )
        followArtists = new FollowArtists()
        syncStub = sinon.stub followArtists, "syncFollows", (ids, options) ->
          options.success?(followArtists)
        @SuggestedGenesView = sinon.stub()
        @SuggestedGenesView.render = sinon.stub()
        @SuggestedGenesView.returns @SuggestedGenesView
        mod.__set__ 'SuggestedGenesView', @SuggestedGenesView
        @view = new FollowsView
          el: $ 'body'
          model: followArtists
          itemsPerPage: 2
        done()

    afterEach ->
      Backbone.sync.restore()

    describe '#showEmptyHint', ->

      it 'shows suggested genes genes', ->
        @SuggestedGenesView.render.should.calledOnce

  describe 'with following items', ->

    beforeEach (done) ->
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../../templates/follows.jade'), {
        sd: { type: 'artists' }
      }, =>
        { FollowsView, @init } = mod = benv.requireWithJadeify(
          (resolve __dirname, '../../client/follows'), ['itemTemplate', 'hintTemplate']
        )
        followArtists = new FollowArtists()
        syncStub = sinon.stub followArtists, "syncFollows", (ids, options) ->
          followArtists.add [
              { artist: fabricate 'artist', name: 'artist1' },
              { artist: fabricate 'artist', name: 'artist2' },
              { artist: fabricate 'artist', name: 'artist3' },
              { artist: fabricate 'artist', name: 'artist4' },
              { artist: fabricate 'artist', name: 'artist5' }
          ]
          options.success?(followArtists)
        @FillwidthView = sinon.stub()
        @FillwidthView.render = sinon.stub()
        @FillwidthView.returns @FillwidthView
        mod.__set__ 'FillwidthView', @FillwidthView
        @view = new FollowsView
          el: $ 'body'
          model: followArtists
          itemsPerPage: 2
        done()

    afterEach ->
      Backbone.sync.restore()

    describe '#initialize', ->

      it 'sets up following items collection of the current user', ->
        @view.followItems.length.should.equal 5

    describe '#setupFollowingItems', ->

      it 'renders the first page of following artists', ->
        $results = @view.$el.find('.follows .follows-item')
        $results.length.should.equal 2
        $results.eq(0).html().should.include 'artist1'
        $results.eq(1).html().should.include 'artist2'
        @FillwidthView.render.should.calledTwice

    describe '#loadNextPage', ->

      it 'renders the next pages individually until the end', ->
        @view.loadNextPage()
        $following = @view.$el.find('.follows .follows-item')
        $following.length.should.equal 4
        $following.eq(0).html().should.include 'artist1'
        $following.eq(1).html().should.include 'artist2'
        $following.eq(2).html().should.include 'artist3'
        $following.eq(3).html().should.include 'artist4'
        @view.loadNextPage()
        $following = @view.$el.find('.follows .follows-item')
        $following.length.should.equal 5
        $following.eq(0).html().should.include 'artist1'
        $following.eq(1).html().should.include 'artist2'
        $following.eq(2).html().should.include 'artist3'
        $following.eq(3).html().should.include 'artist4'
        $following.eq(4).html().should.include 'artist5'
        @view.loadNextPage()
        $following = @view.$el.find('.follows .follows-item')
        $following.length.should.equal 5
