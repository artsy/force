_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
Order = require '../../models/order'
{ fabricate } = require 'antigravity'

describe 'Order', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe '#fetch', ->
    it 'constructs the correct url', ->
      (new Order).fetch()
      Backbone.sync.args[0][2].url.should.include 'api/v1/me/order/pending'

  describe '#update', ->
    it 'constructs the correct url', ->
      @order = new Order fabricate 'order'
      @order.update success: (order) =>
        order.id.should.equal 'updated'
      Backbone.sync.args[0][1].url.should.include "api/v1/me/order/#{@order.id}"
      Backbone.sync.args[0][2].success(fabricate 'order', id: 'updated')

  describe '#submit', ->
    it 'constructs the correct url', ->
      @order = new Order fabricate 'order', state: 'pending'
      @order.submit success: (order) =>
        order.get('state').should.equal 'submitted'
      Backbone.sync.args[0][1].url.should.include "api/v1/me/order/#{@order.id}/submit"
      Backbone.sync.args[0][2].success(fabricate 'order', state: 'submitted')

  describe '#resume', ->
    it 'constructs the correct url', ->
      @order = new Order fabricate 'order', state: 'abandonned'
      @order.resume success: (order) =>
        order.get('state').should.equal 'pending'
      Backbone.sync.args[0][1].url.should.include "api/v1/me/order/#{@order.id}/resume"
      Backbone.sync.args[0][2].success(fabricate 'order', state: 'pending')
