_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
fabricate = require('@artsy/antigravity').fabricate
{ resolve } = require 'path'
SearchResult = require '../../../models/search_result'
SearchBarView = null

describe 'SearchBarView', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery'), sd: {}
      Backbone.$ = $
      SearchBarView = benv.require require.resolve '../view'
      Bloodhound = -> ttAdapter: sinon.stub(), initialize: sinon.stub()
      Bloodhound.tokenizers = obj: whitespace: sinon.stub()
      SearchBarView.__set__ 'Bloodhound', Bloodhound
      location.assign = sinon.stub()
      benv.render resolve(__dirname, '../templates/index.jade'), {}, =>
        @$input = $('#main-layout-search-bar-input')
        @$input.typeahead = sinon.stub()
        @view = new SearchBarView el: $('#main-layout-search-bar-container'), $input: @$input, mode: 'suggest'
        done()

  afterEach ->
    benv.teardown()

  describe '#initialize', ->
    it 'listens to the relevant events', ->
      @view._events.should.have.keys 'search:start', 'search:complete', 'search:opened', 'search:closed', 'search:cursorchanged'

    describe '#setupTypeahead', ->
      it 'triggers events that happen on the input on the view', (done) ->
        finish = _.after 4, (-> done())
        @view.once 'search:opened', finish
        @view.once 'search:closed', finish
        @view.once 'search:selected', finish
        @view.once 'search:cursorchanged', finish
        @$input.trigger 'typeahead:opened'
        @$input.trigger 'typeahead:closed'
        @$input.trigger 'typeahead:selected'
        @$input.trigger 'typeahead:cursorchanged'

      it 'sets up typeahead', ->
        @$input.typeahead.args[0][1].name.should.be.an.instanceOf String
        @$input.typeahead.args[0][1].templates.suggestion.should.be.an.instanceOf Function
        @$input.typeahead.args[0][1].template.should.equal 'custom'
        @$input.typeahead.args[0][1].displayKey.should.equal 'value'

  describe '#selectResult', ->
    it 'takes a search result model and sets window.location to the models location', ->
      model = new SearchResult(fabricate('artwork', model: 'artwork' ))
      model.collection = { models: [] }
      @view.selectResult({}, model)
      location.assign.args[0][0].should.equal model.get 'location'

  describe '#indicateLoading', ->
    beforeEach ->
      @view.trigger 'search:start'

    it 'triggers the loading state of the component', ->
      @view.$el.attr('class').should.containEql 'is-loading'

    it 'restores the feedback to the original state', ->
      @view.$el.html().should.containEql 'Search Artsy'

  describe '#concealLoading', ->
    it 'removes the loading state', ->
      @view.trigger 'search:start'
      @view.$el.attr('class').should.containEql 'is-loading'
      @view.trigger 'search:complete'
      _.isEmpty(@view.$el.attr('class')).should.be.ok()

  describe '#displaySuggestions', ->
    it 'displays the feedback when the input is empty', ->
      @view.$('.autocomplete-feedback').text ''
      _.isEmpty(@view.$('input').text()).should.be.true()
      @view.trigger 'search:opened'
      @view.$el.html().should.containEql 'Search Artsy'
      @view.$el.attr('class').should.containEql 'is-display-suggestions'

    it 'does not display the feedback when the input has text', ->
      @view.$('input').val 'Foo Bar'
      @view.trigger 'search:opened'
      _.isEmpty(@view.$el.attr('class')).should.be.true()

  describe '#hideSuggestions', ->
    it 'removes the open state', ->
      @view.trigger 'search:opened'
      @view.$el.attr('class').should.containEql 'is-display-suggestions'
      @view.trigger 'search:closed'
      _.isEmpty(@view.$el.attr('class')).should.be.true()

  describe '#displayFeedback', ->
    it 'does not render a message when there are results', ->
      @view.search.results.add(fabricate 'artist')
      @view.search.results.length.should.equal 1
      @view.trigger 'search:complete'
      @view.$el.html().should.not.containEql 'No results found'
      _.isEmpty(@view.$el.attr 'class').should.be.true()

    it 'hides the message if there are results after there had previously been none', ->
      @view.trigger 'search:complete'
      @view.search.results.add(fabricate 'artist')
      @view.trigger 'search:complete'
      _.isEmpty(@view.$el.attr 'class').should.be.true()

  describe '#feedbackString', ->
    it 'uses the mode if there is one available', ->
      @view.mode = 'artists'
      @view.feedbackString().should.equal 'Search for Artists…'

    it 'falls back to the default string', ->
      @view.feedbackString().should.equal 'Search Artsy'
