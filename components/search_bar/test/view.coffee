_             = require 'underscore'
benv          = require 'benv'
Backbone      = require 'backbone'
sinon         = require 'sinon'
fabricate     = require('antigravity').fabricate
{ resolve }   = require 'path'

SearchResult    = require '../../../models/search_result'
SearchBarView   = require '../view'

Bloodhound = -> ttAdapter: sinon.stub(), initialize: sinon.stub()
Bloodhound.tokenizers = obj: whitespace: sinon.stub()

describe 'SearchBarView', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
        Bloodhound: Bloodhound
      Backbone.$ = $

      benv.render resolve(__dirname, '../template.jade'), {}, =>
        @indicateLoadingSpy     = sinon.spy SearchBarView::, 'indicateLoading'
        @concealLoadingSpy      = sinon.spy SearchBarView::, 'concealLoading'
        @selectResultSpy        = sinon.spy SearchBarView::, 'selectResult'
        @displaySuggestionsSpy  = sinon.spy SearchBarView::, 'displaySuggestions'
        @hideSuggestionsSpy     = sinon.spy SearchBarView::, 'hideSuggestions'

        @$input             = $('#main-layout-search-bar-input')
        @$input.typeahead   = sinon.stub()

        @view = new SearchBarView
          el     : $('#main-layout-search-bar-container')
          $input : @$input
        done()

  afterEach ->
    @indicateLoadingSpy.restore()
    @concealLoadingSpy.restore()
    @selectResultSpy.restore()
    @displaySuggestionsSpy.restore()
    @hideSuggestionsSpy.restore()
    benv.teardown()

  describe '#initialize', ->
    it 'listens to the relevant events', ->
      @view._events.should.have.keys('search:start', 'search:complete', 'search:opened', 'search:closed')

    describe '#setupTypeahead', ->
      it 'triggers events that happen on the input on the view', (done) ->
        finish = _.after 3, (-> done())
        @view.on 'search:opened', finish
        @view.on 'search:closed', finish
        @view.on 'search:selected', finish
        @$input.trigger 'typeahead:opened'
        @$input.trigger 'typeahead:closed'
        @$input.trigger 'typeahead:selected'
        @view.off 'search:opened'
        @view.off 'search:closed'
        @view.off 'search:selected'

      it 'sets up typeahead', ->
        @$input.typeahead.args[0][1].name.should.be.an.instanceOf String
        @$input.typeahead.args[0][1].templates.suggestion.should.be.an.instanceOf Function
        @$input.typeahead.args[0][1].template.should.equal 'custom'
        @$input.typeahead.args[0][1].displayKey.should.equal 'value'

  describe '#selectResult', ->
    it 'takes a search result model and sets window.location to the models location', ->
      model = new SearchResult(fabricate('artwork', model: 'artwork'))
      @view.selectResult({}, model)
      window.location.should.equal model.get 'location'

  it 'responds to search:start with #indicateLoading', ->
    @view.trigger 'search:start'
    @indicateLoadingSpy.called.should.be.ok

  it 'responds to search:complete with #concealLoading', ->
    @view.trigger 'search:complete'
    @concealLoadingSpy.called.should.be.ok

  it 'responds to search:opened with #displaySuggestions', ->
    @view.trigger 'search:opened'
    @displaySuggestionsSpy.called.should.be.ok

  it 'responds to search:closed with #hideSuggestions', ->
    @view.trigger 'search:closed'
    @hideSuggestionsSpy.called.should.be.ok
