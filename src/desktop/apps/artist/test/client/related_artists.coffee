_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
{ stubChildClasses } = require '../../../../test/helpers/stubs'
Artist = require '../../../../models/artist'
artistJSON = require '../fixtures'
Q = require 'bluebird-q'

describe 'RelatedArtistsView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      @RelatedArtistsView = benv.requireWithJadeify resolve(__dirname, '../../client/views/related_artists'), ['template']
      @model = new Artist artistJSON
      @RelatedArtistsView.__set__ 'metaphysics', @metaphysics = sinon.stub()
      @metaphysics.returns Q.resolve
        artist:
          artists:
            [ id: 'id', name: 'Artist A', href: '/artist/a', image: { cropped: url: '/image.jpg' }, counts: { } ]
          contemporary:
            [ id: 'id', name: 'Artist B', href: '/artist/b', image: { cropped: url: '/image.jpg' }, counts: { } ]
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub _, 'defer', (cb) -> cb()
    sinon.stub(Backbone, 'sync').yieldsTo('success').returns([fabricate('artist')])
    stubChildClasses @RelatedArtistsView, this,
      ['ArtworkRailView']
      ['remove']
    @view = new @RelatedArtistsView model: @model, statuses: artistJSON.statuses
    sinon.stub @view, 'postRender'
    sinon.stub @view, 'setupFollowButtons', (artists) -> return
    @view.fetchRelated()

  afterEach ->
    _.defer.restore()
    Backbone.sync.restore()
    @view.remove()

  describe '#render', ->
    it 'renders section content', ->
      @view.$('.artist-related-artists-section').length.should.eql 2
      $artists = @view.$('.artist-related-artists-section[data-id=artists]')
      $contemporary = @view.$('.artist-related-artists-section[data-id=contemporary]')

      $artistItem = $artists.find('.grid-item')
      $artistItem.length.should.equal 1
      $artistItem.html().should.containEql 'Artist A'

      contemporaryItem = $contemporary.find('.grid-item')
      contemporaryItem.html().should.containEql 'Artist B'
      contemporaryItem.length.should.equal 1

      $artists.find('h2').text().should.equal 'Related Artists'
      $contemporary.find('h2').text().should.equal 'Suggested Contemporary Artists'

