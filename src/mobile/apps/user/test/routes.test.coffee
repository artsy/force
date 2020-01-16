_ = require 'underscore'
routes = require '../routes'
sinon = require 'sinon'
Backbone = require 'backbone'
CurrentUser = require '../../../models/current_user.coffee'
{ fabricate } = require '@artsy/antigravity'

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
        routes.refresh @req, @res
        Backbone.sync.args[0][2].success @req.user

      it 'calls req.login to refresh the session', ->
        @req.login.calledOnce.should.be.true()


  describe '#settings', ->

    it 'redirects to the home page without a current user', ->
      routes.settings @req, @res
      @res.redirect.args[0][0].should.equal '/log_in?redirect_uri=/user/edit'
