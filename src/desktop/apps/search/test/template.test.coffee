benv = require 'benv'
_ = require 'underscore'
_s = require 'underscore.string'
jade = require 'jade'
path = require 'path'
fs = require 'fs'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
Search = require '../../../collections/search'
SearchResult = require '../../../models/search_result'
sinon = require 'sinon'
fixture = require '../../../test/helpers/fixtures.coffee'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Search results template', ->
  before (done) ->
    benv.setup ->
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
        asset: (->)
        results: @search.models
        term: 'foobar'
        crop: sinon.stub()
        _s: _s
      )

    it 'displays a message to the user that nothing can be found', ->
      @template.should.containEql 'Nothing found'

  describe 'Has results', ->
    beforeEach ->
      @results = _.times 3, ->
        new SearchResult(fixture.searchResult)

      template = render('template')(
        sd: {}
        asset: (->)
        results: @results
        term: 'skull'
        crop: sinon.stub()
        _s: _s
      )
      @$template = $(template)

    it 'renders the search results', ->
      @$template.find('.search-result').length.should.equal 3

    it 'highlights the search term', ->
      @$template.find('.is-highlighted').should.be.ok()

  describe 'Creates img tag with empty string', ->
    beforeEach ->
      @result = new SearchResult fixture.searchResult

      template = render('search_result')(
        sd: {}
        result: @result
        term: 'skull'
        crop: sinon.stub()
        _s: _s
      )

      @$template = $(template)

    it 'creates img tag', ->
      @$template.find('.search-result-thumbnail-fallback img').length.should.equal 1
