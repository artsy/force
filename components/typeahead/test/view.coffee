benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
Suggestion = require '../../../models/suggestion'
TypeaheadView = benv.requireWithJadeify require.resolve('../view'), [
  'templates.index'
  'templates.empty'
  'templates.suggestion'
]

describe 'TypeaheadView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      $.fn.typeahead = -> this
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @view = new TypeaheadView
      placeholder: 'Search Foobars...'
    @view.engine = initialize: (->)
    @view.render()

  afterEach ->
    @view.remove()

  describe '#initialize', ->
    it 'sets up a reasonable set of defaults (that may be overwritten)', ->
      @view.options.should.eql
        placeholder: 'Search Foobars...'
        autofocus: false
        highlight: false
        hint: true
        nameAttr: 'name'
        param: 'term'
        wildcard: ':query'
        url: null
        kind: null
        selected: []

  describe '#exclude', ->
    it 'adds an ID to the list of previously selected IDs', ->
      @view.selected.should.eql []
      @view.exclude 'one'
      @view.selected.should.eql ['one']
      @view.exclude 'one'
      @view.selected.should.eql ['one']
      @view.exclude 'two'
      @view.selected.should.eql ['one', 'two']

    it 'adds a list of IDs to the list of previously selected IDs', ->
      @view.selected.should.eql []
      @view.exclude 'one', 'two'
      @view.selected.should.eql ['one', 'two']
      @view.exclude 'one', 'two', 'three', 'four'
      @view.selected.should.eql ['one', 'two', 'three', 'four']

  describe '#withoutSelected', ->
    it 'returns the suggestions sans the previously selected suggestions', ->
      @view.exclude 'one', 'four'
      @view.withoutSelected([
        { id: 'one' }
        { id: 'two' }
        { id: 'three' }
        { id: 'four' }
      ]).should.eql [
        { id: 'two' }
        { id: 'three' }
      ]

  describe '#render', ->
    it 'renders the template', ->
      @view.$('input').should.have.lengthOf 1
      @view.$('input').attr 'placeholder'
        .should.equal 'Search Foobars...'

  describe 'selecting a suggestion', ->
    it 'triggers the `selected` event', (done) ->
      @view.once 'selected', (suggestion) ->
        suggestion.id.should.equal 'foobar'
        done()
      @view.input().trigger 'typeahead:selected', id: 'foobar'

    it 'excludes the selected ID', ->
      @view.selected.should.eql []
      @view.input().trigger 'typeahead:selected', id: 'foobar'
      @view.selected.should.eql ['foobar']
