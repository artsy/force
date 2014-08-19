{ fabricate } = require 'antigravity'
_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'
CurrentUser = require '../../../models/current_user.coffee'

describe 'Notification Routing', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { url: '/works-for-you' }
    @res = { render: sinon.stub(), redirect: sinon.stub(), locals: { sd: { APP_URL: 'http://localhost:5000'} } }

  afterEach ->
    Backbone.sync.restore()

  describe '#worksForYou', ->

    it 'redirect to login without a user', ->
      routes.worksForYou @req, @res
      @res.redirect.args[0][0].should.equal '/log_in?redirect_uri=/works-for-you'

    it 'renders with a user', ->
      @req.user = new CurrentUser fabricate 'user'
      routes.worksForYou @req, @res
      @res.render.args[0][0].should.equal 'index'
