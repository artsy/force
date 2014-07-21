benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Artwork = require '../../../../models/artwork'

describe 'BelowTheFoldView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      @BelowTheFoldView = require '../../client/below-the-fold'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    sinon.stub Backbone, 'sync'
    @setupLayeredSearchSpy = sinon.spy @BelowTheFoldView::, 'setupLayeredSearch'
    @setupSaleSpy = sinon.spy @BelowTheFoldView::, 'setupSale'
    @setupFairSpy = sinon.spy @BelowTheFoldView::, 'setupFair'

    @$fixture = $('<div></div>')
    @artwork = new Artwork fabricate 'artwork'
    @view = new @BelowTheFoldView $el: @$fixture, artwork: @artwork
    done()

  afterEach ->
    @setupLayeredSearchSpy.restore()
    @setupSaleSpy.restore()
    @setupFairSpy.restore()
    Backbone.sync.restore()

  describe '#initialize', ->
    it 'has an artwork', ->
      @view.artwork.id.should.equal @artwork.id

  describe '#setupFair', ->
    it 'delegates to #setupLayeredSearch and passes a fair', ->
      @view.setupFair(fair = 'fair')
      @setupLayeredSearchSpy.called.should.be.ok
      @setupLayeredSearchSpy.args[0][0].fair.should.equal fair

  describe '#fadeIn', ->
    it 'fades in the el', ->
      @view = new @BelowTheFoldView $el: @$fixture, artwork: @artwork
      @view.fadeIn()
      @view.$el.data('state').should.equal 'fade-in'
