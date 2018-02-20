_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
Params = require '../../../models/params'
categories = require '../../../../../apps/collect/fixtures/categories.json'
{ resolve } = require 'path'

describe 'HeadlineView', ->
  before (done) ->
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
        sd: {}
      Backbone.$ = $
      @HeadlineView = benv.requireWithJadeify resolve(__dirname, '../headline_view'), ['template']
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
    @view = new @HeadlineView params: @params

  describe '#color', ->
    it 'displays the proper color if set', ->
      @view.color().should.eql ""
      @view.params.set {color: 'black-and-white' } , silent: true
      @view.color().should.eql 'Black & White'

  describe '#medium', ->
    it 'displays the medium (or fallback)', ->
      @view.medium().should.eql 'Painting'
      @view.params.set { medium: 'film-slash-video' } , silent: true
      @view.medium().should.eql 'Film & Video'
      @view.params.unset 'medium' , silent: true
      @view.medium().should.eql 'Artworks'

  describe '#price', ->
    it 'displays the price_range if set', ->
      @view.price().should.eql 'Between $1,000 and $20,000'
      @view.params.set { price_range: '0-2000' } , silent: true
      @view.price().should.eql 'Below $2,000'
      @view.params.set { price_range: '420-50000' } , silent: true
      @view.price().should.eql 'Above $420'
