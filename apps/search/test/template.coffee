benv = require 'benv'
_ = require 'underscore'
jade = require 'jade'
path = require 'path'
fs = require 'fs'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Search = require '../../../collections/search'
SearchResult = require '../../../models/search_result'
sinon = require 'sinon'

render = (templateName) ->
  filename = path.resolve __dirname, "../#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Search results template', ->
  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery'}
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @search = new Search

  describe 'No results', ->
    beforeEach ->
      @template = render('template')(
        sd: {}
        results: @search.models
        term: 'foobar'
        fill: sinon.stub()
      )

    it 'displays a message to the user that nothing can be found', ->
      @template.should.containEql 'Nothing found'

  describe 'Has results', ->
    beforeEach ->
      @artworks = _.times 2, ->
        new SearchResult(fabricate('artwork', model: 'artwork'))
      @artists = _.times 3, ->
        new SearchResult(fabricate('artist', model: 'artist'))

      @search.add @artworks
      @search.add @artists

      template = render('template')(
        sd: {}
        results: @search.models
        term: 'skull'
        fill: sinon.stub()
      )

      @$template = $(template)

    it 'renders the search results', ->
      @$template.find('.search-result').length.should.equal 5

    it 'highlights the search term', ->
      @$template.find('.is-highlighted').should.be.ok

    it 'correctly identifies humans', ->
      @$template.find('.is-human').length.should.equal @artists.length
