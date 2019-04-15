benv = require 'benv'
sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
TypeaheadView = null
ResultsListView = null

describe 'ResultsListView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      TypeaheadView = benv.requireWithJadeify require.resolve('../../typeahead/view'), [
        'templates.index'
        'templates.empty'
        'templates.suggestion'
      ]
      ResultsView = benv.requireWithJadeify require.resolve('../views/results'), ['template']
      ResultsListView = rewire '../view'
      ResultsListView.__set__ 'ResultsView', ResultsView
      $.fn.typeahead = -> this
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @view = new ResultsListView
      typeahead: new TypeaheadView

  describe '#render', ->
    beforeEach ->
      @view.render()

    it 'composes the typeahead and results list and renders both', ->
      @view.$('.typeahead').should.have.lengthOf 1
      @view.$('.results-list').should.have.lengthOf 1

    it 're-renders the collection when appropriate', ->
      @view.typeahead.trigger 'selected', new Backbone.Model name: 'Foo Bar'
      @view.$('.results-list-item').should.have.lengthOf 1
      @view.$('.results-list-item').text()
        .should.equal 'Foo Bar'
