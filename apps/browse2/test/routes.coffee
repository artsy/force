{ fabricate } = require 'antigravity'
_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'
Q = require 'q'

describe 'Browse routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    Backbone.sync.returns @deferred = { then: sinon.stub() }
    @req = { }
    @res = { render: sinon.stub(), redirect: sinon.stub() }

  afterEach ->
    Backbone.sync.restore()

  describe '#categories', ->

    it 'fetches gene categories and all genes', ->
      routes.categories @req, @res
      Backbone.sync.args[0][2].success [fabricate 'set', key: 'foobar']
      Backbone.sync.args[1][2].success [fabricate('gene'), fabricate('gene')]
      Backbone.sync.args[1][2].success []
      @res.render.args[0][0].should.equal 'categories'
      @res.render.args[0][1].geneCategories.first().get('key').should.equal 'foobar'
      @res.render.args[0][1].aToZGroup[0].letter.should.equal 'P'

  describe '#index', ->

    xit 'renders the browse page', ->
      routes.index @req, @res
      @res.render.args[0][0].should.equal 'index'