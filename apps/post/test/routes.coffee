{ fabricate } = require 'antigravity'
_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'
CurrentUser = require '../../../models/current_user.coffee'
Post = require '../../../models/post.coffee'

describe 'Post routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { params: { id: 'foo' } }
    @res = { render: sinon.stub(), redirect: sinon.stub(), locals: { sd: { API_URL: 'http://localhost:5000', CURRENT_PATH: '/post/post-id' } } }

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->

    it 'renders the post template without an author', ->
      routes.index @req, @res
      _.last(Backbone.sync.args)[2].success fabricate('post', profile: undefined, id: 'post-id')
      @res.render.args[0][0].should.equal 'index'
      @res.render.args[0][1].post.get('id').should.equal 'post-id'

    it 'renders the post template with an author', ->
      routes.index @req, @res
      _.last(Backbone.sync.args)[2].success fabricate('post', id: 'post-id')
      _.last(Backbone.sync.args)[2].success fabricate('profile')
      @res.render.args[0][0].should.equal 'index'
      @res.render.args[0][1].post.get('id').should.equal 'post-id'

    it 'redirects to the correct post url', ->
      @res.locals.sd.CURRENT_PATH = '/post/fail-post'
      routes.index @req, @res
      _.last(Backbone.sync.args)[2].success fabricate('post', id: 'post-id')
      _.last(Backbone.sync.args)[2].success fabricate('profile')
      @res.redirect.args[0][0].should.equal '/post/post-id'

  describe '#post', ->

    it 'shows a deprecated page for normal users', ->
      @req.user = new Backbone.Model type: 'User', has_partner_access: false
      routes.post @req, @res
      @res.render.args[0][0].should.equal 'deprecated'


    it 'redirects users to gravity who can contribute', ->
      @req.user = new Backbone.Model type: 'User', has_partner_access: true
      routes.post @req, @res
      @res.redirect.args[0][0].should.containEql '/post'
