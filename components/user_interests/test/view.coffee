_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
UserInterestsView = benv.requireWithJadeify require.resolve('../view'), [
  'template'
  'collectionTemplate'
]
UserInterestsView.__set__ 'CURRENT_USER', 'existy'
UserInterestsView.__set__ 'TypeaheadView', Backbone.View

describe 'UserInterestsView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @view = new UserInterestsView

  afterEach ->
    Backbone.sync.restore()

  describe '#render', ->
    beforeEach ->
      @view.render()

    it 'renders the base template', ->
      @view.$('.js-user-interests-search')
        .should.have.lengthOf 1
      @view.$('.js-user-interests-results')
        .should.have.lengthOf 1

  describe '#interested, #renderCollection', ->
    beforeEach ->
      @view.render()
      interest = new Backbone.Model id: 'foobar', name: 'Foo Bar'
      @view.typeahead.trigger 'selected', interest

    it 'listens to the autocomplete instance and triggers an `interested`, which renders the interest', ->
      @view.$('.user-interest').length.should.equal 1
      @view.$('.user-interest-name').text().should.equal 'Foo Bar'

    it 'fades in the result set', (done) ->
      _.defer =>
        @view.$collection.hasClass('is-fade-in').should.be.true()
        done()

    it 'follows the interest', ->
      @view.following.length.should.equal 1

  describe '#uninterested', ->
    beforeEach ->
      @view.render()
      interest = new Backbone.Model id: 'foobar', name: 'Foo Bar'
      @view.typeahead.trigger 'selected', interest

    it 'removes the interest from the collection', ->
      @view.collection.length.should.equal 1
      @view.$('.js-user-interest-remove').click()
      @view.collection.length.should.equal 0

    it 'rerenders the collection', ->
      @view.$('.js-user-interest-remove').click()
      @view.$('.js-user-interest-remove').length.should.equal 0

    it 'destroys the interest', ->
      sinon.spy @view.collection.model::, 'destroy'
      @view.$('.js-user-interest-remove').click()
      @view.collection.model::destroy.called.should.be.true()
