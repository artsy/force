_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
mappedAggregations = require '../fixtures/mapped_aggregations.coffee'

describe 'HeaderCountView', ->

  before (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      @HeaderCountView = benv.requireWithJadeify resolve(__dirname, '../../views/header_count_view'), ['template']

      done()

  after ->
    benv.teardown()

  beforeEach ->
    @view = new @HeaderCountView
      params: new Backbone.Model
      counts: new Backbone.Model for_sale: 3, all: 5

  it 'renders correctly', ->
    @view.render().$el.text().should.containEql '5 works, 3 for sale'
    @view.params.set 'for_sale', true, silent: true
    @view.render().$el.text().should.containEql '3 works for sale'
    @view.params.set 'for_sale', false, silent: true
    @view.counts.set 'for_sale', 5, silent: true
    @view.render().$el.text().should.containEql '5 works for sale'
