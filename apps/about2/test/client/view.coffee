_ = require 'underscore'
benv = require 'benv'
rewire = require 'rewire'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'

describe 'AboutView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
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

  describe 'hero units', ->
    beforeEach ->
      @view.setupHeroUnits()

    it 'sets up the hero units', ->
      @view.$units.length.should.equal 3

    describe '#stepHeroUnit', ->
      it 'toggles one unit at a time and loops back to the beginning', ->
        @view.currentHeroUnit.should.equal 0
        @view.stepHeroUnit()
        @view.currentHeroUnit.should.equal 1
        @view.stepHeroUnit()
        @view.currentHeroUnit.should.equal 2
        @view.stepHeroUnit()
        @view.currentHeroUnit.should.equal 0
