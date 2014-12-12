_ = require 'underscore'
sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
routes = rewire '../routes'

describe 'Show route', ->
  beforeEach ->
    @req = { params: {}, get: sinon.stub(), originalUrl: '/show/foo' }
    @res = { render: sinon.stub(), redirect: sinon.stub(), locals: { sd: {} } }
    @next = sinon.stub()
    sinon.stub Backbone, 'sync'
    @fetchStub = sinon.stub(routes.__get__('InstallShots')::, 'fetchUntilEndInParallel')

  afterEach ->
    Backbone.sync.restore()
    @fetchStub.restore()

  describe '#index', ->
    it 'renders the partners page if partner has private profile', (done) ->
      show = fabricate('show')
      @req.originalUrl = "/show/#{show.id}"
      routes.index @req, @res
      show.partner.default_profile_public = false
      Backbone.sync.args[0][2].success(show)
      _.defer =>
        @res.render.args[0][0].should.equal 'index'
        done()

    it 'renders the partners page if partner has public profile', (done) ->
      show = fabricate('show')
      @req.originalUrl = "/show/#{show.id}"
      routes.index @req, @res
      show.partner.default_profile_public = true
      Backbone.sync.args[0][2].success(show)
      _.defer =>
        Backbone.sync.args[1][2].success(fabricate('profile'))
        @res.render.args[0][0].should.equal 'index'
        done()

    it 'sets the context based on the referrer', (done) ->
      show = fabricate('show', fair: {
        organizer: { profile_id: 'artrio' }
      })
      @req.originalUrl = "/show/#{show.id}"
      @req.get.returns 'http://artsy.net/artrio'
      routes.index @req, @res

      Backbone.sync.args[0][2].success show
      _.defer =>
        @res.locals.context.should.equal 'fair'
        done()

    it 'redirects to canonical url', (done) ->
      @req.originalUrl = '/show/bar'
      routes.index @req, @res
      Backbone.sync.args[0][2].success fabricate 'show', id: 'foobar'
      _.defer =>
        @res.redirect.args[0][0].should.equal '/show/foobar'
        done()

    it 'redirects to canonical url', (done) ->
      @req.originalUrl = '/show/bar'
      routes.index @req, @res, @next
      Backbone.sync.args[0][2].success fabricate 'show', id: 'foobar', displayable: false
      _.defer =>
        @next.args[0][0].status.should.equal 404
        @next.args[0][0].message.should.equal 'Not Found'
        done()

    it 'leaves query params alone', (done) ->
      @req.originalUrl = '/show/foobar?foo=bar'
      routes.index @req, @res
      Backbone.sync.args[0][2].success fabricate 'show', id: 'foobar'
      _.defer =>
        @res.redirect.called.should.be.false
        done()
