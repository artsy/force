benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
QuasiInfiniteView = benv.requireWithJadeify require.resolve('../view'), ['template']

class ViewFromQuasiInfiniteView extends QuasiInfiniteView
  kind: 'tests'

  initialize: ->
    @params = new Backbone.Model page: 1
    @collection = new Backbone.Collection
    super

describe 'QuasiInfiniteView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'

    $.waypoints or= -> #
    $.fn.waypoint or= -> #
    sinon.stub $, 'waypoints'
    sinon.stub $.fn, 'waypoint'

    @view = new ViewFromQuasiInfiniteView

  afterEach ->
    Backbone.sync.restore()

    $.waypoints.restore()
    $.fn.waypoint.restore()

  describe '#render', ->
    it 'renders the template', ->
      @view.render().$el.html().should.containEql 'Nothing yet.'

  describe '#updateCounts', ->
    it 'returns the correct `total` and `remaining` when the collection is empty', ->
      @view.updateCounts().should.eql
        total: 0, remaining: 0

    it 'returns the correct `total` and `remaining` when the collection is fetched and returns a response', ->
      @view.collection.totalCount = 5
      Backbone.sync
        .onCall 0
        .yieldsTo 'success', [
          { id: 'foo' }
          { id: 'bar' }
        ]
        .returns Promise.resolve()
        .onCall 1
        .yieldsTo 'success', [
          { id: 'baz' }
        ]
        .returns Promise.resolve()

      @view.fetch()
      @view.updateCounts().should.eql
        total: 5, remaining: 3
      @view.fetch()
      @view.updateCounts().should.eql
        total: 5, remaining: 2

  describe '#detectEnd', ->
    it 'removes the "More (n)" button when there is 0 remaining', ->
      @view.collection.totalCount = 2
      Backbone.sync
        .onCall 0
        .yieldsTo 'success', [
          { id: 'foo' }
        ]
        .returns Promise.resolve()
        .onCall 1
        .yieldsTo 'success', [
          { id: 'bar' }
        ]
        .returns Promise.resolve()

      @view.fetch()
      @view.$el.html().should.containEql '2 tests'
      @view.$(@view.selectors.more)
        .should.have.lengthOf 1
      @view.$(@view.selectors.more).text()
        .should.equal 'More (1)'
      @view.fetch()
      @view.$(@view.selectors.more)
        .should.have.lengthOf 0

  describe '#tripInfinite', ->
    it 'initializes the infinite scrolling mode on the 2nd page (once)', ->
      Backbone.sync.yieldsTo 'success', []

      @view.params.get 'page'
        .should.equal 1

      Backbone.sync.callCount
        .should.equal 0
      @view.$el.waypoint.callCount
        .should.equal 0

      @view.nextPage()
      @view.params.get 'page'
        .should.equal 2

      Backbone.sync.callCount
        .should.equal 1
      @view.$el.waypoint.callCount
        .should.equal 1

      @view.nextPage()

      Backbone.sync.callCount
        .should.equal 2
      @view.$el.waypoint.callCount
        .should.equal 1
