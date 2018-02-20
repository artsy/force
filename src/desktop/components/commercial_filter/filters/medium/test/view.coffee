_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
Params = require '../../../models/params'
categories = require '../../../../../apps/collect/fixtures/categories.json'
{ resolve } = require 'path'

describe 'MediumFilterView', ->
  before (done) ->
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
        sd: {}
      Backbone.$ = $
      @MediumFilterView = benv.requireWithJadeify resolve(__dirname, '../medium_filter_view'), ['template']
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
    @aggregations = new Backbone.Collection
    @view = new @MediumFilterView params: @params, aggregations: @aggregations
    @params.trigger 'change:medium'

  describe '#setMedium', ->
    it 'sets the medium, or clears other params if medium is already set', ->
      @view.$('.cf-mediums__option')[3].click()
      @params.get('medium').should.eql 'sculpture'
      @params.get('price_range').should.eql '1000-20000'
      # click again to clear
      @view.$('.cf-mediums__option')[3].click()
      @params.has('price_range').should.be.false()
