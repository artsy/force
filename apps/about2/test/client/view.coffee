_ = require 'underscore'
benv = require 'benv'
rewire = require 'rewire'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'

describe 'AboutView', ->
  before (done) ->
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
        crop: sinon.stub()
      Backbone.$ = $
      @AboutView = rewire '../../client/view'
      @AboutView.__set__ 'imagesLoaded', (cb) -> cb()
      $.fn.imagesLoaded = (cb) -> cb()
      $.fn.waypoint = sinon.stub()
      data = _.extend require('../fixture/content.json'), sd: {}
      benv.render resolve(__dirname, '../../templates/index.jade'), data, =>
        done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub @AboutView::, 'initialize'
    @view = new @AboutView el: $('body')
    @clock = sinon.useFakeTimers()

  afterEach ->
    @clock.restore()
    @view.initialize.restore()

  describe 'slideshow', ->
    beforeEach ->
      @view.cacheSelectors()
      @view.currentHeroUnitFrame = 0

    describe '#stepSlide', ->
      it 'toggles one unit at a time and loops back to the beginning', ->
        @view.currentHeroUnitFrame.should.equal 0
        @view.stepSlide @view.$heroUnits, 'HeroUnit'
        @view.currentHeroUnitFrame.should.equal 1
        @view.stepSlide @view.$heroUnits, 'HeroUnit'
        @view.currentHeroUnitFrame.should.equal 2
        @view.stepSlide @view.$heroUnits, 'HeroUnit'
        @view.currentHeroUnitFrame.should.equal 0
