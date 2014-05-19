Backbone  = require 'backbone'
sinon     = require 'sinon'
rewire    = require 'rewire'

LoggedOutUser = rewire '../../models/logged_out_user'
LoggedOutUser.__set__ 'location', reload: (reloadStub = sinon.stub())

describe 'LoggedOutUser', ->
  beforeEach ->
    sinon.stub(Backbone, 'sync').yieldsTo('success')

  afterEach ->
    Backbone.sync.restore()

  describe '#login', ->
    it 'logs the user in', ->
      user = new LoggedOutUser(email: 'foo@bar.com', password: 'foobar')
      user.login()
      Backbone.sync.args[0][0].should.equal 'create'
      Backbone.sync.args[0][2].url.should.equal '/users/sign_in'
      Backbone.sync.args[0][1].attributes.should.eql email: 'foo@bar.com', password: 'foobar'
    it 'accepts options and overwrites the default success', (done) ->
      user = new LoggedOutUser(email: 'foo@bar.com', name: 'Foo Bar')
      user.login(success: -> done())

  describe '#signup', ->
    it 'registers the user model', ->
      user = new LoggedOutUser(email: 'foo@bar.com', name: 'Foo Bar', password: 'foobar')
      user.signup()
      Backbone.sync.args[0][0].should.equal 'create'
      Backbone.sync.args[0][2].url.should.equal '/users/invitation/accept'
      Backbone.sync.args[0][1].attributes.should.eql name: 'Foo Bar', email: 'foo@bar.com', password: 'foobar'
      reloadStub.called.should.be.ok
    it 'accepts options and overwrites the default success', (done) ->
      user = new LoggedOutUser(email: 'foo@bar.com', name: 'Foo Bar', 'foobar')
      user.signup(success: -> done())
    it 'aliases the method as #register', ->
      LoggedOutUser::register is LoggedOutUser::signup

  describe '#forgot', ->
    it 'submits a request for a password reset', ->
      user = new LoggedOutUser(email: 'foo@bar.com')
      user.forgot()
      Backbone.sync.args[0][0].should.equal 'create'
      Backbone.sync.args[0][2].url.should.include '/api/v1/users/send_reset_password_instructions'
      Backbone.sync.args[0][1].attributes.should.eql email: 'foo@bar.com'
    it 'accepts options and overwrites the default success', (done) ->
      user = new LoggedOutUser(email: 'foo@bar.com')
      user.forgot(success: -> done())
