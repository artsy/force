_ = require 'underscore'
jade = require 'jade'
path = require 'path'
fs = require 'fs'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
Genes = require '../../../collections/genes'
routes = require '../routes'
sinon = require 'sinon'

describe 'Artists routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @res = render: sinon.stub()

  afterEach ->
    Backbone.sync.restore()

  it 'returns a successful fetch/response of the sets', ->
    routes.index {path: '/artists'}, @res
    Backbone.sync.args[0][2].success [fabricate 'set']
    Backbone.sync.args[1][2].success [fabricate('gene'), fabricate('gene')]
    @res.render.args[0][1].genes.length.should.be.above 1
