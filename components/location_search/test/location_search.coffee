_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'

LocationSearchView = benv.requireWithJadeify(resolve(__dirname, '../index'), ['template'])

describe 'Location Search', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
        google: sinon.stub()
      Backbone.$ = $
      LocationSearchView.__set__ 'geo', loadGoogleMaps: (cb) -> cb()
      @google =
        maps:
          places: Autocomplete: sinon.stub()
          event:
            addListener: sinon.stub()
            addDomListener: sinon.stub()
      LocationSearchView.__set__ 'google', @google
      @view = new LocationSearchView
      done()

  afterEach ->
    benv.teardown()

  it 'should render the template', ->
    @view.render().$el.html().should.containEql 'Enter your city'

  it 'should render with a current value', ->
    value = "New York, NY, United States"
    @view.render(value).$el.html().should.containEql value

  it 'attach Google Maps specific event listeners', ->
    @view.render()
    @google.maps.event.addListener.args[0][1].should.equal 'place_changed'
    @google.maps.event.addDomListener.args[0][1].should.equal 'keydown'

  it 'should announce it\'s location', (done) ->
    @view.once 'location:update', -> done()
    @view.announce {}

  describe '#determineAutofocus', ->
    it 'should set the appropriate autofocus attribute', ->
      LocationSearchView.__set__ 'isTouchDevice', -> false
      new LocationSearchView().determineAutofocus().should.be.true()
    it 'should accept options', ->
      LocationSearchView.__set__ 'isTouchDevice', -> false
      _.isUndefined(new LocationSearchView(autofocus: false).determineAutofocus()).should.be.true()
      new LocationSearchView(autofocus: true).determineAutofocus().should.be.true()
    it 'should handle touch devices', ->
      LocationSearchView.__set__ 'isTouchDevice', -> true
      _.isUndefined(new LocationSearchView().determineAutofocus()).should.be.true()
      _.isUndefined(new LocationSearchView(autofocus: false).determineAutofocus()).should.be.true()
      _.isUndefined(new LocationSearchView(autofocus: true).determineAutofocus()).should.be.true()

  describe '#preAnnounce', ->
    it 'should announce a named location string when the input is blurred', (done) ->
      @view.$el.html '<input>'
      @view.$('input').val 'Lemuria'
      @view.once 'location:update', (location) ->
        location.should.eql name: 'Lemuria'
        done()
      @view.$('input').trigger 'blur'
