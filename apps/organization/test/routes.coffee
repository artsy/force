{ fabricate } = require 'antigravity'
_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'
Profile = require '../../../models/profile.coffee'

describe 'Art Genome', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { body: {}, query: {}, get: sinon.stub(), params: { id: 'foo' } }
    @res = { render: sinon.stub(), redirect: sinon.stub(), locals: { sd: {} } }

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->

    it 'fetches and renders and organization', ->
      routes.index @req, @res
      _.last(Backbone.sync.args)[2].success {
        'name': 'Artsy Editorial'
        'slug': 'editorial'
        'author_ids': ['559ff9706b69f6a086a6563f']
      }
      @res.render.args[0][0].should.equal 'index'
      @res.render.args[0][1].organization.get('name').should.equal 'Artsy Editorial'
