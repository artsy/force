_ = require 'underscore'
benv = require 'benv'
rewire = require 'rewire'
sinon = require 'sinon'
Backbone = require 'backbone'
sd = require('sharify').data

describe 'PartnershipsView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @PartnershipsView = mod = rewire '../../client/view'
    sinon.stub @PartnershipsView::, 'initialize'
    @view = new @PartnershipsView el: $('body')
    mod.__set__ 'sd', { SESSION_ID: '12345' }
    @clock = sinon.useFakeTimers()

  afterEach ->
    @clock.restore()
    @view.initialize.restore()

  describe '#setupSessionCookie', ->
    it 'sets a cookie with the session id', ->
      @view.setupSessionCookie()
      @PartnershipsView.__get__('Cookies').get('marketo-session-id').should.eql '12345'

    it 'resets the cookie when the session id changes', ->
      @PartnershipsView.__get__('sd').SESSION_ID = '54321'
      @view.setupSessionCookie()
      @PartnershipsView.__get__('Cookies').get('marketo-session-id').should.eql '54321'

  describe 'slideshow', ->
    before ->
      @$fixture = $("""
        <ul>
          <li class='fixture'>a</li>
          <li class='fixture'>b</li>
          <li class='fixture'>c</li>
        </ul>
      """)

    describe '#stepSlide', ->
      it 'toggles one frame at a time and loops back to the beginning', ->
        @view.fixtureFrame = 0
        $frames = @$fixture.find('.fixture')
        @view.stepSlide $frames, 'fixture'
        @view.fixtureFrame.should.equal 1
        @$fixture.find('.is-active').text().should.equal 'a'
        @view.stepSlide $frames, 'fixture'
        @view.fixtureFrame.should.equal 2
        @$fixture.find('.is-active').text().should.equal 'b'
        @view.stepSlide $frames, 'fixture'
        @view.fixtureFrame.should.equal 0
        @$fixture.find('.is-active').text().should.equal 'c'
        @view.stepSlide $frames, 'fixture'
        @view.fixtureFrame.should.equal 1
        @$fixture.find('.is-active').text().should.equal 'a'
