_ = require 'underscore'
jade = require 'jade'
cheerio = require 'cheerio'
path = require 'path'
fs = require 'fs'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
sinon = require 'sinon'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Artwork metadata templates', ->
  beforeEach ->
    @artwork = fabricate 'artwork'

  describe 'artwork with sale message', ->

    beforeEach ->
      @artwork.sale_message = '$4,000'

      @html = render('price')(
        artwork: @artwork
        sd: {}
        asset: (->)
      )

    it 'display artwork price', ->
      $ = cheerio.load(@html)
      $('.sale_message').text().should.equal '$4,000'

  describe 'artwork without sale message', ->
    beforeEach ->
      @html = render('price')(
        artwork: @artwork
        sd: {}
        asset: (->)
      )

    it 'doesn\'t display price', ->
      @html.should.equal ''

  describe 'button for artworks that are contactable', ->
    before ->
      @artwork.is_inquireable = true
      @artwork.partner.is_limited_fair_partner = false

      @html = render('inquiry')(
        artwork: @artwork
        sd: {}
        asset: (->)
      )

    it 'display contact button', ->
      $ = cheerio.load @html
      $('.artwork-meta-data-black__contact-button').text().should.equal 'Contact Gallery'
      $('.artwork-meta-data-black__contact-button').hasClass('is-disabled').should.equal false
      $('.artwork-meta-data-black__contact-button').attr('href').should.containEql '/inquiry/skull'

  describe 'button not shown for artworks that are not contactable', ->
    before ->
      @artwork.is_inquireable = false

      @html = render('inquiry')(
        artwork: @artwork
        sd: {}
        asset: (->)
      )

    it 'does not display contact button', ->
      $ = cheerio.load @html
      $('.artwork-meta-data-black__contact-button').length.should.equal 0

  describe 'contact gallery button - sold', ->
    before ->
      @artwork.is_sold = true
      @artwork.is_inquireable = true
      @artwork.partner = { type: 'Gallery' }

      @html = render('inquiry')(
        artwork: @artwork
        sd: {}
        asset: (->)
      )

    it 'display contact button', ->
      $ = cheerio.load @html
      $('.artwork-meta-data-black__contact-button').should.exist
      $('.artwork-meta-data-black__contact-button').text().should.equal 'Contact Gallery'

  describe 'buy button', ->
    beforeEach ->
      @artwork.is_acquireable = true
      @artwork.is_inquireable = true

    it 'should display buy now button when in auction', ->
      @html = render('inquiry')(
        artwork: _.extend({}, @artwork, { auction: is_auction: true })
        sd: {}
        asset: (->)
      )
      $ = cheerio.load @html
      $('.js-purchase').text().should.equal 'Buy now'
      $('.artwork-meta-data-black__contact-button').length.should.equal 1

    it 'should display buy now button for auction partners', ->
      @html = render('inquiry')(
        artwork: _.extend({}, @artwork, { partner: type: 'Auction' })
        sd: {}
        asset: (->)
      )
      $ = cheerio.load @html
      $('.js-purchase').text().should.equal 'Buy now'
      $('.artwork-meta-data-black__contact-button').length.should.equal 1

    it 'should display buy button when artwork is acquireable', ->
      @html = render('inquiry')(
        artwork: @artwork
        sd: {}
        asset: (->)
      )
      $ = cheerio.load @html
      $('.js-purchase').text().should.equal 'Buy now'
      $('.artwork-meta-data-black__contact-button').length.should.equal 1

  describe 'auction artwork estimated value', ->
    before ->
      auction = fabricate 'sale'
      auction.is_auction = true
      saleArtwork = fabricate 'sale_artwork'
      saleArtwork.estimate = '$7,000-$9,000'
      auction.sale_artwork = saleArtwork
      @artwork.auction = auction

      @html = render('index')(
        artwork: @artwork
        sd: {}
        stitch: components: ArtworkDetails: sinon.stub()
      )

    it 'displays estimation', ->
      @html.should.containEql '$7,000-$9,000'

    it 'renders bid module', ->
      @html.should.containEql('js-artwork-auction-container')
