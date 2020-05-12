{ fabricate } = require '@artsy/antigravity'
sinon = require 'sinon'
rewire = require 'rewire'
routes = rewire '../routes'
Backbone = require 'backbone'

describe '#index', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  it 'renders the feature page', ->
    routes.index { params: { id: 'awesome-feature' } }, { locals: { sd: {} }, render: renderStub = sinon.stub() }
    Backbone.sync.args[0][2].success fabricate 'feature', name: 'Awesome Feature'
    renderStub.args[0][0].should.equal 'page'
    renderStub.args[0][1].feature.get('name').should.equal 'Awesome Feature'

  it 'passes through the route if the version is too high', ->
    next = sinon.stub()
    routes.index { params: { id: 'awesome-feature' } }, { locals: { sd: {} }, render: renderStub = sinon.stub() }, next
    Backbone.sync.args[0][2].success fabricate 'feature', name: 'Awesome Feature', version: 2
    next.calledOnce.should.be.ok()
