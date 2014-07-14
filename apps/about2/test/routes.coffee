{ fabricate } = require 'antigravity'
_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'
Page = require '../../../models/page.coffee'

describe 'Post routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { params: { id: 'foo' } }
    @res = { render: sinon.stub(), redirect: sinon.stub(), locals: { sd: { API_URL: 'http://localhost:5000', CURRENT_PATH: '/post/post-id' } } }

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->

    it 'fetches the about2 page and turns it into useful locals', ->
      routes.index @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'page', content: '# This is one complex bit of content'
      @res.render.args[0][0].should.equal 'index'
      @res.render.args[0][1].heroTitle.should.include "This is one complex bit of content"