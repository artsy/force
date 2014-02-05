{ fabricate } = require 'antigravity'
_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'
Profile = require '../../../models/profile.coffee'
Shortcut = require '../../../models/shortcut.coffee'

describe 'Shortcut routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { params: { id: 'shortcut' } }
    @res = { render: sinon.stub(), redirect: sinon.stub(), locals: { sd: { ARTSY_URL: 'http://localhost:5000'} } }

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->

    it 'renders the profile template', ->
      routes.index @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'profile', id: 'andy-foobar'
      @res.render.args[0][0].should.equal 'templates'
      @res.render.args[0][1].profile.get('id').should.equal 'andy-foobar'
