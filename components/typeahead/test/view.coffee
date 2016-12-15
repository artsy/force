benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
Suggestion = require '../../../models/suggestion'
TypeaheadView = null

describe 'TypeaheadView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      TypeaheadView = benv.requireWithJadeify require.resolve('../view'), [
        'templates.index'
        'templates.empty'
        'templates.suggestion'
      ]
      Backbone.$ = $
      $.fn.typeahead = -> this
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @view = new TypeaheadView placeholder: 'Search Foobars...'
    @view.render()

  afterEach ->
    @view.remove()

  describe '#initialize', ->
    it 'sets up a reasonable set of defaults (that may be overwritten)', ->
      @view.options.should.eql
        placeholder: 'Search Foobars...'
        autofocus: false
        autoselect: true
        headers: {}
        highlight: false
        hint: true
        nameAttr: 'name'
        param: 'term'
        path: null
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

  describe 'parsing results', ->
    it 'accepts a `path` and a `nameAttr` option for pulling out result sets', ->
      view = new TypeaheadView
        nameAttr: 'display'
        path: '_embedded.galleries'

      models = view.parse {
        _embedded: {
          galleries: [
            { id: 'some-gallery', display: 'Some Gallery' }
            { id: 'some-other-gallery', display: 'Some Other Gallery' }
          ]
        }
      }

      models[0].get 'name'
        .should.equal 'Some Gallery'
      models[1].get 'name'
        .should.equal 'Some Other Gallery'
