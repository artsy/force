_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
Params = require '../../../models/params'
categories = require '../../../../../apps/collect/fixtures/categories.json'
{ resolve } = require 'path'

describe 'ColorFilterView', ->
  before (done) ->
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
        sd: {}
      Backbone.$ = $
      @ColorFilterView = benv.requireWithJadeify resolve(__dirname, '../color_filter_view'), ['template']
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @params = new Params {}, categoryMap: categories
    @aggregations = new Backbone.Collection
    @view = new @ColorFilterView params: @params, aggregations: @aggregations

  describe '#toggleColor', ->
    it 'sets the color or clears if already set', ->
      @view.$('.st10').click()
      @params.get('color').should.eql 'red'
      # click again to clear
      @view.$('.st10').click()
      @params.has('color').should.be.false()
