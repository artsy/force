sinon   = require 'sinon'
routes  = require '../routes'
Backbone = require 'backbone'
CurrentUser = require '../../../models/current_user.coffee'
{ fabricate } = require 'antigravity'

describe 'Posts route', ->

  beforeEach ->
    @req = { params: {} }
    @res = { render: sinon.stub(), redirect: sinon.stub(), locals: { sd: {} } }

  describe '#index', ->

    beforeEach ->
      routes.index @req, @res

    it 'redirects to posts featured', ->
      @res.redirect.args[0][0].should.equal '/posts/featured'

  describe '#featured', ->

    beforeEach ->
      routes.featured @req, @res

    it 'redirects to posts featured', ->
      @res.render.args[0][0].should.equal 'template'

  describe '#all', ->

    it 'redirects index if not admin', ->
      @req.user = new CurrentUser fabricate 'user'
      routes.all @req, @res
      @res.redirect.args[0][0].should.equal '/posts/featured'

    it 'renders if is admin', ->
      @req.user = new CurrentUser fabricate('user', type: 'Admin')
      routes.all @req, @res
      @res.render.args[0][0].should.equal 'template'
