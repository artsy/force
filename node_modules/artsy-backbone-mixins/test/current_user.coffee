_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
CurrentUser = require '../lib/current_user'

class User extends Backbone.Model

  _.extend @prototype, CurrentUser('http://artsy.net')

describe 'CurrentUser Mixin', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @user = new User

  afterEach ->
    Backbone.sync.restore()

  describe "#unlinkAccount", ->

    it 'unlinks the user from a provider', ->
      @user.unlinkAccount 'facebook'
      Backbone.sync.args[0][1].url.should.include 'v1/me/authentications/facebook'

  describe '#sync', ->

    it 'adds the access token to data for fetches', ->
      @user.set accessToken: 'foobarbaz'
      @user.fetch()
      Backbone.sync.args[0][2].data.access_token.should.equal 'foobarbaz'

    xit 'adds the access token to attrs for saves', ->
      @user.set accessToken: 'foobarbaz'
      @user.save()
      Backbone.sync.args[0][2].attrs