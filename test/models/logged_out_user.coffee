benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
LoggedOutUser = require '../../models/logged_out_user'

describe 'LoggedOutUser', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      done()

  after ->
    benv.teardown()

  describe 'auth related methods', ->
    beforeEach ->
      sinon.stub(Backbone, 'sync')
        .yieldsTo 'success', user: accessToken: 'secrets'

    afterEach ->
      Backbone.sync.restore()

    describe '#login', ->
      it 'logs the user in', ->
        user = new LoggedOutUser email: 'foo@bar.com', password: 'foobar'
        user.isLoggedIn().should.be.false
        user.login()
        Backbone.sync.args[0][0].should.equal 'create'
        Backbone.sync.args[0][2].url.should.equal '/users/sign_in'
        Backbone.sync.args[0][1].attributes.should.containEql email: 'foo@bar.com', password: 'foobar'
        user.isLoggedIn().should.be.true

      it 'accepts options and overwrites the default success', (done) ->
        user = new LoggedOutUser email: 'foo@bar.com', name: 'Foo Bar'
        user.login success: ->
          true.should.be.true
          done()

      it 'sets the accessToken in ajax settings', ->
        user = new LoggedOutUser email: 'foo@bar.com', password: 'foobar'
        user.login()
        $.ajaxSettings.headers['X-ACCESS-TOKEN'].should.equal 'secrets'

    describe '#signup', ->
      it 'registers the user model', ->
        user = new LoggedOutUser email: 'foo@bar.com', name: 'Foo Bar', password: 'foobar'
        user.signup()
        Backbone.sync.args[0][0].should.equal 'create'
        Backbone.sync.args[0][2].url.should.containEql '/api/v1/user'
        Backbone.sync.args[0][1].attributes
          .should.containEql name: 'Foo Bar', email: 'foo@bar.com', password: 'foobar'

      it 'accepts options and overwrites the default success', (done) ->
        user = new LoggedOutUser email: 'foo@bar.com', name: 'Foo Bar', password: 'foobar'
        user.signup success: ->
          true.should.be.true
          done()

      it 'sets the accessToken in ajax settings', ->
        user = new LoggedOutUser email: 'foo@bar.com', name: 'Foo Bar', password: 'foobar'
        user.signup()
        $.ajaxSettings.headers['X-ACCESS-TOKEN'].should.equal 'secrets'

      it 'aliases the method as #register', ->
        LoggedOutUser::register is LoggedOutUser::signup

    describe '#forgot', ->
      it 'submits a request for a password reset', ->
        user = new LoggedOutUser email: 'foo@bar.com'
        user.forgot()
        Backbone.sync.args[0][0].should.equal 'create'
        Backbone.sync.args[0][2].url.should.containEql '/api/v1/users/send_reset_password_instructions'
        Backbone.sync.args[0][1].attributes.should.containEql email: 'foo@bar.com'

      it 'accepts options and overwrites the default success', (done) ->
        user = new LoggedOutUser email: 'foo@bar.com'
        user.forgot success: ->
          true.should.be.true
          done()

  describe '#save', ->
    beforeEach ->
      sinon.stub Backbone, 'sync'

    afterEach ->
      Backbone.sync.restore()

    describe 'default behavior', ->
      it 'saves to the anonymous session', ->
        user = new LoggedOutUser
        user.save foo: 'bar'
        Backbone.sync.args[0][1].url().should.containEql '/api/v1/me/anonymous_session'
        Backbone.sync.args[0][1].attributes.should.eql foo: 'bar'

    describe 'behavior immediately following login', ->
      beforeEach ->
        sinon.stub(LoggedOutUser::, 'isLoggedIn').returns true

      afterEach ->
        LoggedOutUser::isLoggedIn.restore()

      it 'saves to the normal me endpoint', ->
        user = new LoggedOutUser
        user.save foo: 'bar'
        Backbone.sync.args[0][1].url().should.containEql '/api/v1/me'
        Backbone.sync.args[0][1].attributes.should.eql foo: 'bar'
