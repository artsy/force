Backbone = require 'backbone'
sinon = require 'sinon'
benv = require 'benv'
LoggedOutUser = require '../../models/logged_out_user'

describe 'LoggedOutUser', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      sinon.stub(Backbone, 'sync').yieldsTo 'success', { user: { accessToken: 'secrets' } }
      benv.expose location: reload: (@reloadStub = sinon.stub())
      done()

  afterEach ->
    Backbone.sync.restore()
    benv.teardown()

  describe '#login', ->
    it 'logs the user in', ->
      user = new LoggedOutUser email: 'foo@bar.com', password: 'foobar'
      user.login()
      Backbone.sync.args[0][0].should.equal 'create'
      Backbone.sync.args[0][2].url.should.equal '/users/sign_in'
      Backbone.sync.args[0][1].attributes.should.include email: 'foo@bar.com', password: 'foobar'
      @reloadStub.called.should.be.ok

    it 'accepts options and overwrites the default success', (done) ->
      user = new LoggedOutUser email: 'foo@bar.com', name: 'Foo Bar'
      user.login(success: -> done())

    it 'sets the accessToken in ajax settings', ->
      user = new LoggedOutUser email: 'foo@bar.com', password: 'foobar'
      user.login()
      $.ajaxSettings.headers['X-ACCESS-TOKEN'].should.equal 'secrets'

  describe '#signup', ->
    it 'registers the user model', ->
      user = new LoggedOutUser(email: 'foo@bar.com', name: 'Foo Bar', password: 'foobar')
      user.signup()
      Backbone.sync.args[0][0].should.equal 'create'
      Backbone.sync.args[0][2].url.should.equal '/users/invitation/accept'
      Backbone.sync.args[0][1].attributes.should.include name: 'Foo Bar', email: 'foo@bar.com', password: 'foobar'
      @reloadStub.called.should.be.ok

    it 'accepts options and overwrites the default success', (done) ->
      user = new LoggedOutUser(email: 'foo@bar.com', name: 'Foo Bar', password: 'foobar')
      user.signup(success: -> done())

    it 'sets the accessToken in ajax settings', ->
      user = new LoggedOutUser(email: 'foo@bar.com', name: 'Foo Bar', password: 'foobar')
      user.signup()
      $.ajaxSettings.headers['X-ACCESS-TOKEN'].should.equal 'secrets'

    it 'aliases the method as #register', ->
      LoggedOutUser::register is LoggedOutUser::signup

  describe '#forgot', ->
    it 'submits a request for a password reset', ->
      user = new LoggedOutUser(email: 'foo@bar.com')
      user.forgot()
      Backbone.sync.args[0][0].should.equal 'create'
      Backbone.sync.args[0][2].url.should.include '/api/v1/users/send_reset_password_instructions'
      Backbone.sync.args[0][1].attributes.should.include email: 'foo@bar.com'

    it 'accepts options and overwrites the default success', (done) ->
      user = new LoggedOutUser(email: 'foo@bar.com')
      user.forgot(success: -> done())
