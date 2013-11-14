_           = require 'underscore'
rewire      = require 'rewire'
benv        = require 'benv'
Backbone    = require 'backbone'
cheerio     = require 'cheerio'
sinon       = require 'sinon'
fabricate   = require('antigravity').fabricate

mediator        = require '../../../../../lib/mediator.coffee'
SearchResult    = require '../models/search_result.coffee'
SearchBarView   = rewire '../view'

describe 'SearchBarView', ->
  beforeEach (done) ->
    benv.setup =>
      $ = cheerio.load(document.documentElement.innerHTML)
      Backbone.$ = $
      benv.render '../template.jade', {}, =>
        @$input =
          on: sinon.stub()
          off: sinon.stub()
          typeahead: sinon.stub()
          val: -> true
        @indicateLoadingSpy     = sinon.spy SearchBarView.prototype, 'indicateLoading'
        @concealLoadingSpy      = sinon.spy SearchBarView.prototype, 'concealLoading'
        @selectResultSpy        = sinon.spy SearchBarView.prototype, 'selectResult'
        @displaySuggestionsSpy  = sinon.spy SearchBarView.prototype, 'displaySuggestions'
        @hideSuggestionsSpy     = sinon.spy SearchBarView.prototype, 'hideSuggestions'
        @view = new SearchBarView
          el: $('#main-layout-search-bar-container')
          $input: @$input
        done()

  afterEach ->
    @indicateLoadingSpy.restore()
    @concealLoadingSpy.restore()
    @selectResultSpy.restore()
    @displaySuggestionsSpy.restore()
    @hideSuggestionsSpy.restore()

  describe '#initialize', ->
    it 'has the mediator subscribe to relevant events', ->
      _.each [
        'search:start',
        'search:complete',
        'search:selected',
        'search:opened',
        'search:closed'
      ], (action) ->
        Object.keys(mediator._events).should.include action

    describe '#setupTypeahead', ->
      it 'attaches event handlers that proxy to mediator', ->
        _.each [
          'typeahead:selected',
          'typeahead:opened',
          'typeahead:closed'
        ], (action) =>
          _.flatten(@$input.on.args).should.include action

      it 'sets up typeahead', ->
        @$input.typeahead.args[0][0].should.include
          template: 'custom'
          name: 'search'
          limit: 10

  describe '#selectResult', ->
    it 'takes a search result model and sets window.location to the models location', ->
      model = new SearchResult(fabricate('artwork', model: 'artwork'))
      @view.selectResult({}, model)
      window.location.should.equal model.get 'location'

  it 'responds to search:start with #indicateLoading', ->
    mediator.trigger 'search:start'
    @indicateLoadingSpy.called.should.be.ok

  it 'responds to search:complete with #concealLoading', ->
    mediator.trigger 'search:complete'
    @concealLoadingSpy.called.should.be.ok

  it 'responds to search:selected with #selectResult', ->
    model = new SearchResult(fabricate('artwork', model: 'artwork'))
    mediator.trigger 'search:selected', {}, model
    @selectResultSpy.called.should.be.ok
    window.location.should.equal model.get 'location'

  it 'responds to search:opened with #displaySuggestions', ->
    mediator.trigger 'search:opened'
    @displaySuggestionsSpy.called.should.be.ok

  it 'responds to search:closed with #hideSuggestions', ->
    mediator.trigger 'search:closed'
    @hideSuggestionsSpy.called.should.be.ok

