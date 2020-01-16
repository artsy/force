{ fabricate } = require '@artsy/antigravity'
_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'
Profile = require '../../../models/profile.coffee'

describe 'Profile routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { body: {}, query: {}, get: sinon.stub(), params: { id: 'foo' } }
    @res = { render: sinon.stub(), redirect: sinon.stub(), locals: { sd: {} } }

  afterEach ->
    Backbone.sync.restore()

  describe '#follow', ->

    beforeEach ->
      @req.user = new Backbone.Model
      @req
      routes.follow @req, @res

    it 'follows the profile', ->
      _.last(Backbone.sync.args)[1].urlRoot().should.containEql 'me/follow/profile'

    it 'rediects back', ->
      _.last(Backbone.sync.args)[2].success()
      @res.redirect.args[0][0].should.equal '/foo'

  describe '#setProfile', ->

    it 'sets the profile in locals for other apps', ->
      routes.setProfile @req, @res, next = sinon.stub()
      _.last(Backbone.sync.args)[1].url().should.containEql '/profile/foo'
      _.last(Backbone.sync.args)[2].success fabricate 'profile', id: 'moobar'
      @res.locals.profile.get('id').should.equal 'moobar'

    it 'passes the users access token', ->
      @req.user = new Backbone.Model accessToken: 'foobar'
      routes.setProfile @req, @res, next = sinon.stub()
      _.last(Backbone.sync.args)[2].data.access_token.should.containEql 'foobar'

    it 'does not pass an access token with no user', ->
      @req.user = null
      routes.setProfile @req, @res, next = sinon.stub()
      (_.last(Backbone.sync.args)[2].data.access_token?).should.not.be.ok()

    it 'nexts if profile already exists in locals', ->
      @res.locals.profile = new Profile fabricate 'profile'
      routes.setProfile @req, @res, next = sinon.stub()
      next.called.should.be.ok()
