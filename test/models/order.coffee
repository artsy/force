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
      @order.update success: (->)
      Backbone.sync.args[0][1].url.should.include "api/v1/me/order/#{@order.id}"

  describe '#submit', ->
    it 'constructs the correct url', ->
      @order = new Order fabricate 'order'
      @order.submit success: (->)
      Backbone.sync.args[0][1].url.should.include "api/v1/me/order/#{@order.id}/submit"

  describe '#resume', ->
    it 'constructs the correct url', ->
      @order = new Order fabricate 'order'
      @order.resume success: (->)
      Backbone.sync.args[0][1].url.should.include "api/v1/me/order/#{@order.id}/resume"
