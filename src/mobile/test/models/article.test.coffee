_ = require 'underscore'
Q = require 'bluebird-q'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
rewire = require 'rewire'
Article = rewire '../../models/article.coffee'
sinon = require 'sinon'
fixtures = require '../helpers/fixtures.coffee'

describe "Article", ->
  beforeEach ->
    sinon.stub Backbone, 'sync'
    @article = new Article fixtures.article
    Article.__set__ 'sd', { FAIR_CHANNEL_ID: '12345' }

  afterEach ->
    Backbone.sync.restore()

  describe '#fetchRelated', ->

    it 'sets a fair if there is one', ->
      Backbone.sync
        .onCall 0
        .yieldsTo 'success', [fabricate 'article']
        .returns Q.resolve [fabricate 'article']
        .onCall 1
        .yieldsTo 'success', fabricate 'fair'
        .returns Q.resolve fabricate 'fair'
      @article.set
        id: 'id-1'
        fair_ids: ['123']
        channel_id: '12345'
      @article.fetchRelated success: (data) ->
        data.fair.get('default_profile_id').should.equal 'the-armory-show'

    it 'sets a partner if there is one', ->
      Backbone.sync
        .onCall 0
        .yieldsTo 'success', [fabricate 'article']
        .returns Q.resolve [fabricate 'article']
        .onCall 1
        .yieldsTo 'success', fabricate 'partner'
        .returns Q.resolve fabricate 'partner'
      @article.set
        id: 'id-1'
        partner_channel_id: '147'
      @article.fetchRelated success: (data) ->
        data.partner.get('default_profile_id').should.equal 'gagosian'

  describe '#isFairArticle', ->

    it 'returns true for a fair article', ->
      @article.set 'channel_id', '12345'
      @article.set 'fair_ids', ['123']
      @article.isFairArticle().should.be.true()

    it 'returns false for a non fair article', ->
      @article.set 'channel_id', '12345'
      @article.set 'fair_ids', []
      @article.isFairArticle().should.be.false()
