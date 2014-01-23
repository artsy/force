{ fabricate } = require 'antigravity'
_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'

describe 'Home routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { }
    @res = { render: sinon.stub() }

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->

    it 'renders the home page with hero units', ->
      routes.index @req, @res
      _.last(Backbone.sync.args)[1].url.should.include 'site_hero_units?enabled=true'
      _.last(Backbone.sync.args)[2].success [fabricate 'site_hero_unit']
      _.last(@res.render.args)[0].should.equal 'index'
      _.last(@res.render.args)[1].heroUnits[0]
        .get('description').should.equal 'My hero'