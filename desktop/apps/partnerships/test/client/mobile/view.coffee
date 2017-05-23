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
      Backbone.$ = $
      @GalleryPartnershipsView = rewire '../../../client/mobile/view'
      $.fn.waypoint = sinon.stub()
      data = _.extend require('../../fixture/content.json'), sd: {}
      benv.render resolve(__dirname, '../../../templates/mobile/index.jade'), data, ->
        done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub @GalleryPartnershipsView::, 'initialize'
    @view = new @GalleryPartnershipsView el: $('body')
    @clock = sinon.useFakeTimers()

  afterEach ->
    @clock.restore()
    @view.initialize.restore()

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
