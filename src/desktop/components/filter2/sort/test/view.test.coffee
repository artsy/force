_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate2 } = require '@artsy/antigravity'
FilterArtworks = require '../../../../collections/filter_artworks.coffee'

describe 'Filter / Sort', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      SortView = benv.require resolve(__dirname, '../view')
      @view = new SortView
        el: $ "<div></div>"
        params: new Backbone.Model
        collection: new FilterArtworks fabricate2('filter_artworks'), parse: true
        facets: ['price_range', 'dimension_range', 'medium']

      done()

  afterEach ->
    benv.teardown()

  it 'updates the params to sort', ->
    @view.setSort target: $ "<div data-sort='-foo'></div>"
    @view.params.get('sort').should.equal '-foo'
