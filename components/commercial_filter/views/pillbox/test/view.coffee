_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
Params = require '../../../models/params'
categories = require '../../../../../apps/collect/fixtures/categories.json'
{ resolve } = require 'path'

describe 'PillboxView', ->
  before (done) ->
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
        sd: {}
      Backbone.$ = $
      @PillboxView = benv.requireWithJadeify resolve(__dirname, '../pillbox_view'), ['template']
      done()

  after ->
    benv.teardown()

  beforeEach ->
    paramAttrs =
      medium: 'painting'
      gene_id: 'abstract-art'
      price_range: '1000-20000'
      width: '24.00-120.00'
      height: '1.00-107.00'
    @params = new Params paramAttrs, categoryMap: categories
    @artworks = new Backbone.Collection
    @view = new @PillboxView
      params: @params
      artworks: @artworks
      categoryMap: categories

  describe '#category', ->
    it 'gets the proper category if medium and gene_id are set', ->
      @view.category().name.should.eql 'Abstract Art'
      @view.params.set { gene_id: 'east-asian-ink-and-wash-painting' } , silent: true
      @view.category().name.should.eql 'Ink & Wash'

  describe '#medium', ->
    it 'gets the proper category if medium is set', ->
      @view.medium().should.eql 'Painting'
      @view.params.set { medium: 'film-slash-video' } , silent: true
      @view.medium().should.eql 'Film & Video'

  describe '#size', ->
    it 'gets the proper size if attribute is set', ->
      @view.size('Height', 'height').should.eql 'Height: 1 – 107 in'
      @view.size('Width', 'width').should.eql 'Width: 24 – 120+ in'

  describe '#price', ->
    it 'gets the proper size if attribute is set', ->
      @view.price().should.eql '$1,000 – 20,000'
