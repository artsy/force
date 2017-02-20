sinon = require 'sinon'
Backbone = require 'backbone'
ArtworkInquiry = require '../../models/artwork_inquiry'

describe 'ArtworkInquiry', ->
  beforeEach ->
    @inquiry = new ArtworkInquiry

  describe '#send', ->
    beforeEach ->
      sinon.stub Backbone, 'sync'
        .yieldsTo 'success'
        .returns Promise.resolve()

    afterEach ->
      Backbone.sync.restore()

    it 'sends the inquiry immediately', ->
      success = sinon.spy()
      @inquiry.set(id: 'foo').send(null, success: success).then ->
        success.called.should.be.ok()
        Backbone.sync.args[0][2].url
          .should.containEql '/api/v1/me/artwork_inquiry_request/foo/send'

    it 'saves the inquiry first if its new', ->
      @inquiry.save = sinon.stub().returns Promise.resolve()
      @inquiry.send()
      @inquiry.save.called.should.be.ok()
