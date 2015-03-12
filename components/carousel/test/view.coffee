_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'

describe 'CarouselView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    CarouselView = benv.requireWithJadeify resolve(__dirname, '../view'), ['template']
    @widths = [337, 228, 266, 335, 420, 238, 530]
    sinon.stub(CarouselView::, 'widths').returns @widths
    @view = new CarouselView height: 300

  afterEach ->
    @view.widths.restore()

  describe '#lefts', ->
    it 'calculates "left" positions', ->
      @view.lefts().should.eql [-0, -337, -565, -831, -1166, -1586, -1824]

    it 'supports an optional offset', ->
      @view.lefts(100).should.eql [-100, -437, -665, -931, -1266, -1686, -1924]

  describe '#leftAlignPositioning', ->
    it 'returns an object containing the required positioning information for anchoring the carousel to the left', ->
      @view.leftAlignPositioning().should.eql {
        stopPositions: [-0, -337, -565, -831, -1166, -1586, -1824]
        lastDecoyPosition: 530
        firstDecoyPosition: -2354
      }

  describe '#centerAlignPositioning', ->
    beforeEach ->
      sinon.stub(@view.$window, 'width').returns 1000

    afterEach ->
      @view.$window.width.restore()

    it 'returns an object containing the required positioning information for anchoring the carousel in the center', ->
      @view.centerAlignPositioning().should.eql {
        stopPositions: [331, 49, -198, -499, -876, -1205, -1589]
        lastDecoyPosition: 765
        firstDecoyPosition: -2023
      }

  describe '#hideDots', ->
    beforeEach ->
      sinon.stub(@view.$window, 'width').returns 1000

    afterEach ->
      @view.$window.width.restore()

    it 'returns true if the carousel length is greater than the # of dots that can be displayed', ->
      @view.length = 10
      @view.hideDots().should.be.false

    it 'returns false if the carousel length is less than the # of dots that can be displayed', ->
      @view.length = 100
      @view.hideDots().should.be.true
