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
    @res = { render: sinon.stub(), redirect: sinon.stub(), locals: { sd: { ARTSY_URL: 'http://localhost:5000'} } }

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->

    it 'renders the post template without an author', ->
      routes.index @req, @res
      _.last(Backbone.sync.args)[2].success fabricate('post', profile: undefined, id: 'post-id')
      @res.render.args[0][0].should.equal 'templates/index'
      @res.render.args[0][1].post.get('id').should.equal 'post-id'

    it 'renders the post template with an author', ->
      routes.index @req, @res
      _.last(Backbone.sync.args)[2].success fabricate('post', id: 'post-id')
      _.last(Backbone.sync.args)[2].success fabricate('profile')
      @res.render.args[0][0].should.equal 'templates/index'
      @res.render.args[0][1].post.get('id').should.equal 'post-id'
