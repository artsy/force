_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
{ stubChildClasses } = require '../../../../test/helpers/stubs'
Artist = require '../../../../models/artist'
{ sections } = require '../../client/data'
section = _.findWhere(sections, slug: 'related-artists')

describe 'RelatedArtistsView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      @RelatedArtistsView = benv.requireWithJadeify resolve(__dirname, '../../client/views/related_artists'), ['template']
      @model = new Artist fabricate 'artist', id: 'foo-bar'
      @model.relatedArtists.add fabricate('artist')
      @model.relatedContemporary.add fabricate('artist')
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub _, 'defer', (cb) -> cb()
    sinon.stub Backbone, 'sync'
    stubChildClasses @RelatedArtistsView, this,
      ['ArtistFillwidthList']
      ['fetchAndRender', 'remove']
    @view = new @RelatedArtistsView model: @model, section: section

  afterEach ->
    _.defer.restore()
    Backbone.sync.restore()
    @view.remove()

  describe '#render', ->
    it 'renders, sets up the template', ->
      @view.render()
      @view.$('#artist-related-artists-section').hasClass('is-fade-in').should.be.true
      @view.$('#artist-related-contemporary-section').hasClass('is-fade-in').should.be.true
      @view.$('#artist-related-artists-section h2').text().should.equal 'Related Artists'
      @view.$('#artist-related-contemporary-section').text().should.equal 'Suggested Contemporary Artists'

  describe '#postRender', ->
    beforeEach ->
      @view.render()

    it 'attaches the two related artist views', ->
      subView1 = @ArtistFillwidthList.args[0][0]
      subView1.el.attr('id').should.equal 'artist-related-artists'
      subView2 = @ArtistFillwidthList.args[1][0]
      subView2.el.attr('id').should.equal 'artist-related-contemporary'
