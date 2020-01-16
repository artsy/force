_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate, fabricate2 } = require '@artsy/antigravity'
Fair = require '../../../../models/fair.coffee'
Gene = require '../../../../models/gene.coffee'
FilterArtworks = require '../../../../collections/filter_artworks.coffee'

describe 'Filter / Headline', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      HeadlineView = benv.require resolve(__dirname, '../view')
      @view = new HeadlineView
        el: $ "<div></div>"
        params: new Backbone.Model
        collection: new FilterArtworks fabricate2('filter_artworks'), parse: true
        facets: ['price_range', 'dimension_range', 'medium']
        stuckParam: 'fair_id'
        stuckFacet: new Fair fabricate 'fair'

      done()

  afterEach ->
    benv.teardown()

  it 'renders the headline properly', ->
    @view.params.set
      price_range: '*-1000'
      medium: 'film-slash-video'
      dimension_range: '*-24.0'

    @view.$el.text().should.equal 'Small Film / video Under $1,000'

  it 'says artwork if no medium is available and does not treat fair as a stuck param', ->
    @view.params.set
      price_range: '*-1000'
      dimension_range: '*-24.0'

    @view.$el.text().should.equal 'Small Artworks Under $1,000'

  it 'says nothing if no params are set', ->
    @view.$el.text().should.equal ''

  it 'uses a stuckFacet in place of a medium', ->
    @view.stuckFacet = new Gene fabricate 'gene'
    @view.params.set
      price_range: '*-1000'
      dimension_range: '*-24.0'

    @view.$el.text().should.equal 'Small Pop Art Under $1,000'
