benv = require 'benv'
Backbone = require 'backbone'
fixture = require '../../../../test/helpers/fixtures.coffee'
{ fabricate } = require 'antigravity'
sinon = require 'sinon'
path = require 'path'
SearchResult = require '../../models/google_search_result.coffee'
_s = require 'underscore.string'

describe 'SearchResultsView', ->
  beforeEach (done) ->
    benv.setup =>
      benv.render path.resolve(__dirname, '../../templates/template.jade'), {
        sd: {}
        asset: (->)
        results: [new SearchResult fixture.searchResult]
        term: 'skull'
        crop: sinon.stub()
        _s: _s
      }, =>
        benv.expose $: benv.require 'jquery'
        Backbone.$ = $
        sinon.stub(Backbone, 'sync')
        { SearchResultsView } = benv.requireWithJadeify '../../client/index.coffee', ['imageTemplate', 'resolvedImage']
        @view = new SearchResultsView
          results: [fixture.searchResult]
        done()

  afterEach () ->
    benv.teardown()
    Backbone.sync.restore()

  it 'fills in artwork images', ->
    @view.refreshRenderArtworks(fixture.searchResult)

    Backbone.sync.args[1][2].success(fabricate 'artwork', id: 'maya-hayuk-untitled')

    @view.$el.html().should.containEql("/local/additional_images/4e7cb83e1c80dd00010038e2/1/small.jpg")


