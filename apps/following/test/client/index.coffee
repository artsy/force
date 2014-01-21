rewire        = require 'rewire'
benv          = require 'benv'
Backbone      = require 'backbone'
sinon         = require 'sinon'
FollowArtists = require '../../../../collections/follow_artists'
FollowArtist  = require '../../../../models/follow_artist'
CurrentUser = require '../../../../models/current_user.coffee'
_             = require 'underscore'
{ resolve }   = require 'path'
{ fabricate } = require 'antigravity'

describe 'FollowingView', ->

  before (done) ->
    sinon.stub _, 'defer'
    benv.setup =>
      benv.expose { $: benv.require 'components-jquery' }
      Backbone.$ = $
      done()

  after ->
    _.defer.restore()
    benv.teardown()
  
  beforeEach (done) ->
    sinon.stub Backbone, 'sync'
    benv.render resolve(__dirname, '../../templates/index.jade'), {
      sd: { type: 'artists' }
    }, =>
      { FollowingView, @init } = mod = benv.requireWithJadeify(
        (resolve __dirname, '../../client/index'), ['itemTemplate', 'hintTemplate']
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
      @view = new FollowingView
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
      $results = @view.$el.find('.following').children()
      $results.length.should.equal 2
      $results.eq(0).html().should.include 'artist1'
      $results.eq(1).html().should.include 'artist2'
      @FillwidthView.render.should.calledTwice

  describe '#loadNextPage', ->

    it 'renders the next pages individually until the end', ->
      $following = @view.$el.find('.following')
      @view.loadNextPage()
      $following.children().length.should.equal 4
      $following.children().eq(0).html().should.include 'artist1'
      $following.children().eq(1).html().should.include 'artist2'
      $following.children().eq(2).html().should.include 'artist3'
      $following.children().eq(3).html().should.include 'artist4'
      @view.loadNextPage()
      $following.children().length.should.equal 5
      $following.children().eq(0).html().should.include 'artist1'
      $following.children().eq(1).html().should.include 'artist2'
      $following.children().eq(2).html().should.include 'artist3'
      $following.children().eq(3).html().should.include 'artist4'
      $following.children().eq(4).html().should.include 'artist5'
      @view.loadNextPage()
      $following.children().length.should.equal 5
