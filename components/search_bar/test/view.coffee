_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
fabricate = require('antigravity').fabricate
{ resolve } = require 'path'

SearchResult = require '../../../models/search_result'
SearchBarView = require '../view'

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
        @$input = $('#main-layout-search-bar-input')
        @$input.typeahead = sinon.stub()

        @view = new SearchBarView
          el: $('#main-layout-search-bar-container')
          $input: @$input
        done()

  afterEach ->
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

  describe '#indicateLoading', ->
    beforeEach ->
      @view.trigger 'search:start'

    it 'triggers the loading state of the component', ->
      @view.$el.attr('class').should.containEql 'is-loading'

    it 'restores the feedback to the original state', ->
      @view.$el.html().should.containEql 'Search Artists, Artworks, Galleries, Museums, Categories'

  describe '#concealLoading', ->
    it 'removes the loading state', ->
      @view.trigger 'search:start'
      @view.$el.attr('class').should.containEql 'is-loading'
      @view.trigger 'search:complete'
      @view.$el.attr('class').should.not.containEql 'is-loading'

  describe '#displaySuggestions', ->
    it 'displays the feedback when the input is empty', ->
      @view.$('.autocomplete-feedback').text ''
      _.isEmpty(@view.$('input').text()).should.be.true
      @view.trigger 'search:opened'
      @view.$el.html().should.containEql 'Search Artists, Artworks, Galleries, Museums, Categories'
      @view.$el.attr('class').should.containEql 'is-display-suggestions'

    it 'does not display the feedback when the input has text', ->
      @view.$('input').val 'Foo Bar'
      @view.trigger 'search:opened'
      _.isEmpty(@view.$el.attr('class')).should.be.true

  describe '#hideSuggestions', ->
    it 'removes the open state', ->
      @view.trigger 'search:opened'
      @view.$el.attr('class').should.containEql 'is-display-suggestions'
      @view.trigger 'search:closed'
      _.isEmpty(@view.$el.attr('class')).should.be.true

  describe '#displayFeedback', ->
    it 'does not render a message when there are results', ->
      @view.search.results.add(fabricate 'artist')
      @view.search.results.length.should.equal 1
      @view.trigger 'search:complete'
      @view.$el.html().should.not.containEql 'No results found'
      _.isEmpty(@view.$el.attr 'class').should.be.true

    it 'renders a message when there are no results', ->
      @view.search.results.length.should.equal 0
      @view.trigger 'search:complete'
      @view.$el.html().should.containEql 'No results found'
      @view.$el.attr('class').should.containEql 'is-no-results'

    it 'hides the message if there are results after there had previously been none', ->
      @view.trigger 'search:complete'
      @view.$el.attr('class').should.containEql 'is-no-results'
      @view.search.results.add(fabricate 'artist')
      @view.trigger 'search:complete'
      _.isEmpty(@view.$el.attr 'class').should.be.true

  describe '#feedbackString', ->
    it 'uses the mode if there is one available', ->
      @view.mode = 'artists'
      @view.feedbackString().should.equal 'Search for Artists…'

    it 'falls back to the default string', ->
      @view.feedbackString().should.equal 'Search Artists, Artworks, Galleries, Museums, Categories…'
