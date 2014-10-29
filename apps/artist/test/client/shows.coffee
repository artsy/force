_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Artist = require '../../../../models/artist'
{ sections } = require '../../client/data'
section = _.findWhere(sections, slug: 'shows')
ShowsView = benv.requireWithJadeify resolve(__dirname, '../../client/views/shows'), ['template']
ShowsView.__set__ 'FilterableListView', Backbone.View
ShowsView.__set__ 'RelatedShowsView', Backbone.View

describe 'ShowsView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      @model = new Artist fabricate 'artist', id: 'foo-bar', name: 'Foo Bar'
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub _, 'defer', (cb) -> cb()
    sinon.stub Backbone, 'sync'
    @view = new ShowsView model: @model, section: section
    @view.render()

  afterEach ->
    _.defer.restore()
    Backbone.sync.restore()
    @view.remove()

  describe '#render', ->
    it 'renders, sets up the template', ->
      @view.$el.html().should.containEql 'Foo Bar shows on Artsy'

  describe '#postRender', ->
    it 'fetches the artist exhibitionHistory', ->
      Backbone.sync.args[0][1].url.should.equal '/artist/data/foo-bar/exhibitions'
