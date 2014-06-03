_             = require 'underscore'
routes        = require '../routes'
sinon         = require 'sinon'
Backbone      = require 'backbone'
CurrentUser   = require '../../../models/current_user.coffee'
{ fabricate } = require 'antigravity'

describe '/user', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { url: '/user/edit' }
    @res =
      json    : sinon.stub()
      render  : sinon.stub()
      redirect: sinon.stub()
      locals  : { sd: { API_URL: 'http://localhost:5000'} }

  afterEach ->
    Backbone.sync.restore()

  describe '#refresh', ->

    it 'redirects to the home page without a current user', ->
      routes.refresh @req, @res
      @res.redirect.args[0][0].should.equal '/'

    describe 'with a logged in user', ->

      beforeEach ->
        @req =
          user : new CurrentUser fabricate 'user'
          login: sinon.stub()
        routes.refresh @req, @res
        Backbone.sync.args[0][2].success @req.user

      it 'calls req.login to refresh the session', ->
        @req.login.calledOnce.should.be.true


  describe '#settings', ->

    it 'redirects to the home page without a current user', ->
      routes.settings @req, @res
      @res.redirect.args[0][0].should.equal '/log_in?redirect_uri=/user/edit'

    describe 'with a logged in user', ->

      beforeEach ->
        @req = { user : new CurrentUser fabricate 'user' }
        routes.settings @req, @res

      it "fetches the current user and the user's profile", ->
        Backbone.sync.args[0][2].success @req.user
        Backbone.sync.args[2][1].attributes.id.should.equal @req.user.get 'default_profile_id'
        _.keys(Backbone.sync.args[2][2].data)[0].should.equal 'access_token'

      it "fetches the current user's authentications", ->
        Backbone.sync.args[0][2].success @req.user
        _.keys(Backbone.sync.args[1][2].data)[0].should.equal 'access_token'
        Backbone.sync.args[1][2].url.should.include 'me/authentications'

      xit 'determines which model to edit first (profile or user)', ->


  describe '#delete', ->

    it 'redirects to the home page without a current user', ->
      routes.delete @req, @res
      @res.redirect.args[0][0].should.equal '/'

    describe 'with a logged in user', ->

      it 'renders the account delete form', ->
        @req = { user : new CurrentUser fabricate 'user' }
        routes.delete @req, @res
        @res.render.args[0][0].should.include 'delete'
        @res.render.args[0][1].user.should.equal @req.user

    describe 'with a logged in admin', ->

      it 'redirects to the home page - the "me" API does not delete admins', ->
        @req = { user : new CurrentUser fabricate 'user', type: 'Admin' }
        routes.delete @req, @res
        @res.redirect.args[0][0].should.equal '/'
