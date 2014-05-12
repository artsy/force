sinon   = require 'sinon'
routes  = require '../routes'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'

describe 'Show route', ->
  beforeEach ->
    @req = { params: {}, get: sinon.stub(), originalUrl: '/show/foo' }
    @res = { render: sinon.stub(), redirect: sinon.stub(), locals: { sd: {} } }
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->
    beforeEach ->

    it 'renders the partners page if partner has private profile', ->
      show = fabricate('show')
      @req.originalUrl = "/show/#{show.id}"
      routes.index @req, @res
      show.partner.default_profile_public = false
      Backbone.sync.args[0][2].success(show)
      @res.render.args[0][0].should.equal 'template'

    it 'renders the partners page if partner has public profile', ->
      show = fabricate('show')
      @req.originalUrl = "/show/#{show.id}"
      routes.index @req, @res
      show.partner.default_profile_public = true
      Backbone.sync.args[0][2].success(show)
      Backbone.sync.args[1][2].success(fabricate('profile'))
      @res.render.args[0][0].should.equal 'template'

    it 'sets the context based on the referrer', ->
      show = fabricate('show', fair: {
        organizer: { profile_id: 'artrio' }
      })
      @req.originalUrl = "/show/#{show.id}"
      @req.get.returns 'http://artsy.net/artrio'
      routes.index @req, @res

      Backbone.sync.args[0][2].success show
      @res.locals.context.should.equal 'fair'

    it 'redirects to canonical url', ->
      @req.originalUrl = '/show/bar'
      routes.index @req, @res
      Backbone.sync.args[0][2].success fabricate 'show', id: 'foobar'
      @res.redirect.args[0][0].should.equal '/show/foobar'
