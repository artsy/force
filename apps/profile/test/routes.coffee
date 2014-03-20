{ fabricate } = require 'antigravity'
_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'
CurrentUser = require '../../../models/current_user.coffee'

describe 'User profile routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { params: { id: 'user' } }
    @res = { render: sinon.stub(), redirect: sinon.stub(), locals: { sd: { ARTSY_URL: 'http://localhost:5000', CURRENT_PATH: "/alessandra" } } }

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->

    it 'renders the profile template', ->
      routes.index @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'profile'
      @res.render.args[0][0].should.equal 'templates'
      @res.render.args[0][1].profile.get('id').should.equal 'alessandra'

    it 'redirects to the correct profile url', ->
      @res.locals.sd.CURRENT_PATH = '/wrong-profile'
      routes.index @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'profile'
      @res.redirect.args[0][0].should.equal '/alessandra'

describe 'Partner routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { params: { id: 'getty' } }
    @res = { render: sinon.stub(), redirect: sinon.stub(), locals: { sd: { ARTSY_URL: 'http://localhost:5000', CURRENT_PATH: "/getty" } } }

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->

    it 'renders the index template', ->
      routes.index @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'partner_profile'
      @res.render.args[0][0].should.equal '../partner/templates'
      @res.render.args[0][1].profile.isPartner()

  describe '#partner', ->

    it 'renders the index template', ->
      routes.partner @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'partner_profile'
      @res.render.args[0][0].should.equal '../partner/templates'
      @res.render.args[0][1].profile.isPartner()

  describe '#favorites', ->

    it 'redirects to profile if requesting a user tab on a partner profile', ->
      routes.favorites @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'partner_profile'
      @res.redirect.args[0][0].should.equal '/getty'

  describe '#follow', ->

    it 'redirects to profile page without user', ->
      routes.follow @req, @res
      @res.redirect.args[0][0].should.equal '/getty'

    it 'follows a profile and redirects to the profile', ->
      @res.redirect = sinon.stub()
      @req.user = new CurrentUser fabricate 'user'
      routes.follow @req, @res
      Backbone.sync.args[0][1].url().should.include '/api/v1/me/follow/profile'
      Backbone.sync.args[0][1].get('profile_id').should.equal 'getty'
      Backbone.sync.args[0][2].success()
      @res.redirect.args[0][0].should.equal '/getty'
