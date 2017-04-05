_ = require 'underscore'
Backbone = require 'backbone'
sinon = require 'sinon'
PersonalizeState = require '../../client/personalize_state'
CurrentUser = require '../../../../models/current_user'
benv = require 'benv'
{ resolve } = require 'path'

describe 'Personalization view code', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../../templates/index.jade'), {
        sd: {}
      }, =>
        { @CollectView } = benv.requireWithJadeify resolve(__dirname, '../../client/collect_view'),
          ['template']
        @state = new PersonalizeState
        @user = new CurrentUser
        @view = new @CollectView(state: @state, user: @user)
        done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()

  describe '#setCollectorLevel', ->
    beforeEach ->
      @view.render()

    it 'sets the collector_level attribute on the user', ->
      @view.$('a').eq(0).click()
      @view.user.get('collector_level').should.equal 3

    it 'sets the level of PersonalizeState', ->
      @view.$('a').eq(1).click()
      @view.state.get('current_level').should.equal 2

    it 'triggers the event \'transition:next\' on PersonalizeState', ->
      spy = sinon.spy @view, 'advance'
      @view.$('a').eq(1).click()
      spy.called.should.be.ok()

  describe '#render', ->
    it 'renders the template', ->
      @view.render()
      @view.$el.html().should.containEql 'Do you buy art?'

describe 'LocationView', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../../templates/index.jade'), {
        sd: {}
      }, =>
        { @LocationView } = mod = benv.requireWithJadeify resolve(__dirname, '../../client/location_view'),
          ['template']
        @state = new PersonalizeState
        @user = new CurrentUser
        @view = new @LocationView(state: @state, user: @user)
        @view.postRender = -> # Ignore
        done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()

  describe '#update', ->
    before ->
      # Mock response of New York
      @location = require './location'

    it 'sets the location on the user', ->
      @view.update @location
      @view.user.get('location').city.should.equal 'New York'
      @view.user.get('location').state.should.equal 'New York'
      @view.user.get('location').state_code.should.equal 'NY'

    it 'triggers the event \'transition:next\' on PersonalizeState', ->
      spy = sinon.spy()
      @view.state.on 'transition:next', spy
      @view.update @location
      spy.called.should.be.ok()

  describe '#render', ->
    it 'renders the template', ->
      @view.render()
      @view.$el.html().should.containEql 'Where do you call home?'

    it 'calls #postRender', ->
      spy = sinon.spy @view, 'postRender'
      @view.render()
      spy.called.should.be.ok()

describe 'ArtistsView', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../../templates/index.jade'), {
        sd: {}
      }, =>
        { @ArtistsView } = mod = benv.requireWithJadeify resolve(__dirname, '../../client/artists_view'),
          ['template', 'resultsTemplate', 'followedTemplate']
        @state = new PersonalizeState
        @user = new CurrentUser
        @view = new @ArtistsView(state: @state, user: @user)
        @view.postRender = -> # Ignore
        done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()

  describe '#skip', ->
    it 'triggers the event \'transition:next\' on PersonalizeState', ->
      spy = sinon.spy()
      @view.render()
      @view.state.on 'transition:next', spy
      @view.$('#skip').click()
      spy.called.should.be.ok()

  describe '#_search', ->
    beforeEach ->
      @view.render()

    it 'gets the input value and initiates search', ->
      term = 'Foo Bar'
      @view.$('input').val term
      @view._search()
      @view.term.should.equal term

    it 'should indicate loading', ->
      spy = sinon.spy @view, 'renderLoadingSpinner'
      @view.term = null
      @view.$('input').val 'Foo Bar'
      @view._search()
      spy.called.should.be.ok()

    it 'should not perform a search if the term is the same as last time', ->
      spy = sinon.spy @view.service, 'fetch'
      @view.term = 'Foo Bar'
      @view.$('input').val 'Foo Bar'
      @view._search()
      spy.called.should.not.be.ok()
      @view.$('input').val 'Bar Baz'
      @view._search()
      spy.called.should.be.ok()

  describe '#renderLoadingSpinner', ->
    it 'renders the loading-spinner', ->
      @view.render()
      @view.$el.html().should.not.containEql 'loading-spinner'
      @view.renderLoadingSpinner()
      @view.$el.html().should.containEql 'loading-spinner'

  describe '#renderFollowed', ->
    it 'renders a string that is a comma separated list that ends with a period', ->
      @view.render()
      @view.followed = new Backbone.Collection [{ name: 'Foo Bar', id: 'foo-bar' }, { name: 'Baz Qux', id: 'baz-qux' }]
      @view.renderFollowed()
      @view.$el.html().should.containEql 'Foo Bar, Baz Qux.'

  describe '#follow', ->
    beforeEach ->
      @view.results = new Backbone.Collection [{ name: 'Foo Bar', id: 'foo-bar' }]
      @view.render()
      @view.renderResults()

    afterEach ->
      @view.remove()

    it 'should set the followed attribute on the appropriate model to true', ->
      $follow = @view.$('.follow').eq(0)
      model = @view.results.get($follow.data('id'))
      model.attributes.should.not.have.property 'followed'
      $follow.click()
      model.get('followed').should.be.ok()

    it 'should call #followArtist on the user', ->
      spy = sinon.spy @view.user, 'followArtist'
      @view.$('.follow').eq(0).click()
      spy.called.should.be.ok()

    it 'should prepend the followed artist to the followed collection', ->
      @view.$('.follow').eq(0).click()
      @view.results.reset { name: 'Baz Qux', id: 'baz-qux' }
      @view.renderResults()
      @view.$('.follow').eq(0).click()
      @view.followed.at(0).id.should.equal 'baz-qux'

  describe '#render', ->
    it 'renders the template', ->
      @view.render().$el.html().should.containEql 'Follow artists to get personalized recommendations'

describe 'PriceRangeView', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../../templates/index.jade'), {
        sd: {}
      }, =>
        { @PriceRangeView } = mod = benv.requireWithJadeify resolve(__dirname, '../../client/price_range_view'),
          ['template']
        @state = new PersonalizeState
        @user = new CurrentUser
        @view = new @PriceRangeView(state: @state, user: @user)
        @view.postRender = -> # Ignore
        done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()

  describe '#setRange', ->
    it 'sets the price_range attribute on the user', ->
      @view.render()
      @view.$('a').eq(0).click()
      @view.user.get('price_range_min').should.equal '-1'
      @view.user.get('price_range_max').should.equal '500'

    it 'should call done', ->
      @view.render()
      spy = sinon.spy @view, 'done'
      @view.$('a').eq(0).click()
      spy.called.should.be.ok()

  describe '#done', ->
    it 'triggers the done event on PersonalizeState', ->
      spy = sinon.spy()
      @view.state.on 'done', spy
      @view.done()
      spy.called.should.be.ok()

  describe '#render', ->
    it 'renders the view', ->
      @view.render()
      @view.$el.html().should.containEql 'Price range?'
