_ = require 'underscore'
jade = require 'jade'
cheerio = require 'cheerio'
path = require 'path'
fs = require 'fs'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'

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
    before ->
      @artwork.is_acquireable = true

      @html = render('inquiry')(
        artwork: @artwork
        sd: {}
        asset: (->)
      )

    it 'display buy button', ->
      $ = cheerio.load @html
      $('.artwork-meta-data-black__contact-button').text().should.equal 'Buy'

  describe 'series, medium, dimensions, image rights', ->
    before ->
      @html = render('details')(
        artwork: @artwork
        sd: {}
        asset: (->)
      )

    it 'display series, medium, dimensions, and image rights', ->
      @html.should.containEql 'The coolest series'
      @html.should.containEql 'Watercolor on Paper'
      @html.should.containEql '10 × 20 × 30in, 100 × 200 × 40cm'
      @html.should.containEql 'Sourced from ARS'

  describe 'for sale works partner header', ->
    describe 'gallery - not for sale', ->
      beforeEach ->
        @artwork.is_for_sale = false
        @artwork.partner.type = 'Gallery'

      it 'should display Gallery header', ->
        html = render('partner')(
          artwork: @artwork
          sd: {}
          asset: (->)
        )

        $ = cheerio.load(html)
        $('.artwork-meta-data__partner .artwork-header').text().should.equal 'Gallery'

    describe 'gallery - for sale', ->
      beforeEach ->
        @artwork.is_for_sale = true
        @artwork.partner.type = 'Gallery'

      it 'should display Offered by when work is for sale', ->
        html = render('partner')(
          artwork: @artwork
          sd: {}
          asset: (->)
        )

        $ = cheerio.load(html)
        $('.artwork-meta-data__partner .artwork-header').text().should.equal 'Offered by'

    describe 'auction house - not for sale', ->
      beforeEach ->
        @artwork.is_for_sale = false
        @artwork.partner.type = 'Auction House'
        @artwork.partner.name = 'Phillips'

      it 'should display Gallery header', ->
        html = render('partner')(
          artwork: @artwork
          sd: {}
          asset: (->)
        )

        $ = cheerio.load(html)
        $('.artwork-meta-data__partner .artwork-header').text().should.equal 'Auction House'
        $('.artwork-meta-data__partner .artwork-partner-name').text().should.equal 'Phillips'

    describe 'auction house - for sale', ->
      beforeEach ->
        @artwork.is_for_sale = true
        @artwork.partner.type = 'Auction House'
        @artwork.partner.name = 'Phillips'

      it 'should display Offered by when work is for sale', ->
        html = render('partner')(
          artwork: @artwork
          sd: {}
          asset: (->)
        )

        $ = cheerio.load(html)
        $('.artwork-meta-data__partner .artwork-header').text().should.equal 'Offered by'
        $('.artwork-meta-data__partner .artwork-partner-name').text().should.equal 'Phillips'

    describe 'e-commerce - for sale', ->
      beforeEach ->
        @artwork.is_acquireable = true

      it 'should render a "Buy" button', ->
        html = render('index')(
          artwork: @artwork
        )

        html.should.containEql 'Buy'

    describe 'collecting institution', ->
      beforeEach ->
        @artwork.is_for_sale = true
        @artwork.partner.type = 'Institution'
        @artwork.collecting_institution = "Marcel Broodthaers: A Retrospective at Museum of Modern Art, New York"

      it 'should drop institution header', ->
        html = render('partner')(
          artwork: @artwork
        )

        $ = cheerio.load(html)
        $('.artwork-meta-data__partner .artwork-header').text().should.equal ""

      it 'should display collecting institution as link text', ->
        html = render('partner')(
          artwork: @artwork
        )

        $ = cheerio.load(html)
        $('.artwork-partner-link').text().should.equal "Marcel Broodthaers: A Retrospective at Museum of Modern Art, New York"

  describe 'partner', ->
    describe 'gallery - partner', ->
      before ->
        @artwork.partner.href = '/gagosian-gallery'
        @artwork.collecting_institution = null

        @html = render('partner')(
          artwork: @artwork
        )

      it 'should link to partner\'s page', ->
        $ = cheerio.load(@html)
        $('.artwork-partner-link').text().should.equal 'Gagosian Gallery'
        $('.artwork-partner-link').attr('href').should.equal '/gagosian-gallery'

    describe 'gallery - institution', ->
      before ->
        @artwork.partner.type = 'Institutional Seller'
        @artwork.collecting_institution = null

        @html = render('partner')(
          artwork: @artwork
        )

      it 'should link to partner\'s page', ->
        $ = cheerio.load(@html)
        $('.artwork-meta-data__partner .artwork-header').text().should.equal 'Institution'

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
      )

    it 'displays estimation', ->
      @html.should.containEql '$7,000-$9,000'

    it 'renders bid module', ->
      @html.should.containEql('js-artwork-auction-container')
