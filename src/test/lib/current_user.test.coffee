Q = require 'bluebird-q'
_ = require 'underscore'
Backbone = require 'backbone'
sinon = require 'sinon'
{ fabricate } = require '@artsy/antigravity'
CurrentUser = require '../../lib/current_user'

describe 'CurrentUser', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @user = new CurrentUser fabricate 'user'

  afterEach ->
    Backbone.sync.restore()

  describe '#sync', ->
    it 'does the right thing for fetch/save', ->
      @user.save()
      _.isUndefined(Backbone.sync.args[0][2].data).should.be.true()
      @user.fetch()
      _.keys(Backbone.sync.args[1][2].data).should.containEql 'access_token'

  describe '#registeredForAuction', ->

    describe 'when a user is not registered', ->
      it 'returns false', (done) ->
        @user.registeredForAuction 'foobar-auction', success: (boolean) ->
          boolean.should.be.false()
          done()
        Backbone.sync.args[0][2].data.sale_id.should.equal 'foobar-auction'
        Backbone.sync.args[0][2].success []

    describe 'when a user is registered', ->
      it 'returns true', (done) ->
        @user.registeredForAuction 'foobar-auction-registered', success: (boolean) ->
          boolean.should.be.true()
          done()
        Backbone.sync.args[0][2].data.sale_id.should.equal 'foobar-auction-registered'
        Backbone.sync.args[0][2].success [{ id: 'existy' }]

    it 'when given a user is logged out error soaks it up and returns false', (done) ->
      @user.registeredForAuction 'foobar', success: (registered) ->
        registered.should.equal false
        done()
      Backbone.sync.args[0][2].error { responseText: "A user is required" }

  describe '#fetchQualifiedBidder', ->
    describe 'when a user has no bidders', ->
      it 'returns false', (done) ->
        @user.fetchQualifiedBidder 'foobar-auction', success: (bool) ->
          bool.should.be.false()
          done()
        Backbone.sync.args[0][2].success []

    describe 'when a user has no bidders for the auction', ->
      it 'returns false', (done) ->
        bidder = {
          id: 'me',
          qualified_for_bidding: true
          sale: {
            id: 'nothing'
          }
        }
        @user.fetchQualifiedBidder 'foobar-auction', success: (bool) ->
          bool.should.be.false()
          done()
        Backbone.sync.args[0][2].success [bidder]

    describe 'when a user is qualified', ->
      it 'returns true', (done) ->
        bidder = {
          id: 'me',
          qualified_for_bidding: true
          sale: {
            id: 'foobar-auction'
          }
        }
        @user.fetchQualifiedBidder 'foobar-auction', success: (bool) ->
          bool.should.be.true()
          done()
        Backbone.sync.args[0][2].success [bidder]

    describe 'when a user is not qualified', ->
      it 'returns false', (done) ->
        bidder = {
          id: 'me',
          qualified_for_bidding: false
          sale: {
            id: 'foobar-auction'
          }
        }
        @user.fetchQualifiedBidder 'foobar-auction', success: (bool) ->
          bool.should.be.false()
          done()
        Backbone.sync.args[0][2].success [bidder]

  describe '#placeBid', ->

    it 'creates a new bid position given the right params'

  describe '#savedArtwork', ->

    it 'passess true to success cb if the user has saved the given artwork', ->
      @user.set 'id': 'current-user'
      @user.savedArtwork('bitty', success: (saved) ->
        saved.should.be.ok()
      )
      Backbone.sync.args[0][2].url.should.containEql '/api/v1/collection/saved-artwork/artworks?artworks[]=bitty&private=true&user_id=current-user'
      Backbone.sync.args[0][2].success [ fabricate 'artwork' ]

    it 'passes false to success cb if the user has not saved the given work', ->
      @user.set 'id': 'current-user'
      @user.savedArtwork('bitty',
        success: (saved) ->
          saved.should.not.be.ok()
        error: (msg) ->
          msg.should.not.be.ok()
      )
      Backbone.sync.args[0][2].url.should.containEql '/api/v1/collection/saved-artwork/artworks?artworks[]=bitty&private=true&user_id=current-user'
      Backbone.sync.args[0][2].success [  ]

    it 'when the collection is not found, false is passed to the success cb', ->
      @user.set 'id': 'current-user'
      @user.savedArtwork('bitty',
        success: (saved) ->
          saved.should.not.be.ok()
        error: (msg) ->
          msg.should.not.be.ok()
      )
      Backbone.sync.args[0][2].url.should.containEql '/api/v1/collection/saved-artwork/artworks?artworks[]=bitty&private=true&user_id=current-user'
      Backbone.sync.args[0][2].error { responseText: "Collection not found" }

    it 'calls the error cb for other errors', ->
      @user.set 'id': 'current-user'
      @user.savedArtwork('bitty',
        error: (msg) ->
          msg.should.be.ok()
        success: (msg) ->
          msg.should.not.be.ok()
      )
      Backbone.sync.args[0][2].url.should.containEql '/api/v1/collection/saved-artwork/artworks?artworks[]=bitty&private=true&user_id=current-user'
      Backbone.sync.args[0][2].error { responseText: 'Unauthorized' }

  describe '#followingArtists', ->
    it 'makes the correct API call to retreive a list of artists the user is following', ->
      @user.followingArtists()
      Backbone.sync.args[0][0].should.equal 'read'
      Backbone.sync.args[0][2].url.should.containEql '/api/v1/me/follow/artists'

