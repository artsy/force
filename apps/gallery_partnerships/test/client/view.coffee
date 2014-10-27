_ = require 'underscore'
benv = require 'benv'
rewire = require 'rewire'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'

describe 'GalleryPartnershipsView', ->
  before (done) ->
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
        crop: sinon.stub()
      Backbone.$ = $
      $.fn.waypoint = sinon.stub()
      data = _.extend require('../fixture/content.json'), sd: {}
      benv.render resolve(__dirname, '../../templates/index.jade'), data, =>
        done()

  after ->
    benv.teardown()

  beforeEach ->
    @GalleryPartnershipsView = rewire '../../client/view'
    @GalleryPartnershipsView.__set__ 'analytics', track: click: (@track = sinon.stub())
    sinon.stub @GalleryPartnershipsView::, 'initialize'
    @view = new @GalleryPartnershipsView el: $('body')
    @clock = sinon.useFakeTimers()

  afterEach ->
    @clock.restore()
    @view.initialize.restore()

  describe 'analytics', ->
    it 'tracks nav link clicks', ->
      (track = @track).notCalled.should.be.ok
      callCount = 0
      $('.gallery-partnerships-nav-link.internal').each ->
        $(this).click()
        track.callCount.should.equal ++callCount
        _.last(track.args)[0].should.equal 'Clicked nav link on gallery partnerships'
        _.last(track.args)[1].should.eql section: $(this).attr('data-section')

    it 'tracks nav apply button clicks', ->
      @track.notCalled.should.be.ok
      $('.gallery-partnerships-nav-link.apply').click()
      @track.calledOnce.should.be.ok
      @track.args[0][0].should.equal 'Clicked nav apply on gallery partnerships'

    it 'tracks bottom apply button clicks', ->
      console.log @track.callCount
      @track.notCalled.should.be.ok
      $('.apply .apply-button').click()
      console.log @track.callCount
      @track.calledOnce.should.be.ok
      @track.args[0][0].should.equal 'Clicked bottom apply on gallery partnerships'

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
