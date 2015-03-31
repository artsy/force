_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Auction = require '../../../../models/sale'
Artworks = require '../../../../collections/artworks'
AuctionArtworksView = benv.requireWithJadeify resolve(__dirname, '../../client/view'), [
  'template.grid', 'template.list'
]

describe 'AuctionArtworksView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    $('body').html """
      <section>
        <a class='js-toggle-artworks-sort' href='#' data-mode='grid' data-sort='default'>Grid</a>
        <a class='js-toggle-artworks-sort' href='#' data-mode='list' data-sort='name_asc'>Artists A–Z</a>
        <div class='js-auction-artworks'></div>
      </section>
    """

    @auction = new Auction fabricate 'auction'
    @artworks = new Artworks [
      fabricate 'artwork', id: 'z-z', artist: sortable_id: 'z-z'
      fabricate 'artwork', id: 'a-a', artist: sortable_id: 'a-a'
    ]
    @view = new AuctionArtworksView el: $('section'), model: @auction, collection: @artworks

  describe '#renderArtworks', ->
    it 'renders the default state', ->
      @view.renderArtworks()
      @view.$('.js-auction-artworks').data('mode').should.equal 'grid'
      @view.$('.auction-grid-artwork').should.have.lengthOf 2

  describe '#setState', ->
    beforeEach ->
      @view.$('a[data-sort="name_asc"]').click()

    it 'sets the view state', ->
      @view.state.attributes.should.eql mode: 'list', sort: 'name_asc'

    it 'activates the link', ->
      @view.$('.is-active').data('sort').should.equal 'name_asc'

    it 'triggers a sort and re-render', ->
      @view.$('.auction-grid-artwork').should.have.lengthOf 0
      @view.$('.auction-list-artwork').should.have.lengthOf 2
      @view.$('.auction-list-artwork:first-child a').attr('href').should.containEql '/artwork/a-a'
      @view.$('.auction-list-artwork:last-child a').attr('href').should.containEql '/artwork/z-z'
