{ fabricate } = require '@artsy/antigravity'
sinon = require 'sinon'
routes = require '../routes'
Backbone = require 'backbone'
Profile = require '../../../models/profile'

describe '#index', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    routes.index(
      { params: { id: 'foo' }, profile: new Profile(fabricate 'profile', owner_type: 'User') }
      { locals: { sd: {} }, render: renderStub = sinon.stub() }
    )
    Backbone.sync.args[0][2].success fabricate 'profile', id: 'artsy-ed'
    @templateName = renderStub.args[0][0]
    @templateOptions = renderStub.args[0][1]

  afterEach ->
    Backbone.sync.restore()

  it 'renders the post page', ->
    @templateName.should.equal 'template'
    @templateOptions.profile.get('id').should.equal 'artsy-ed'

describe '#setProfile', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  it 'sets the profile from the vanity url and lets the next handler take it', ->
    req = { params: { id: 'foobar' } }
    res = { locals: sd: {} }
    routes.setProfile req, res, spy = sinon.spy()
    Backbone.sync.args[0][2].success fabricate 'profile', id: 'foobar'
    req.profile.get('id').should.equal 'foobar'
    spy.called.should.be.ok()

  it 'nexts if the profile already exists on the req', ->
    req =
      params: { id: 'foobar' }
      profile: new Profile fabricate 'profile'
    res = { locals: sd: {} }

    routes.setProfile req, res, next = sinon.spy()
    next.called.should.be.ok()
