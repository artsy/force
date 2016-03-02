{ fabricate } = require 'antigravity'
_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'
Profile = require '../../../models/profile.coffee'
CurrentUser = require '../../../models/current_user.coffee'

describe 'Partner routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { body: {}, query: {}, params: { id: 'foo' } }
    @res = { render: sinon.stub(), locals: { sd: {} } }
    @next = sinon.stub()

  afterEach ->
    Backbone.sync.restore()

  describe '#requireAdmin', ->
    it 'skips the middlewares from this route stack if no logged-in user', ->
      @req.user = null
      routes.requireAdmin @req, @res, @next
      @next.calledOnce.should.be.ok
      @next.args[0][0].should.equal 'route'

    it 'skips the middlewares from this route stack if logged-in user is not an admin', ->
      @req.user = new CurrentUser fabricate 'user', type: 'User'
      routes.requireAdmin @req, @res, @next
      @next.calledOnce.should.be.ok
      @next.args[0][0].should.equal 'route'

    it 'nexts to the middleware in this route stack if logged-in user is an admin', ->
      @req.user = new CurrentUser fabricate 'user', type: 'Admin'
      routes.requireAdmin @req, @res, @next
      @next.calledOnce.should.be.ok
      _.isUndefined(@next.args[0][0]).should.be.ok()

  describe '#requireNewLayout', ->
    it 'skips the middlewares from this route stack if partner with gallery_deprecated layout', ->
      deprecatedLayoutPartnerProfile = new Profile fabricate 'partner_profile',
        owner: fabricate 'partner', profile_layout: 'gallery_deprecated'
      @res.locals.profile = deprecatedLayoutPartnerProfile
      routes.requireNewLayout @req, @res, @next
      @next.calledOnce.should.be.ok
      @next.args[0][0].should.equal 'route'

    it 'nexts to the middleware in this route stack otherwise', ->
      routes.requireNewLayout @req, @res, @next
      @next.calledOnce.should.be.ok
      _.isUndefined(@next.args[0][0]).should.be.ok()
