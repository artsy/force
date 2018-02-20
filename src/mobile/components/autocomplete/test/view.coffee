_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
AutoCompleteView = benv.requireWithJadeify resolve(__dirname, '../view'), [
  'template'
  'emptyTemplate'
  'resultTemplate'
]

describe 'AutoCompleteView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @view = new AutoCompleteView
    @view.render()
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe '#render', ->
    it 'renders the form template', ->
      @view.$('.autocomplete-input').should.have.lengthOf 1
      @view.$('.autocomplete-results').should.have.lengthOf 1

  describe '#search', ->
    beforeEach ->
      @view.$('input').val 'Test'
      @view.__search__()

    it 'searches for the term', ->
      Backbone.sync.args[0][2].data.term.should.equal 'Test'

    it 'renders the results', ->
      Backbone.sync.args[0][2].success [
        { display: 'Test Result (1)' }
        { display: 'Test Result (2)' }
      ]
      @view.$('.search-result').should.have.lengthOf 2
      @view.$('.search-result-display').map(-> $(this).text()).get().should.eql [
        'Test Result (1)'
        'Test Result (2)'
      ]

  describe '#trap', ->
    beforeEach ->
      @view.$('.js-autocomplete-input-shield').click()
      @view.$('.autocomplete-input').val 'Test'
      @view.__search__()
      Backbone.sync.args[0][2].success [
        { display: 'Test Result (1)' }
        { display: 'Test Result (2)' }
      ]

    it 'allows links to be tapped without deactivating the component from losing focus', ->
      @view.$el.hasClass('is-active').should.be.true()
      @view.$('.search-result').click()
      @view.trapping.should.be.true()
      @view.$el.hasClass('is-active').should.be.true()

    it 'allows the input to be closed anyway', (done) ->
      @view.$el.hasClass('is-active').should.be.true()
      @view.$('.js-autocomplete-close').click()
      _.defer => _.defer =>
        @view.$el.hasClass('is-active').should.be.false()
        done()
