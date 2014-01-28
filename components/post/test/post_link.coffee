_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
PostLink = require '../models/post_link'

describe 'PostAttachments', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @postLink = new PostLink
      id: _.uniqueId()
      position: 1
      type: "PostLink"
      url: "http://www.youtube.com/watch?v=d7zaja7ytWI"
      oembed_json:
        height: 338
        thumbnail_height: 360
        thumbnail_width: 480
        width: 600
      oembed_status: "success"

  afterEach ->
    Backbone.sync.restore()

  describe '#maxHeightForWidth', ->

    it 'correct height', ->
      @postLink.maxHeightForWidth(100).should.equal 75
      @postLink.maxHeightForWidth(600).should.equal 360
      @postLink.get('oembed_json').type = 'photo'
      @postLink.maxHeightForWidth(100).should.equal 56.333333333333336
      @postLink.maxHeightForWidth(600).should.equal 338


  describe '#maxWidthForWidth', ->

    it 'returns correct width', ->
      @postLink.maxWidthForWidth(100).should.equal 100
      @postLink.maxWidthForWidth(600).should.equal 480
      @postLink.get('oembed_json').type = 'photo'
      @postLink.maxWidthForWidth(100).should.equal 100
      @postLink.maxWidthForWidth(600).should.equal 600

  describe '#aspectRatio', ->

    it 'returns aspect ratio', ->
      @postLink.aspectRatio().should.equal 0.75
      @postLink.set aspect_ratio: 1.1
      @postLink.aspectRatio().should.equal 1.1

  describe '#imageWidth', ->

    it 'returns returns oembed width over thumbnail width', ->
      @postLink.imageWidth().should.equal 480
      @postLink.get('oembed_json').type = 'photo'
      @postLink.imageWidth().should.equal 600

  describe '#imageHeight', ->

    it 'returns height', ->
      @postLink.imageHeight().should.equal 360
      @postLink.get('oembed_json').type = 'photo'
      @postLink.imageHeight().should.equal 338
