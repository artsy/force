Q = require 'bluebird-q'
_ = require 'underscore'
Backbone = require 'backbone'
sinon = require 'sinon'
{ fabricate } = require 'antigravity'
CurrentUser = require '../../models/current_user'

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

  describe '#addToPendingOrder', ->
    it 'includes session_id if user does not have access_token', ->
      # @user.set accessToken: null
      @user.addToPendingOrder
        editionSetId: '123'
        artworkId: 'artwork-id'
        quantity: 1
        success: sinon.stub()
        error: sinon.stub()
      _.last(Backbone.sync.args)[1].attributes.session_id.should.equal 'cool-session-id'

    it 'does not include session_id if user has access token', ->
      @user.set accessToken: 'xfoobar'
      @user.addToPendingOrder
        editionSetId: '123'
        artworkId: 'artwork-id'
        quantity: 1
        success: sinon.stub()
        error: sinon.stub()
      _.isUndefined(_.last(Backbone.sync.args)[1].attributes.session_id).should.be.ok()

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
