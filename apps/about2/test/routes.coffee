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
    @res = {
      render: sinon.stub()
      redirect: sinon.stub()
      locals: { sd: { API_URL: 'http://localhost:5000', CURRENT_PATH: '/post/post-id' } }
      status: sinon.stub()
    }

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

  describe '#edit', ->

    it 'restricts admins', ->
      @req.user = new Backbone.Model(type: 'User')
      routes.edit @req, @res, next = sinon.stub()
      next.args[0][0].toString().should.include "You must be logged in as an admin"