{ fabricate } = require 'antigravity'
_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
rewire = require 'rewire'
routes = rewire '../routes'
CurrentUser = require '../../../models/current_user.coffee'
Fair = require '../../../models/fair.coffee'
Profile = require '../../../models/profile.coffee'

describe 'Fair routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { params: { id: 'some-fair' } }
    @res =
      render: sinon.stub()
      redirect: sinon.stub()
      locals:
        sd: { API_URL: 'http://localhost:5000', FAIR: new Fair(fabricate 'fair')}
        fair: new Fair(fabricate 'fair')
        profile: new Profile(fabricate 'fair_profile')

  afterEach ->
    Backbone.sync.restore()

  describe '#all', ->
    it 'next is called without a fair', ->
      @res.locals.sd.FAIR = undefined

      routes.info @req, @res, (next = sinon.stub())
      next.called.should.be.ok

      routes.overview @req, @res, (next = sinon.stub())
      next.called.should.be.ok

      routes.forYou @req, @res, (next = sinon.stub())
      next.called.should.be.ok

      routes.fairPosts @req, @res, (next = sinon.stub())
      next.called.should.be.ok

      routes.favorites @req, @res, (next = sinon.stub())
      next.called.should.be.ok

      routes.follows @req, @res, (next = sinon.stub())
      next.called.should.be.ok

      routes.browse @req, @res, (next = sinon.stub())
      next.called.should.be.ok

  describe '#info', ->

    it 'renders the info template', ->
      routes.info @req, @res
      @res.locals.sd.SECTION.should.equal 'info'
      @res.render.args[0][0].should.equal 'index'

  describe '#overview', ->

    it 'renders the overview template', ->
      routes.overview @req, @res
      @res.locals.sd.SECTION.should.equal 'overview'
      @res.render.args[0][0].should.equal 'overview'

  describe '#foryou', ->

    it 'renders the foryou template', ->
      routes.forYou @req, @res
      @res.locals.sd.SECTION.should.equal 'forYou'
      @res.render.args[0][0].should.equal 'index'

  describe '#fairPosts', ->

    it 'renders the posts template', ->
      routes.fairPosts @req, @res
      @res.locals.sd.SECTION.should.equal 'posts'
      @res.render.args[0][0].should.equal 'index'

  describe '#favorites', ->

    it 'redirects to the homepage without a user', ->
      routes.favorites @req, @res
      @res.redirect.args[0][0].should.equal '/some-fair'

    it 'renders the favorites template', ->
      @req.user = new CurrentUser fabricate 'user'
      routes.favorites @req, @res
      @res.render.args[0][0].should.equal 'favorites'

  describe '#follows', ->

    it 'redirects to the homepage without a user', ->
      routes.follows @req, @res
      @res.redirect.args[0][0].should.equal '/some-fair'

    it 'renders the follows template', ->
      @req.user = new CurrentUser fabricate 'user'
      @req.params.type = 'artists'
      routes.follows @req, @res
      @res.render.args[0][0].should.equal 'favorites'

  describe '#search', ->

    it 'searches', ->
      req = { params: { id: 'some-fair' }, query: { q: 'foobar' } }
      routes.search req, @res
      _.last(Backbone.sync.args)[0].should.equal 'read'
      _.last(Backbone.sync.args)[2].data.term.should.equal 'foobar'

    it 'redirects without query', ->
      req = { params: { id: 'some-fair' }, query: { } }
      routes.search req, @res
      @res.redirect.args[0][0].should.equal '/some-fair'

  describe '#browse', ->

    it 'renders index', ->
      routes.browse @req, @res
      @res.render.args[0][0].should.equal 'index'


  describe '#showRedirect', ->

    it 'redirects to show page', ->
      show = fabricate('show')
      routes.showRedirect @req, @res
      _.last(Backbone.sync.args)[2].success [
        results: [show]
        next: 'foo'
      ]
      @res.redirect.args[0][0].should.containEql '/show/gagosian-gallery-inez-and-vinood'

  describe 'cache busting', ->

    beforeEach ->
      routes.__set__ 'client', @client = { del: sinon.stub() }

    describe '#bustCache', ->

      beforeEach ->
        @req = { params: { id: 'cat-fair' } }
        @res = { redirect: sinon.stub() }

      it 'deletes the fair key in redis when navigated to by an admin user', ->
        @req.user = new CurrentUser fabricate 'user', type: 'Admin'
        routes.bustCache @req, @res, ->
        @client.del.args[0][0].should.equal 'fair:cat-fair'
        @res.redirect.args[0][0].should.equal '/cat-fair'

      it 'does nothing when not an admin user', ->
        routes.bustCache @req, @res, (next = sinon.stub())
        @client.del.called.should.not.be.ok
        @res.redirect.called.should.not.be.ok
        next.called.should.be.ok
