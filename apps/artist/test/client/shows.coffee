_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Artist = require '../../../../models/artist'
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
    @view = new ShowsView model: @model
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
      _.first(Backbone.sync.args)[1].url.should.containEql '/api/v1/related/shows?artist[]=foo-bar&sort=-end_at'
      _.first(Backbone.sync.args)[2].data.size.should.equal 20
      _.last(Backbone.sync.args)[1].url.should.containEql '/artist/data/foo-bar/exhibitions'
