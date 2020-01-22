benv = require 'benv'
Backbone = require 'backbone'
fixture = require '../../../../test/helpers/fixtures.coffee'
{ fabricate } = require '@artsy/antigravity'
sinon = require 'sinon'
path = require 'path'
SearchResult = require '../../../../models/search_result.coffee'
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
        benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
        Backbone.$ = $
        sinon.stub(Backbone, 'sync')
        { SearchResultsView } = benv.requireWithJadeify path.resolve(__dirname, '../../client/index.coffee'), ['imageTemplate', 'resolvedImage']
        @view = new SearchResultsView
          results: [fixture.searchResult]
        done()

  afterEach () ->
    benv.teardown()
    Backbone.sync.restore()

  it 'fills in artwork images', ->
    @view.refreshRenderArtworks(fixture.searchResult)
    Backbone.sync.args[1][2].success(fabricate 'artwork', id: 'maya-hayuk-untitled')
    @view.$el.html().should.containEql("https://i.embed.ly/1/display/crop?url=%2Flocal%2Fadditional_images%2F4e7cb83e1c80dd00010038e2%2F1%2Fsmall.jpg")


