_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
mappedAggregations = require '../fixtures/mapped_aggregations.coffee'

describe 'FiltersView', ->

  before (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      @FiltersView = benv.requireWithJadeify resolve(__dirname, '../../views/filters_view'), ['template']

      done()

  after ->
    benv.teardown()

  beforeEach ->
    @view = new @FiltersView
      params: new Backbone.Model
      counts: new Backbone.Model

  it 'renders the template', ->
    @view.counts.aggregations = mappedAggregations
    @view.counts.totals = for_sale: 6, all: 26
    @view.counts.set for_sale: 3, silent: true
    @view.render()
    @view.$el.html().should.containEql '<h2>Works</h2>'
    @view.$el.find('.artsy-checkbox').length.should.eql 1
    @view.$el.find('ul').length.should.eql 4

  it 'toggleBool', ->
    @view.render = sinon.stub()
    e =
      target: $('<input type="checkbox" checked="checked" name="foo_bar" id="foo_bar">')[0]
      preventDefault: ->

    @view.toggleBool e

    @view.params.get('foo_bar').should.be.true()

    e =
      target: $('<input type="checkbox" name="foo_bar" id="foo_bar">')[0]
      preventDefault: ->

    @view.toggleBool e

    (@view.params.get('foo_bar') == undefined).should.be.true()

  it 'filterSelected forwards selection to params', ->
    @view.params.updateWith = sinon.stub()
    e =
      target: "<div data-key='a', data-value='b'>"
      preventDefault: ->
    @view.render = sinon.stub()
    @view.filterSelected e
    @view.params.updateWith.called.should.be.ok


  it 'filterDeselected forwards selection to params', ->
    @view.params.set a: 'b', silent: true
    e =
      target: "<div data-key='a'>"
      preventDefault: ->
    @view.render = sinon.stub()
    @view.filterDeselected e
    (@view.params.get('a') == undefined).should.be.true()

  it 'deletes truncation limit and triggers event', (done) ->
    @view.truncate = a: 5
    e =
      target: "<div data-key='a'>"
      preventDefault: ->
    @view.render = sinon.stub()
    @view.once 'filterExpanded', ->
      done()
    @view.seeAllClicked e
    (@view.truncate.a == undefined).should.be.true()
