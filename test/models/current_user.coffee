_               = require 'underscore'
Backbone        = require 'backbone'
sinon           = require 'sinon'
should          = require 'should'
benv            = require 'benv'
rewire          = require 'rewire'
{ fabricate }   = require 'antigravity'

CurrentUser = rewire '../../models/current_user'
CurrentUser.__set__ 'geoLocate', (locate: locateStub = sinon.stub().yieldsTo('success'))

describe 'CurrentUser', ->
  beforeEach (done) ->
    benv.setup =>
      @sd = require('sharify').data
      @sd.SESSION_ID = 'cool-session-id'
      @user = new CurrentUser fabricate 'user'
      sinon.stub(Backbone, 'sync')
      done()

  afterEach ->
    Backbone.sync.restore()
    benv.teardown()

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
      Backbone.sync.args[0][2].url.should.include 'suggested/artworks/homepage'

  describe '#followArtist', ->
    it 'follows an artist', ->
      @user.followArtist 'andy-foobar', {}
      _.last(Backbone.sync.args)[1].url().should.include 'me/follow/artist'

    it 'injects the access token', ->
      # @user.set accessToken: 'xfoobar'
      # @user.followArtist 'andy-foobar', {}
      # _.last(Backbone.sync.args)[2].access_token.should.equal 'xfoobar'

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
      _.isUndefined(_.last(Backbone.sync.args)[1].attributes.session_id).should.be.ok

  describe '#orNew', ->
    describe 'news up a CurrentUser with any attributes in Sharify + any attributes passed in', ->
      it 'news up an empty CurrentUser model', ->
        user = CurrentUser.orNew()
        user.should.be.instanceOf CurrentUser
        # A new Current user instance is going to have some follow
        # collections set to it with null values:
        _.compact(_.values(user.attributes)).should.eql []
      it 'will set any attributes passed', ->
        user = CurrentUser.orNew(foo: 'bar', bar: 'baz')
        user.get('foo').should.equal 'bar'
        user.get('bar').should.equal 'baz'
      it 'will also merge attributes passed in with Sharify data', ->
        @sd.CURRENT_USER = baz: 'qux'
        user = CurrentUser.orNew(foo: 'bar', bar: 'baz')
        user.get('foo').should.equal 'bar'
        user.get('bar').should.equal 'baz'
        user.get('baz').should.equal 'qux'
      it 'will overwrite the Sharify attributes with the passed in attributes', ->
        @sd.CURRENT_USER = foo: 'bar'
        user = CurrentUser.orNew(foo: 'something new', bar: 'baz')
        user.get('foo').should.equal 'something new'
        user.get('bar').should.equal 'baz'

  describe '#loggedIn', ->
    it 'is a class method', ->
      @sd.CURRENT_USER = undefined
      CurrentUser.loggedIn().should.be.false
      @sd.CURRENT_USER = existy: true
      CurrentUser.loggedIn().should.be.true
    it 'is an instance method', ->
      @sd.CURRENT_USER = undefined
      CurrentUser.orNew().loggedIn().should.be.false
      @sd.CURRENT_USER = existy: true
      CurrentUser.orNew().loggedIn().should.be.true

  describe '#detectLocation', ->
    beforeEach ->
      @setGeo = CurrentUser::setGeo
      CurrentUser::setGeo = sinon.stub()
    afterEach ->
      CurrentUser::setGeo = @setGeo
    it 'sets the users location only if they dont have one set already', ->
      user = new CurrentUser
      user.detectLocation()
      locateStub.args[0][0].accuracy.should.equal 'low'
      _.isFunction(locateStub.args[0][0].success).should.be.true
      CurrentUser::setGeo.called.should.be.true

  describe 'Auth', ->
    beforeEach ->
      Backbone.sync.restore()
      sinon.stub(Backbone, 'sync').yieldsTo('success')
    describe '#login', ->
      it 'logs the user in', ->
        window.location.reload = sinon.stub()
        user = CurrentUser.orNew(email: 'foo@bar.com', password: 'foobar')
        user.login()
        Backbone.sync.args[0][0].should.equal 'create'
        Backbone.sync.args[0][2].url.should.equal '/users/sign_in'
        Backbone.sync.args[0][1].attributes.should.eql email: 'foo@bar.com', password: 'foobar'
        window.location.reload.called.should.be.ok
      it 'accepts options and overwrites the default success', (done) ->
        user = CurrentUser.orNew(email: 'foo@bar.com', name: 'Foo Bar')
        user.login(success: -> done())

    describe '#signup', ->
      it 'registers the user model', ->
        @sd.CURRENT_USER = undefined
        window.location.reload = sinon.stub()
        user = CurrentUser.orNew(email: 'foo@bar.com', name: 'Foo Bar', password: 'foobar')
        user.signup()
        Backbone.sync.args[0][0].should.equal 'create'
        Backbone.sync.args[0][2].url.should.equal '/users/invitation/accept'
        Backbone.sync.args[0][1].attributes.should.eql name: 'Foo Bar', email: 'foo@bar.com', password: 'foobar'
        window.location.reload.called.should.be.ok
      it 'wont attempt to register a user if they already exist', ->
        @sd.CURRENT_USER = email: 'foo@bar.com', name: 'Foo Bar', password: 'foobar'
        user = CurrentUser.orNull()
        user.signup()
        Backbone.sync.called.should.be.false
      it 'accepts options and overwrites the default success', (done) ->
        @sd.CURRENT_USER = undefined
        user = CurrentUser.orNew(email: 'foo@bar.com', name: 'Foo Bar', 'foobar')
        user.signup(success: -> done())
      it 'aliases the method as #register', ->
        CurrentUser::register is CurrentUser::signup

    describe '#forgot', ->
      it 'submits a request for a password reset', ->
        @sd.CURRENT_USER = undefined
        user = CurrentUser.orNew(email: 'foo@bar.com')
        user.forgot()
        Backbone.sync.args[0][0].should.equal 'create'
        Backbone.sync.args[0][2].url.should.include '/api/v1/users/send_reset_password_instructions'
        Backbone.sync.args[0][1].attributes.should.eql email: 'foo@bar.com'
      it 'accepts options and overwrites the default success', (done) ->
        @sd.CURRENT_USER = undefined
        user = CurrentUser.orNew(email: 'foo@bar.com')
        user.forgot(success: -> done())
