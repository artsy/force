_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Artist = require '../../../../models/artist'
ShowsView = benv.requireWithJadeify resolve(__dirname, '../../client/views/shows'), ['template']
ShowsView.__set__ 'ExhibitionHistoryListView', Backbone.View
ShowsView.__set__ 'RelatedShowsView', Backbone.View

describe 'ShowsView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      @model = new Artist fabricate 'artist', id: 'foo-bar', name: 'Foo Bar', _id: 'bitty'
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

  describe '#initialize', ->
    it 'fetches shows until the end', ->
      Backbone.sync.callCount.should.equal 2
      Backbone.sync.args[0][2].data.page.should.equal 1
      Backbone.sync.args[0][2].success [fabricate 'show']
      Backbone.sync.callCount.should.equal 3
      _.last(Backbone.sync.args)[2].data.page.should.equal 2


  describe '#render', ->
    it 'renders, sets up the template', ->
      @view.$el.html().should.containEql 'Foo Bar shows on Artsy'

  describe '#postRender', ->
    it 'fetches the artist exhibitionHistory', ->
      _.first(Backbone.sync.args)[1].url.should.containEql '/api/v1/related/shows?artist_id=bitty&sort=-end_at&displayable=true'
      _.last(Backbone.sync.args)[1].url.should.containEql '/artist/data/foo-bar/exhibitions'

  describe '#renderHeader', ->
    it 're-renders the header copy if new fairs or shows come in', ->
      @model.related().shows.add [fabricate 'show']
      @model.related().shows.trigger 'sync'
      @view.$header.text().should.equal 'Foo Bar shows on Artsy'

      @model.related().shows.add [fabricate 'show', fair: 'existy']
      @model.related().shows.trigger 'sync'
      @view.$header.text().should.equal 'Foo Bar shows and fair booths on Artsy'

      @model.related().shows.reset [fabricate 'show', fair: 'existy']
      @model.related().shows.trigger 'sync'
      @view.$header.text().should.equal 'Foo Bar fair booths on Artsy'
