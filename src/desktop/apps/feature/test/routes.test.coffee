_ = require 'underscore'
routes = require '../routes'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'

describe '#index', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { params: { id: 'awesome-feature' } }
    @res =
      render: sinon.stub()
      redirect: sinon.stub()
      locals:
        sd:
          API_URL: 'http://localhost:5000'

  afterEach ->
    Backbone.sync.restore()

  it 'renders the feature page', ->
    routes.index @req, @res
    Backbone.sync.args[0][2].success fabricate 'feature', name: 'Awesome Feature'
    @res.render.args[0][0].should.equal 'templates/index'
    @res.render.args[0][1].feature.get('name').should.equal 'Awesome Feature'

describe '#redirectCityGuide', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { params: { id: 'city-guide-foo' } }
    @res =
      redirect: sinon.stub()

  afterEach ->
    Backbone.sync.restore()

  it 'redirects to iphone splash page', ->
    routes.redirectCityGuide @req, @res
    @res.redirect.args[0][0].should.eql(301)
    @res.redirect.args[0][1].should.eql('https://iphone.artsy.net')
