_ = require 'underscore'
Backbone = require 'backbone'
Artist = require '../../../models/artist'
Artworks = require '../../../collections/artworks'
FollowArtist = require '../../../models/follow_artist'
CurrentUser = require '../../../models/current_user'
{ fabricate } = require 'antigravity'
sinon = require 'sinon'
benv = require 'benv'
{ resolve } = require 'path'

describe 'ArtistPageView', ->

  beforeEach (done) ->
    benv.setup =>
      @_location = global.location
      global.location = { search: '' }
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      $.fn.error = sinon.stub()
      benv.render resolve(__dirname, '../templates/page.jade'), {
        artist: new Artist(fabricate 'artist'),
        sd: {}
        asset: (->)
      }, =>
        ArtistPageView = benv.requireWithJadeify resolve(__dirname, '../client/view'),
          ['artworksTemplate', 'articlesTemplate', 'suggestedArtists']
        ArtistPageView.__set__ 'ShareView', @ShareView = sinon.stub()
        @view = new ArtistPageView model: new Artist(fabricate 'artist')
        done()

  afterEach ->
    global.location = @_location
    benv.teardown()
    Backbone.sync.restore()

  describe '#initialize', ->

    it 'renders artworks', ->
      Backbone.sync.args[0][2].success hits: [
        fabricate 'artwork', title: "Andy Foobar's Finger Painting"
      ]
      $('body').html().should.containEql "Andy Foobar's Finger Painting"

    it 'renders suggested artists', ->
      Backbone.sync.args[1][2].success [
        fabricate 'artist', name: "The Andy Foobar"
      ]
      $('body').html().should.containEql "The Andy Foobar"

    it 'renders on add', ->
      spy = sinon.spy @view, 'renderArtworks'
      @view.initialize({user: null})
      @view.artworks.trigger 'add'
      spy.called.should.be.ok()

    it 'sets the sort params if visiting the right url', ->
      location.search = 'sort=-published_at'
      @view.initialize({})
      @view.artworkParams.sort.should.equal '-published_at'

  describe '#swapArtworks', ->

    it 'fetches the for sale works if that button is clicked', ->
      @view.swapArtworks target: $ "<button class='artist-page-artworks-tab-for-sale'>"
      _.last(Backbone.sync.args)[2].data.should.containEql 'for_sale=true'

    it 'renders the fetched artworks', ->
      @view.swapArtworks target: $ "<button class='artist-page-artworks-tab-for-sale'>"
      _.last(Backbone.sync.args)[2].success hits: [fabricate 'artwork', title: 'Foobaraza']
      $('#artist-page-artworks-list').html().should.containEql 'Foobaraza'

  describe '#renderArtworks', ->

    it 'hides the see more if reached max', ->
      @view.model.set published_artworks_count: 0
      @view.artworks = new Artworks [fabricate('artwork'), fabricate('artwork')]
      @view.renderArtworks()
      @view.$('.artist-page-artwork-see-more-container').css('display').should.equal 'none'

  describe '#seeMoreArtworks', ->

    it 'fetches more artworks and adds them to the collection', ->
      @view.seeMoreArtworks()
      _.last(Backbone.sync.args)[2].data.should.containEql 'page=2'
      _.last(Backbone.sync.args)[2].success hits: [fabricate('artwork'), fabricate('artwork')]
      @view.artworks.length.should.be.above 1

  describe '#followArtist', ->

    beforeEach ->
      @e = $.Event('click')

    it 'should render init button state', ->
      @view.$('.artist-follow').data('state').should.equal 'follow'

    describe 'with a user', ->
      beforeEach ->
        @view.followButtonView.isLoggedIn = true
        @spyFollow = sinon.spy @view.followArtists, 'follow'
        @spyUnfollow = sinon.spy @view.followArtists, 'unfollow'

      afterEach ->
        @spyFollow.restore()
        @spyUnfollow.restore()

      it 'should follow the artist', ->
        @view.followButtonView.onToggle(@e)
        _.last(Backbone.sync.args)[2].success { id: 123, artist: @view.model.attributes }
        @spyFollow.calledOnce.should.be.true()

      it 'should toggle button state', ->
        @view.$('.artist-follow').data('state').should.equal 'follow'
        @view.followButtonView.onToggle(@e)
        _.last(Backbone.sync.args)[2].success { id: 123, artist: @view.model.attributes }
        @view.$('.artist-follow').attr('data-state').should.equal 'following'
        # Note: See followButtonView tests

    describe 'without a user', ->

      it 'should redirect to log in', ->
        spy = sinon.spy @view.followArtists, 'follow'
        @view.followButtonView.onToggle(@e)
        spy.called.should.be.false()
        @view.followArtists.follow.restore()
        location.href.should.containEql "/log_in?redirect-to="

  describe '#resetArtworks', ->

    it 'fetches the artworks with the params', ->
      @view.artworkParams.sort = 'title'
      @view.resetArtworks()
      _.last(Backbone.sync.args)[2].data.should.containEql 'sort=title'

  describe '#sortArtworks', ->

    it 'sorts the artworks based on the select value', ->
      @view.$('#artist-page-sort select').val '-published_at'
      @view.sortArtworks()
      _.last(Backbone.sync.args)[2].data.should.containEql '-published_at'
