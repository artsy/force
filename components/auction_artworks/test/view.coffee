_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Auction = require '../../../models/sale'
Artworks = require '../../../collections/artworks'
AuctionArtworksView = benv.requireWithJadeify resolve(__dirname, '../view'), ['template']

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
    @view = new AuctionArtworksView el: $('section'), model: @auction, collection: @artworks, user: new Backbone.Model

  describe '#render', ->
    it 'renders the default state', ->
      @view.render()
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

  describe '#displayBlurbs', ->
    it 'returns true if any artworks have a blurb', ->
      @view.displayBlurbs().should.be.false
      @view.collection.first().set 'blurb', 'Existence!'
      @view.displayBlurbs().should.be.true

  describe '#maxBlurbHeight', ->
    it 'returns a pixel value based on the estimated height of the longest blurb', ->
      @view.maxBlurbHeight(true).should.equal '22px' # A single line
      _.isUndefined(@view.maxBlurbHeight(false)).should.be.true
      @view.collection.first().set 'blurb', 'Existence!'
      @view.maxBlurbHeight(true).should.equal '27px'
      @view.collection.last().set 'blurb', 'Existence! Existence! Existence! Existence! Existence! Existence! Existence! Existence! Existence! Existence!'
      @view.maxBlurbHeight(true).should.equal '70px'
