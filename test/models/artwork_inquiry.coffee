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

    afterEach ->
      Backbone.sync.restore()

    it 'sends the inquiry immediately', (done) ->
      @inquiry.send null, success: ->
        true.should.be.true()
        done()
      Backbone.sync.args[0][2].url
        .should.containEql '/api/v1/me/artwork_inquiry_request/send'
