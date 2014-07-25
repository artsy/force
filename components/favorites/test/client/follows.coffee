rewire = require 'rewire'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
CurrentUser = require '../../../../models/current_user.coffee'
Gene = require '../../../../models/gene'
_ = require 'underscore'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Follow = require '../../../../components/follow_button/model.coffee'
{ Following, FollowButton } = require '../../../../components/follow_button/index.coffee'

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
      benv.render resolve(__dirname, '../fixtures/follows.jade'), {
        sd: { type: 'artists' }
      }, =>
        { FollowsView, @init } = mod = benv.requireWithJadeify(
          (resolve __dirname, '../../client/follows'), ['itemTemplate', 'hintTemplate']
        )
        followArtists = new Following null, kind: 'artist'
        syncStub = sinon.stub followArtists, "fetchUntilEnd", (options) ->
          options.success?(followArtists)
        @SuggestedGenesView = sinon.stub()
        @SuggestedGenesView.render = sinon.stub()
        @SuggestedGenesView.returns @SuggestedGenesView
        mod.__set__ 'SuggestedGenesView', @SuggestedGenesView
        @view = new FollowsView
          el: $ 'body'
          collection: followArtists
          pageSize: 2
        done()

    afterEach ->
      Backbone.sync.restore()

    describe '#showEmptyHint', ->

      it 'shows suggested genes genes', ->
        @SuggestedGenesView.render.should.calledOnce

  describe 'with following items', ->

    beforeEach (done) ->
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../fixtures/follows.jade'), {
        sd: { type: 'artists' }
      }, =>
        { FollowsView, @init } = mod = benv.requireWithJadeify(
          (resolve __dirname, '../../client/follows'), ['itemTemplate', 'hintTemplate']
        )
        src = [
          { artist: fabricate('artist', { id: _.uniqueId(), name: 'artist1'}) },
          { artist: fabricate('artist', { id: _.uniqueId(), name: 'artist2'}) },
          { artist: fabricate('artist', { id: _.uniqueId(), name: 'artist3'}) },
          { artist: fabricate('artist', { id: _.uniqueId(), name: 'artist4'}) },
          { artist: fabricate('artist', { id: _.uniqueId(), name: 'artist5'}) }
        ]
        followArtists = new Following null, kind: 'artist'
        syncStub = sinon.stub followArtists, "fetch", (options) ->
          start = (options.data.page - 1) * options.data.size
          end = start + options.data.size
          for artist in src[start...end]
            followArtists.add new Follow(artist, { kind: 'artist' })
          options.success?(followArtists, null, options)
        @FillwidthView = sinon.stub()
        @FillwidthView.render = sinon.stub()
        @FillwidthView.returns @FillwidthView
        mod.__set__ 'FillwidthView', @FillwidthView
        @view = new FollowsView
          el: $ 'body'
          collection: followArtists
          pageSize: 2
        done()

    afterEach ->
      Backbone.sync.restore()

    describe '#initialize', ->

      it 'sets up following items collection of the current user', ->
        @view.followItems.length.should.equal 2

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

  describe 'with following profiles', ->
    beforeEach (done) ->
      benv.render resolve(__dirname, '../fixtures/follows.jade'), { sd: {} }, =>
        { @FollowsView } = mod = benv.requireWithJadeify resolve(__dirname, '../../client/follows'), [
          'profileTemplate'
        ]
        mod.__set__ 'SuggestedGenesView', Backbone.View
        mod.__set__ 'sd', KIND: 'profile'
        @profiles = _.times 9, -> profile: fabricate 'partner_profile', id: _.uniqueId()
        sinon.stub(Backbone, 'sync').yieldsTo 'success', @profiles
        @view = new @FollowsView el: $('body'), pageSize: 3
        done()

    afterEach ->
      Backbone.sync.restore()

    describe '#initialize', ->
      it 'renders the first page of profile results', ->
        @view.$('.follows-profile').length.should.equal 3

    describe '#loadNextPage', ->
      it 'renders the next pages individually until the end', ->
        @view.loadNextPage()
        @view.$('.follows-profile').length.should.equal 6
        @view.loadNextPage()
        @view.$('.follows-profile').length.should.equal 9
