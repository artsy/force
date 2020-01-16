sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
CurrentUser = require '../../../models/current_user'
routes = require '../routes'

describe '/user', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = url: '/user/edit'
    @res =
      set: sinon.stub()
      json: sinon.stub()
      render: sinon.stub()
      redirect: sinon.stub()
      locals: sd: API_URL: 'http://localhost:5000'

  afterEach ->
    Backbone.sync.restore()

  describe '#refresh', ->
    it 'redirects to the home page without a current user', ->
      routes.refresh @req, @res
      @res.redirect.args[0][0].should.equal '/'

    describe 'with a logged in user', ->
      beforeEach ->
        @req =
          user: new CurrentUser fabricate 'user'
          login: sinon.stub()
        @next = sinon.stub()

        Backbone.sync
          .onCall 0
          .returns Promise.resolve @req.user

      it 'calls req.login to refresh the session', ->
        routes.refresh @req, @res, @next
          .then =>
            @req.login.calledOnce.should.be.true()
            @req.login.args[0][1]()
            @next.calledOnce.should.not.be.true()
            @req.login.args[0][1](true)
            @next.calledOnce.should.be.true()

  describe '#settings', ->
    it 'redirects to the home page without a current user', ->
      routes.settings @req, @res
      @res.redirect.args[0][0].should.equal '/log_in?redirect_uri=/user/edit'

    describe 'with a logged in user', ->
      beforeEach ->
        @req = user: new CurrentUser fabricate 'user', type: 'User', accessToken: 'xxx'

        Backbone.sync
          .onCall 0
          .returns Promise.resolve @req.user

      it 'fetches the authentications', ->
        routes.settings @req, @res
          .then =>
            Backbone.sync.args[1][1].url.should
              .containEql '/me/authentications'
            Backbone.sync.args[1][2].data.access_token
              .should.equal 'xxx'
