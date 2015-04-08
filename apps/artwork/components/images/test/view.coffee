benv = require 'benv'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Artwork = require '../../../../../models/artwork'
ImagesView = benv.requireWithJadeify resolve(__dirname, '../view'), ['template']

describe 'ImagesView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @artwork = new Artwork fabricate 'artwork'
    @view = new ImagesView model: @artwork, collection: @artwork.related().images
    @view.render()

  describe '#render', ->
    it 'renders correctly', ->
      @view.$('#the-artwork-image').attr('width').should.equal '640'
      @view.$('#the-artwork-image').attr('height').should.equal '374'
      @view.$('.artwork-additional-image').should.have.lengthOf 2
      @view.$('.is-active').data('id').should.equal parseInt(@view.collection.first().id)

  describe '#change', ->
    it 're-renders the view with the correct active image', ->
      @view.$('.artwork-additional-image').last().click()
      @view.$('.is-active').data('id').should.equal parseInt(@view.collection.last().id)
