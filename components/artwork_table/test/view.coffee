_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
Artwork = require '../../../models/artwork.coffee'
Artworks = require '../../../collections/artworks.coffee'
{ fabricate } = require 'antigravity'
{ resolve } = require 'path'


describe 'ArtworkTableView', ->

  before (done) ->
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
        jQuery: benv.require 'jquery'
      Backbone.$ = $
      done()

      @ArtworkTableView = benv.requireWithJadeify resolve(
          __dirname, '../view.coffee'
        ), ['artworkTable']

      @ArtworkRowView = benv.requireWithJadeify resolve(
          __dirname, '../client/artwork_row_view.coffee'
        ), ['artworkRow']


      @ArtworkTableView.__set__ 'ArtworkRowView', @ArtworkRowView

  after ->
    benv.teardown()

  beforeEach ->

    @artworks = new Artworks([
      new Artwork fabricate 'artwork'
      new Artwork fabricate 'artwork'
      new Artwork fabricate 'artwork'
      new Artwork fabricate 'artwork'
      new Artwork fabricate 'artwork'
      new Artwork fabricate 'artwork'
      new Artwork fabricate 'artwork'
      new Artwork fabricate 'artwork'
    ])

    @view = new @ArtworkTableView
      el: $('body')
      collection: @artworks

  describe '#render', ->

    it 'should append all artworks to the table', ->
      @view.$el.find('.artwork-table__row').length.should.equal 8
      @view.length().should.equal 8

describe 'ArtworkRowView', ->

  before (done) ->
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
        jQuery: benv.require 'jquery'
      Backbone.$ = $
      done()

      @ArtworkRowView = benv.requireWithJadeify resolve(
          __dirname, '../client/artwork_row_view.coffee'
        ), ['artworkRow']
      @ArtworkRowView.__set__ 'sd', { INQUIRY_FLOW : 'original_flow' }

  after ->
    benv.teardown()

  beforeEach ->

    @artwork = new Artwork fabricate 'artwork'

    @view = new @ArtworkRowView
      model: @artwork
      $container: $('body')

  describe '#render', ->

    it 'should correctly render an artwork', ->
      @view.$el.find('.artwork-item-title').html().should.equal @artwork.titleAndYear()
      @view.$el.find('.artwork-table__cell--inquiry').html().should.containEql 'More Info'

    it 'should add the hover class to an image when the caption is moused over', ->
      @view.$el.find('.artwork-table__cell--caption').trigger 'mouseover'
      @view.$el.find('.hoverable-image-link').attr('class').should.containEql 'is-hovered'