CurrentUser = require '../../models/current_user'
fabricate = require('antigravity').fabricate
sinon = require 'sinon'
Backbone = require 'backbone'

describe 'CurrentUser', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @user = new CurrentUser fabricate 'user'

  afterEach ->
    Backbone.sync.restore()

  it 'injects the access token into sync', ->
    @user.set accessToken: 'foobar'
    @user.fetch()
    Backbone.sync.args[0][2].data.access_token.should.equal 'foobar'