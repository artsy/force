_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
PostAttachments = require '../collections/post_attachments'

describe 'PostAttachments', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @postAttachments = new PostAttachments [
      {
        id: _.uniqueId()
        position: 1
        type: "PostLink"
        url: "http://www.youtube.com/watch?v=d7zaja7ytWI"
      }, {
        id: _.uniqueId()
        html: "<iframe></iframe>"
        position: 4
        sanitized_html: "<iframe></iframe>"
        type: "PostEmbed"
      }, {
        id: _.uniqueId()
        position: 3
        type: "PostArtwork"
        artwork: fabricate('artwork')
      }, {
        aspect_ratio: 1.03
        id: _.uniqueId()
        image_url: "http://static0.artsy.net/post_images/52e04ab39acc8aa27e000267/:version.jpg"
        image_versions: ['medium_rectangle', 'large_rectangle', 'small', 'large', 'larger']
        original_height: 1648
        original_width: 1703
        position: 2
        type: "PostImage"
      }
    ]

  afterEach ->
    Backbone.sync.restore()

  describe 'sort', ->

    it 'should be ordered by position', ->
      @postAttachments.models[0].get('position').should.equal 1
      @postAttachments.models[1].get('position').should.equal 2
      @postAttachments.models[2].get('position').should.equal 3
      @postAttachments.models[3].get('position').should.equal 4

  describe 'model', ->

    it 'returns correct model', ->
      @postAttachments.models[0].constructor.name.should.equal 'PostLink'
      @postAttachments.models[1].constructor.name.should.equal 'PostImage'
      @postAttachments.models[2].constructor.name.should.equal 'PostArtwork'
      @postAttachments.models[3].constructor.name.should.equal 'PostEmbed'
