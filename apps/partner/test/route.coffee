{ fabricate } = require 'antigravity'
_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'
Profile = require '../../../models/profile'

describe 'Partner routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    routes.setProfile = sinon.stub
    @req = { params: { id: 'some gallery' }, profile: new Profile fabricate 'partner' }
    @res = { render: sinon.stub(), locals: { sd: {} } }

  afterEach ->
    Backbone.sync.restore()

  describe '#follows', ->

    it 'renders the contact template', ->
      routes.contact @req, @res
      @res.render.args[0][0].should.equal 'templates'
      @res.render.args[0][1].profile.isPartner()
