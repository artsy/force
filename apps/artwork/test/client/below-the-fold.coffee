benv            = require 'benv'
Backbone        = require 'backbone'
sinon           = require 'sinon'
{ resolve }     = require 'path'
{ fabricate }   = require 'antigravity'

Artwork           = require '../../../../models/artwork'
BelowTheFoldView  = require '../../client/below-the-fold'

describe 'BelowTheFoldView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    sinon.stub Backbone, 'sync'
    @setupLayeredSearchStub  = sinon.stub BelowTheFoldView::, 'setupLayeredSearch'
    @setupSalesStub          = sinon.stub BelowTheFoldView::, 'setupSales'

    @$fixture   = $('<div></div>')
    @artwork    = new Artwork fabricate 'artwork'
    done()

  afterEach ->
    @setupLayeredSearchStub.restore()
    @setupSalesStub.restore()
    Backbone.sync.restore()

  describe '#initialize', ->
    it 'by default, sets up layered search', ->
      @view = new BelowTheFoldView $el: @$fixture, artwork: @artwork
      @setupLayeredSearchStub.called.should.be.ok

    it 'should setup the sale if a sale is returned', ->
      @artwork.relatedCollections = [{ length: 2, kind: 'Sales', fetch: sinon.stub() }]
      @view = new BelowTheFoldView $el: @$fixture, artwork: @artwork
      @setupSalesStub.called.should.be.ok

  describe '#done', ->
    it 'fades in the el', ->
      @view = new BelowTheFoldView $el: @$fixture, artwork: @artwork
      @view.done()
      @view.$el.data('state').should.equal 'fade-in'
