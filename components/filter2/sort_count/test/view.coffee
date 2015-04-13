_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate2 } = require 'antigravity'
FilterArtworks = require '../../../../collections/filter_artworks.coffee'

describe 'FilterSortCount', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      FilterSortCount = benv.require resolve(__dirname, '../view')
      @view = new FilterSortCount
        el: $ "<div></div>"
        params: new Backbone.Model
        collection: new FilterArtworks fabricate2('filter_artworks'), parse: true
      done()

  afterEach ->
    benv.teardown()

  it 'renders the counts', ->
    @view.$el = $ "<div><div class='filter-sort-count-total'></div></div>"
    @view.renderTotal()
    @view.$el.html().should.containEql '12,958'

  it 'updates the params to sort', ->
    @view.sort target: $ "<div data-sort='-foo'></div>"
    @view.params.get('sort').should.equal '-foo'

  it 'renders singulars like a bawse', ->
    @view.collection.counts.total = 1
    @view.renderTotal()
    @view.$el.html().should.not.containEql 'Works'
