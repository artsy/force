_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ fabricate } = require 'antigravity'
Artworks = require '../../../collections/artworks'
{ resolve } = require 'path'
FillwidthView = benv.requireWithJadeify resolve(__dirname, '../view'), ['template']

describe 'FillwidthView', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: require 'components-jquery' }
      $.fn.fillwidth = ->
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    sinon.stub Backbone, 'sync'
    col = new Artworks [fabricate 'artwork']
    col.url = 'foo/bar'
    @view = new FillwidthView { el: $('body'), collection: col }
    done()

  afterEach ->
    Backbone.sync.restore()

  describe '#render', ->

    it 'renders a row of artworks', ->
      @view.collection.first().set 'title', 'Foo to the Bar'
      @view.render()
      @view.$el.html().should.include 'Foo to the Bar'

  describe '#nextPage', ->

    it 'fetches the next page of artworks', ->
      @view.page = 0
      @view.nextPage()
      _.last(Backbone.sync.args)[1].url.should.include 'foo/bar'
      _.last(Backbone.sync.args)[2].data.page.should.equal 0
      @view.page.should.equal 1