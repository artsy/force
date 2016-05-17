_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
{ stubChildClasses } = require '../../../../test/helpers/stubs'
Artist = require '../../../../models/artist'
artistJSON = require '../fixtures'

describe 'RelatedArtistsView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      @RelatedArtistsView = benv.requireWithJadeify resolve(__dirname, '../../client/views/related_artists'), ['template', 'artistCellTemplate']
      @model = new Artist artistJSON
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub _, 'defer', (cb) -> cb()
    sinon.stub(Backbone, 'sync').yieldsTo('success').returns([fabricate('artist')])
    stubChildClasses @RelatedArtistsView, this,
      ['ArtworkRailView']
      ['fetchAndRender', 'remove']
    @view = new @RelatedArtistsView model: @model, statuses: artistJSON.statuses

  afterEach ->
    _.defer.restore()
    Backbone.sync.restore()
    @view.remove()

  describe '#renderRelated', ->
    it 'renders section content', ->
      sinon.stub @view, 'setupFollowButtons', (artists) -> return
      @view.render()
      @view.renderRelated
        artists:
          [ id: 'id', name: 'Artist A', href: '/artist/a', image: { url: '/image.jpg' }, counts: { } ]
        contemporary:
          [ id: 'id', name: 'Artist B', href: '/artist/b', image: { url: '/image.jpg' }, counts: { } ]

      @view.$('#artist-related-artists-section').hasClass('is-fade-in').should.be.true()
      $item = @view.$('#artist-related-artists-section .grid-item')
      $item.length.should.equal 1
      $item.html().should.containEql 'Artist A'

      @view.$('#artist-related-contemporary-section').hasClass('is-fade-in').should.be.true()
      $item = @view.$('#artist-related-contemporary-section .grid-item')
      $item.html().should.containEql 'Artist B'
      $item.length.should.equal 1

  describe '#render', ->
    it 'renders, sets up the template', ->
      @view.render()
      @view.$('#artist-related-artists-section h2').text().should.equal 'Related Artists'
      @view.$('#artist-related-contemporary-section').text().should.equal 'Suggested Contemporary Artists'

  describe '#postRender', ->
    beforeEach ->
      @view.render()

    it 'renders related artwork rail', ->
      subView1 = @ArtworkRailView.args[0][0]
      subView1.$el.attr('class').should.containEql 'artist-artworks-rail'
