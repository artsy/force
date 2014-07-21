_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'
fs = require 'fs'
{ resolve }  = require 'path'
{ fabricate } = require 'antigravity'

describe 'About2 routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { params: { id: 'foo' } }
    @res = { render: sinon.stub(), redirect: sinon.stub(), locals: { sd: { API_URL: 'http://localhost:5000', CURRENT_PATH: '/post/post-id' } } }

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->

    it 'reads the json into locals', (done) ->
      @res.render = (tmpl, locals) =>
        data = JSON.parse fs.readFileSync(resolve __dirname, '../content.json')
        tmpl.should.equal 'index'
        locals.hero.title.should.include data.hero.title
        done()
      routes.index @req, @res