describe 'CurrentUser', ->
  beforeEach ->
    @sd = require('sharify').data
    @sd.SESSION_ID = 'cool-session-id'
    @user = new CurrentUser fabricate 'user'
    sinon.stub(Backbone, 'sync')

  afterEach ->
    Backbone.sync.restore()

  describe '#defaultArtworkCollection', ->
    it 'throws a sensible error when you forget to initialize artwork collections', ->
      (=> @user.defaultArtworkCollection()).should.throw /Must call/

  describe '#saveArtwork', ->
    it 'makes the correct api call', ->
      @user.initializeDefaultArtworkCollection()
      @user.saveArtwork('masterpiece', null)
      Backbone.sync.args[1][0].should.equal 'create'

  describe '#removeArtwork', ->
    it 'makes the correct api call', ->
      @user.initializeDefaultArtworkCollection()
      @user.removeArtwork('masterpiece', null)
      Backbone.sync.args[1][0].should.equal 'delete'

  describe '#fetchSuggestedHomepageArtworks', ->
    it 'fetches homepages artworks', ->
      @user.fetchSuggestedHomepageArtworks({})
      Backbone.sync.args[0][2].url.should.containEql 'suggested/artworks/homepage'

  describe '#followArtist', ->
    it 'follows an artist', ->
      @user.followArtist 'andy-foobar', {}
      _.last(Backbone.sync.args)[1].url().should.containEql 'me/follow/artist'

    it 'injects the access token', ->
      @user.set accessToken: 'xfoobar'
      @user.followArtist 'andy-foobar', {}
      _.last(Backbone.sync.args)[2].access_token.should.equal 'xfoobar'

  describe '#checkRegisteredForAuction', ->
    it 'makes the correct API call, accepts normal options', (done) ->
      @user.checkRegisteredForAuction
        saleId: 'an-auction'
        success: (status) ->
          status.should.be.true()
          done()
      Backbone.sync.args[0][2].url.should.containEql '/api/v1/me/bidders'
      Backbone.sync.args[0][2].data.sale_id.should.equal 'an-auction'
      Backbone.sync.args[0][2].success ['existy']

  describe '#fetchNotifications', ->
    it 'makes the correct API call and has default size of 10', ->
      @user.fetchNotificationBundles
        success: (status) ->
          status.should.be.true()
      Backbone.sync.args[0][2].url.should.containEql '/api/v1/me/notifications/feed'
      Backbone.sync.args[0][2].data.size.should.equal 10

  describe '#fetchAndMarkNotifications', ->
    it 'makes the correct API call and has defaults', ->
      @user.fetchAndMarkNotifications
        success: (status) ->
          status.should.be.true()
      Backbone.sync.args[0][2].url.should.containEql '/api/v1/me/notifications'
      Backbone.sync.args[0][2].data.type.should.equal 'ArtworkPublished'
      Backbone.sync.args[0][2].data.unread.should.be.true()
      Backbone.sync.args[0][2].data.size.should.equal 100

  describe '#prepareForInquiry', ->
    beforeEach ->
      Backbone.sync.restore()

      @user = new CurrentUser

      sinon.stub Backbone, 'sync'
        .returns Q.resolve()

    it 'creates or persists everything needed to make an inquiry', ->
      @user.prepareForInquiry().then ->
        Backbone.sync.callCount.should.equal 2

        Backbone.sync.args[0][1].url()
          .should.containEql '/api/v1/me'
        Backbone.sync.args[1][1].url
          .should.containEql '/api/v1/me/collector_profile'

  describe '#isChecked', ->
    it 'translates a boolean attribute to on or off', ->
      @user.set weekly_email: false, follow_email: true, offer_emails: false
      _.isUndefined(@user.isChecked('weekly_email')).should.be.true()
      _.isUndefined(@user.isChecked('offer_emails')).should.be.true()
      @user.isChecked('follow_email').should.be.true()

  describe 'authentications', ->
    beforeEach ->
      @authentications = [
        { id: '1', uid: '123456789', provider: 'twitter' }
        { id: '2', uid: '987654321', provider: 'facebook' }
      ]

    describe 'relation', ->
      it 'should inject initial authentications', ->
        user = new CurrentUser authentications: @authentications
        user.isLinkedTo('twitter').should.be.true()
        user.isLinkedTo('facebook').should.be.true()

    describe '#isLinkedTo', ->
      it 'determines if an account is linked to an app provider', ->
        @user.isLinkedTo 'twitter'
          .should.be.false()

        @user.related().authentications.reset @authentications

        @user.isLinkedTo 'twitter'
          .should.be.true()
        @user.isLinkedTo 'facebook'
          .should.be.true()
