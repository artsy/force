_ = require 'underscore'
sinon = require 'sinon'
benv = require 'benv'
Backbone = require 'backbone'
Artist = require '../../../models/artist'
Profile = require '../../../models/profile'
Partner = require '../../../models/partner'
Artworks = require '../../../collections/artworks'
FollowArtist = require '../../../models/follow_artist'
CurrentUser = require '../../../models/current_user'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'

describe 'PartnerArtistView', ->

  beforeEach (done) ->
    benv.setup =>
      @_location = global.location
      global.location = { search: '' }
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../templates/artist.jade'), {
        artist: new Artist(fabricate 'artist'),
        profile: new Profile(fabricate 'partner_profile'),
        partner: new Partner(fabricate 'partner'),
        sd: {}
      }, =>
        { PartnerArtistView } = mod = benv.requireWithJadeify resolve(__dirname, '../client/artist'), ['artworksTemplate']
        mod.__set__ 'ShareView', @ShareView = sinon.stub()
        @view = new PartnerArtistView
          artist: new Artist(fabricate 'artist')
          partner: new Partner(fabricate 'partner')
          user: null
        done()

  afterEach ->
    global.location = @_location
    benv.teardown()
    Backbone.sync.restore()

  describe '#initialize', ->

    it 'renders artworks', ->
      Backbone.sync.args[0][2].success [
        artwork: fabricate('artwork', title: "Andy Foobar's Finger Painting")
      ]
      $('body').html().should.containEql "Andy Foobar's Finger Painting"

    xit 'renders on add', ->
      spy = sinon.spy @view, 'renderArtworks'
      # need to call initialize again to bind the spied renderArtworks()
      @view.initialize
        artist: new Artist(fabricate 'artist')
        partner: new Partner(fabricate 'partner')
        user: null
      Backbone.sync.args[0][2].success [
        fabricate 'artwork', title: "Andy Foobar's Finger Painting"
      ]
      @view.artworks.trigger 'add'
      @view.artworks.trigger 'add'
      spy.calledThrice.should.be.ok()

  describe '#renderArtworks', ->

    it 'hides the see more if reached max', ->
      @view.artist.set published_artworks_count: 0
      @view.artworks = new Artworks [fabricate('artwork'), fabricate('artwork')]
      @view.renderArtworks()
      @view.$('.artist-page-artwork-see-more-container').css('display').should.equal 'none'

  describe '#seeMoreArtworks', ->

    xit 'fetches more artworks and adds them to the collection', ->
      @view.seeMoreArtworks()
      _.last(Backbone.sync.args)[2].data.page.should.equal 2
      _.last(Backbone.sync.args)[2].success [fabricate('artwork'), fabricate('artwork')]
      @view.artworks.length.should.equal 2

  describe '#toggleShare', ->
    it 'toggles the share menu', ->
      @e = new $.Event('click')
      @view.$('.artist-share-menu').css('display') is 'none'
      @view.toggleShare(@e)
      @view.$('.artist-share-menu').css('display') is 'block'
      @view.toggleShare(@e)
      @view.$('.artist-share-menu').css('display') is 'none'

  describe '#followArtist', ->

    beforeEach ->
      @e = new $.Event('click')

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
        _.last(Backbone.sync.args)[2].success { id: 123, artist: @view.artist.attributes }
        @spyFollow.calledOnce.should.be.true()

      it 'should toggle button state', ->
        @view.$('.artist-follow').data('state').should.equal 'follow'
        @view.followButtonView.onToggle(@e)
        _.last(Backbone.sync.args)[2].success { id: 123, artist: @view.artist.attributes }
        @view.$('.artist-follow').attr('data-state').should.equal 'following'

    describe 'without a user', ->

      it 'should redirect to log in', ->
        @view.followButtonView.isLoggedIn = false
        spy = sinon.spy @view.followArtists, 'follow'
        @view.followButtonView.onToggle(@e)
        spy.called.should.be.false()
        @view.followArtists.follow.restore()
        location.href.should.containEql "/sign_up?action=follow&objectId=pablo-picasso"
        location.href.should.containEql "kind=artist&redirect-to=about:blank"

    describe '#resetArtworks', ->

      it 'fetches the artworks with the params', ->
        @view.artworkParams.foo = 'bar'
        @view.resetArtworks()
        Backbone.sync.args[0][2].data.foo.should.equal 'bar'
