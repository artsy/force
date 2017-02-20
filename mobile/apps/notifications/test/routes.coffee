{ fabricate } = require 'antigravity'
_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'
CurrentUser = require '../../../models/current_user.coffee'

describe 'Notification Routing', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { url: '/works-for-you', query: {} }
    @res = { render: sinon.stub(), redirect: sinon.stub(), locals: { sd: { APP_URL: 'http://localhost:5000'} } }

  afterEach ->
    Backbone.sync.restore()

  describe '#worksForYou', ->

    it 'redirect to login without a user', ->
      routes.worksForYou @req, @res
      @res.redirect.args[0][0].should.equal '/log_in?redirect-to=%2Fworks-for-you'

    it 'redirects to artist works page without a user, when linked to from email', ->
      @req = { url: '/works-for-you', query: { artist_id: 'percy-the-cat', from_email: true } }
      routes.worksForYou @req, @res
      @res.redirect.args[0][0].should.equal '/artist/percy-the-cat?filter=for_sale&sort=-published_at'

    it 'redirects to login without a user, when not linked to from email', ->
      @req = { url: '/works-for-you', query: { artist_id: 'percy-the-cat' } }
      routes.worksForYou @req, @res
      @res.redirect.args[0][0].should.equal '/log_in?redirect-to=%2Fworks-for-you'

    it 'renders with a user', ->
      @req.user = new CurrentUser fabricate 'user'
      @req.user.markNotifications = sinon.stub().yieldsTo 'success'
      routes.worksForYou @req, @res
      @res.render.args[0][0].should.equal 'index'
