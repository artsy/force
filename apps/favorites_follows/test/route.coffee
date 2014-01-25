{ fabricate } = require 'antigravity'
_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'
CurrentUser = require '../../../models/current_user.coffee'

describe 'Following routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { params: { type: 'artists' } }
    @res = { render: sinon.stub(), redirect: sinon.stub(), locals: { sd: { ARTSY_URL: 'http://localhost:5000'} } }

  afterEach ->
    Backbone.sync.restore()

  describe '#follows', ->

    it 'redirect to the home page without user', ->
      routes.follows @req, @res
      @res.redirect.args[0][0].should.equal '/'

    it 'renders the following artists template', ->
      @req.user = new CurrentUser fabricate 'user'
      routes.follows @req, @res
      @res.render.args[0][0].should.equal 'follows'
      @res.render.args[0][1].type.should.equal 'artists'

  describe '#favorites', ->

    it 'redirect to the home page without user', ->
      routes.favorites @req, @res
      @res.redirect.args[0][0].should.equal '/'

    it 'renders the favorites template', ->
      @req.user = new CurrentUser fabricate 'user'
      routes.favorites @req, @res
      @res.render.args[0][0].should.equal 'favorites'
