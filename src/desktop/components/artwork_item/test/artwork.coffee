cheerio = require 'cheerio'
fs = require 'fs'
jade = require 'jade'
path = require 'path'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
Artwork = require '../../../models/artwork'
Artists = require '../../../collections/artists'
Artist = require '../../../models/artist'
SaleArtwork = require '../../../models/sale_artwork'

render = (template) ->
  filename = path.resolve __dirname, "../templates/#{template}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Artwork Item template', ->

  describe 'artwork item image', ->
    beforeEach ->
      @artwork = new Artwork fabricate 'artwork'

    it 'defaults to a medium size artwork image', ->
      $ = cheerio.load render('artwork')
        artwork: @artwork
        sd: {}
      $('img').attr('src').should.containEql 'medium'

    it 'can render a specified size', ->
      $ = cheerio.load render('artwork')
        artwork: @artwork,
        artworkSize: 'large'
        sd: {}
      $('img').attr('src').should.containEql 'large'

    it 'renders with a fixed with', ->
      $ = cheerio.load render('artwork')
        artwork: @artwork
        imageWidth: 500
        sd: {}
      $('img').attr('width').should.equal '500'
      $('img').attr('height').should.equal '250'
      $('img').attr('src').should.containEql 'medium'

    it 'falls back to an uncropped size', ->
      @artwork.defaultImage().set 'image_versions', ['tall', 'medium']
      $ = cheerio.load render('artwork')
        artwork: @artwork
        artworkSize: 'large'
        sd: {}
      $('img').attr('src').should.containEql 'tall'

    it 'allows arrays in artworkSize and falls back on array', ->
      @artwork.defaultImage().set 'image_versions', ['tall', 'medium']
      $ = cheerio.load render('artwork')
        artwork: @artwork
        artworkSize: ['large', 'medium']
        sd: {}
      $('img').attr('src').should.containEql 'medium'

  describe 'artwork caption', ->
    beforeEach ->
      @artwork = new Artwork fabricate 'artwork'
      @artist = new Artist fabricate 'artist'
      @artist2= new Artist fabricate 'artist', {name: 'Kana', public: true}
      @artwork.related().artists = new Artists @artist
      @html = render('artwork')
        artwork: @artwork
        sd: {}

    it 'displays the artwork title and year', ->
      $ = cheerio.load @html
      $('.artwork-item-title em').text().should.equal @artwork.get 'title'
      $('.artwork-item-title').html().should.equal @artwork.titleAndYear()

    it 'displays the artist name if available', ->
      $ = cheerio.load @html
      $('.artwork-item-artist').text().should.equal @artist.displayName()
      $('.artwork-item-artist a').should.have.lengthOf 0

    it 'displays multiple artists if there are any', ->
      @artwork.related().artists = new Artists [@artist, @artist2]
      @artist.set 'public', true
      $ = cheerio.load render('artwork')
        artwork: @artwork
        sd: {}
      $('.artwork-item-artist a').should.have.lengthOf 2
      $('.artwork-item-artist a').first().text().should.equal 'Pablo Picasso'
      $('.artwork-item-artist a').last().text().should.equal 'Kana'

    it 'links to the artist if it\'s public', ->
      @artist.set 'public', true
      $ = cheerio.load render('artwork')
        artwork: @artwork
        sd: {}
      $('.artwork-item-artist a').text().should.equal @artist.displayName()
      $('.artwork-item-artist a').attr('href').should.equal @artist.href()

    it 'links to the partner name', ->
      @artwork.get('partner').default_profile_public = true
      @artwork.get('partner').default_profile_id = 'moma'
      $ = cheerio.load render('artwork')
        artwork: @artwork
        sd: {}
      $('.artwork-item-partner a').should.have.lengthOf 1
      $('.artwork-item-partner a').text().should.equal @artwork.partnerName()
      $('.artwork-item-partner a').attr('href').should.equal @artwork.partnerLink()

    it 'shows the price if the partner is an institution and the work is forsale', ->
      @artwork.get('partner').type = 'Institution'
      @artwork.set sale_message: "$5,200", forsale: true
      $ = cheerio.load render('artwork')
        artwork: @artwork
        sd: {}
      $('.artwork-item-sale-price').text().should.equal '$5,200'

    it 'displays a sale message', ->
      @artwork.set
        sale_message: "$5,200"
        forsale: true
      $ = cheerio.load render('artwork')
        artwork: @artwork
        sd: {}
      $('.artwork-item-sale-price').text().should.equal @artwork.get 'sale_message'

    it 'displays a sale message if artwork is not for sale', ->
      @artwork.set
        sale_message: "$5,200"
        forsale: false
      $ = cheerio.load render('artwork')
        artwork: @artwork
        sd: {}
      $('.artwork-item-sale-price').length.should.equal 1

    it 'displays on hold with the price if present', ->
      @artwork.set
        price: "$5,200"
        availability: 'on hold'
      $ = cheerio.load render('artwork')
        artwork: @artwork
        sd: {}
      $('.artwork-item-sale-price').text().should.equal '$5,200, on hold'

  describe 'nopin', ->
    beforeEach ->
      @artwork = new Artwork fabricate 'artwork'
      @html = render('artwork')
        artwork: @artwork
        sd: {}

    it 'renders a nopin attribute if the artwork is not sharable', ->
      @artwork.set 'can_share_image', false
      $ = cheerio.load render('artwork')
        artwork: @artwork
        sd: {}
      $('img').attr('nopin').should.equal 'nopin'

    it 'does not render a nopin attribute if the artwork is sharable', ->
      @artwork.set 'can_share_image', true
      $ = cheerio.load render('artwork')
        artwork: @artwork
        sd: {}
      $('img[nopin]').should.have.lengthOf 0

  describe 'blurb', ->

    it 'renders a blurb when the artwork has one and is part of a sale', ->
      @artwork = new Artwork fabricate 'artwork'
      $ = cheerio.load render('artwork')
        artwork: @artwork
        sd: {}
      $('.artwork-item-blurb').should.have.lengthOf 0

      @artwork.set 'blurb', 'This is the blurb'
      $ = cheerio.load render('artwork')
        artwork: @artwork
        sd: {}
      $('.artwork-item-blurb').should.have.lengthOf 0

      @artwork.related().saleArtwork = new SaleArtwork fabricate 'sale_artwork'
      $ = cheerio.load render('artwork')
        artwork: @artwork
        sd: {}
      $('.artwork-item-blurb').should.have.lengthOf 1
      $('.artwork-item-blurb').text().should.containEql 'This is the blurb'

  describe 'buy button', ->

    it 'renders a buy button if the work is acquirable and purchase is allowed, and not a contact CTA', ->
      # Check that initially we have a contact CTA and no buy button
      @artwork = new Artwork fabricate 'artwork', { forsale: true }
      $ = cheerio.load render('artwork')
        artwork: @artwork
        sd: {}
      $('.artwork-item-buy').should.have.lengthOf 0
      $('.artwork-item-contact-seller').text().should.equal 'Contact gallery'

      # Check that now there is a buy button and no contact CTA
      @artwork.set('acquireable', true)
      $ = cheerio.load render('artwork')
        artwork: @artwork
        displayPurchase: true
        sd: {}
      $('.artwork-item-buy').should.have.lengthOf 1
      $('.artwork-item-contact-seller').should.have.lengthOf 0

  describe 'sold', ->

    it 'renders a sold message if the work is sold and purchase is allowed', ->
      @artwork = new Artwork fabricate 'artwork', { sale_message: 'Sold' }
      $ = cheerio.load render('artwork')
        artwork: @artwork
        displayPrice: false
        sd: {}
      $('.artwork-item-sale-price').text().should.equal ''

      $ = cheerio.load render('artwork')
        artwork: @artwork
        displayPrice: true
        sd: {}
      $('.artwork-item-sale-price').text().should.equal 'Sold'

  describe 'is auction', ->
    it 'displays a buy now price', ->
      @artwork = new Artwork fabricate 'artwork', { sale_message: '$10,000' }
      @artwork.set 'sale_artwork', fabricate 'sale_artwork'
      $ = cheerio.load render('artwork')
        artwork: @artwork
        isAuction: true
        sd: {}
      $('.artwork-item-buy-now-price').text().should.containEql '$10,000'

    it 'displays estimate', ->
      @artwork = new Artwork fabricate 'artwork'
      @artwork.set 'sale_artwork', fabricate 'sale_artwork', { display_low_estimate_dollars: '$3,000', display_high_estimate_dollars: '$7,000' }
      $ = cheerio.load render('artwork')
        artwork: @artwork
        isAuction: true
        sd: {}
      $('.artwork-item-estimate').text().should.containEql 'Estimate: $3,000–$7,000'

    it 'displays lot numbers', ->
      @artwork = new Artwork fabricate 'artwork'
      @artwork.set 'sale_artwork', fabricate 'sale_artwork',
        { low_estimate_cents: 300000, high_estimate_cents: 700000, lot_label: '10' }
      $ = cheerio.load render('artwork')
        artwork: @artwork
        isAuction: true
        sd: {}
      $('.artwork-item-lot-number').text().should.containEql 'Lot 10'

  describe 'contact button', ->
    it 'says "Contact gallery"', ->
      @artwork = new Artwork fabricate 'artwork', forsale: true
      $ = cheerio.load render('artwork')
        artwork: @artwork
        displayPurchase: true
        sd: {}
      $('.artwork-item-contact-seller').text().should.equal 'Contact gallery'
