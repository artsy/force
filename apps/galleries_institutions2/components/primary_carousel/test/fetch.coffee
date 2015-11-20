sinon = require 'sinon'
Backbone = require 'backbone'
PrimaryCarousel = require '../fetch'

xdescribe 'PrimaryCarousel', ->
  describe '#fetch', ->
    beforeEach ->
      sinon.stub Backbone, 'sync'
      Backbone.sync
        .yieldsTo 'success', {}
        .returns Promise.resolve {}

    afterEach ->
      Backbone.sync.restore()

    xit 'fetches the content', ->
      # todo
