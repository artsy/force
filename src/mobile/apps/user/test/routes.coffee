_ = require 'underscore'
routes = require '../routes'
sinon = require 'sinon'
Backbone = require 'backbone'
CurrentUser = require '../../../models/current_user.coffee'
{ fabricate } = require 'antigravity'

describe '/user', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { url: '/user/edit' }
    @res =
      json: sinon.stub()
      render: sinon.stub()
      redirect: sinon.stub()
      locals: { sd: { API_URL: 'http://localhost:5000'} }

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
          .then (data) =>
            # Login triggered
            @req.login.calledOnce.should.be.true()

            # Successful
            @req.login.args[0][1]()
            @next.calledOnce.should.not.be.true()

            # With error
            @req.login.args[0][1](true)
            @next.calledOnce.should.be.true()

  describe '#settings', ->

    it 'redirects to the home page without a current user', ->
      routes.settings @req, @res
      @res.redirect.args[0][0].should.equal '/log_in?redirect_uri=/user/edit'
