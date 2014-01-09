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

  describe "#sync", ->

    it 'injects the access token into sync', ->
      @user.set accessToken: 'foobar'
      @user.fetch()
      Backbone.sync.args[0][2].data.access_token.should.equal 'foobar'

    it 'doesnt override model data for create/update', ->
      @user.set accessToken: 'foobar', foo: 'bar'
      @user.save()
      Backbone.sync.args[0][2].data.foo.should.equal 'bar'

  describe '#saveArtwork', ->

    it 'makes the correct api call', ->
      @user.initializeDefaultArtworkCollection()
      @user.saveArtwork('masterpiece', null)
      Backbone.sync.args[1][0].should.equal 'create'

  describe '#removeArtwork', ->

    it 'makes the correct api call', ->
      @user.initializeDefaultArtworkCollection()
      @user.removeArtwork('masterpiece', null)
      Backbone.sync.args[1][0].should.equal 'delete'

  describe 'Order methods', ->

    beforeEach ->
      @user.set accessToken: 'foobar'

    describe '#fetchPendingOrder', ->

      it 'constructs the correct url', ->
        @user.fetchPendingOrder()
        Backbone.sync.args[0][2].url.should.include 'api/v1/me/order/pending'

    describe '#updateOrder', ->

      it 'constructs the correct url', ->
        @order = new Backbone.Model fabricate 'order'
        @user.updateOrder @order.id, success: (order) =>
          order.id.should.equal 'updated'
        Backbone.sync.args[0][2].url.should.include "api/v1/me/order/#{@order.id}"
        Backbone.sync.args[0][2].success(fabricate 'order', id: 'updated')

    describe '#submitOrder', ->

      it 'constructs the correct url', ->
        @order = new Backbone.Model fabricate 'order', state: 'pending'
        @user.submitOrder @order.id, success: (order) =>
          order.get('state').should.equal 'submitted'
        Backbone.sync.args[0][2].url.should.include "api/v1/me/order/#{@order.id}/submit"
        Backbone.sync.args[0][2].success(fabricate 'order', state: 'submitted')

    describe '#resumeOrder', ->

      it 'constructs the correct url', ->
        @order = new Backbone.Model fabricate 'order', { state: 'abandonned', token: 'abcdef' }
        @user.resumeOrder @order.id, @order.token, success: (order) =>
          order.get('state').should.equal 'pending'
        Backbone.sync.args[0][2].url.should.include "api/v1/me/order/#{@order.id}/resume"
        Backbone.sync.args[0][2].success(fabricate 'order', state: 'pending')


