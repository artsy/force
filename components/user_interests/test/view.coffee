_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
UserInterestsView = benv.requireWithJadeify require.resolve('../view'), [
  'template'
  'collectionTemplate'
]
UserInterestsView.__set__ 'CURRENT_USER', 'existy'

describe 'UserInterestsView', ->
  before (done) ->
    benv.setup ->
      Bloodhound = -> ttAdapter: sinon.stub(), initialize: sinon.stub()
      Bloodhound.tokenizers = obj: whitespace: sinon.stub()
      benv.expose
        $: benv.require 'jquery'
        Bloodhound: Bloodhound
      Backbone.$ = $
      $.fn.typeahead = sinon.stub()
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @view = new UserInterestsView

  afterEach ->
    Backbone.sync.restore()

  describe '#initialize', ->
    it 'accepts a mode', ->
      view = new UserInterestsView mode: 'pre'
      view.render().$el.html().should.containEql 'is-pre'
      view.render().$el.html().should.not.containEql 'is-post'

    it 'sets the default mode to "post"', ->
      @view.mode.should.equal 'post'
      @view.render().$el.html().should.containEql 'is-post'
      @view.render().$el.html().should.not.containEql 'is-pre'

  describe '#render', ->
    beforeEach ->
      @view.render()

    it 'renders the base template', ->
      @view.$el.html().should.containEql 'Add an artist you own work by'

    it 'sets up the autocomplete view', ->
      @view.autocomplete.mode.should.equal 'artists'
      @view.autocomplete.$input.length.should.equal 1

  describe '#interested, #renderCollection', ->
    beforeEach ->
      @view.render()
      @view.autocomplete.$input.val 'Foo Bar'
      interest = new Backbone.Model id: 'foobar', name: 'Foo Bar'
      @view.autocomplete.trigger 'search:selected', $.Event('sup'), interest

    it 'listens to the autocomplete instance and triggers an `interested`, which renders the interest', ->
      @view.$('.user-interest').length.should.equal 1
      @view.$('.user-interest-name').text().should.equal 'Foo Bar'

    it 'clears the input', ->
      _.last($.fn.typeahead.args)[0].should.equal 'val'
      _.last($.fn.typeahead.args)[1].should.equal ''

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
      @view.autocomplete.trigger 'search:selected', $.Event('sup'), interest

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

  describe 'when persist is false', ->
    beforeEach ->
      Backbone.sync.restore()
      sinon.stub Backbone, 'sync'
      @view = new UserInterestsView persist: false
      sinon.spy @view.collection, 'addInterest'
      sinon.spy @view.following, 'follow'
      @view.render()

    afterEach ->
      @view.collection.addInterest.restore()
      @view.following.follow.restore()

    it 'sets the persist option', ->
      @view.persist.should.be.false()

    it 'does not persist the interest', ->
      @view.autocomplete.trigger 'search:selected', $.Event('sup'), new Backbone.Model(id: 'foobar', name: 'Foo Bar')
      @view.collection.addInterest.called.should.be.true()
      Backbone.sync.called.should.be.false()

    it 'does not follow the artist', ->
      @view.autocomplete.trigger 'search:selected', $.Event('sup'), new Backbone.Model(id: 'foobar', name: 'Foo Bar')
      @view.following.follow.called.should.be.false()

    describe '#saveAll', ->
      it 'saves all the interests', ->
        @view.autocomplete.trigger 'search:selected', $.Event('sup'), new Backbone.Model(id: 'foobar', name: 'Foo Bar')
        @view.autocomplete.trigger 'search:selected', $.Event('sup'), new Backbone.Model(id: 'barbaz', name: 'Bar Baz')
        @view.autocomplete.trigger 'search:selected', $.Event('sup'), new Backbone.Model(id: 'bazqux', name: 'Baz Qux')
        @view.saveAll()
        Backbone.sync.callCount.should.equal 3
