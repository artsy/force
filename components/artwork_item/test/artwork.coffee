cheerio = require 'cheerio'
fs = require 'fs'
jade = require 'jade'
path = require 'path'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Artwork = require '../../../models/artwork'

render = (template) ->
  filename = path.resolve __dirname, "../templates/#{template}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Artwork Item template', ->

  describe 'artwork item image', ->
    before ->
      @artwork = new Artwork fabricate 'artwork'

    it 'defaults to a medium size artwork image', ->
      $ = cheerio.load render('artwork')({ artwork: @artwork })
      $('.artwork-item-image').attr('src').should.containEql 'medium'

    it 'can render a specified size', ->
      $ = cheerio.load render('artwork')({ artwork: @artwork, artworkSize: 'large' })
      $('.artwork-item-image').attr('src').should.containEql 'large'

    it 'displays missing image if the size is not available', ->
      @artwork.attributes
      $ = cheerio.load render('artwork')({ artwork: @artwork, artworkSize: 'banana' })
      $('.artwork-item-image').attr('src').should.not.containEql 'banana'
      $('.artwork-item-image').attr('src').should.containEql 'missing'

    it 'renders with a fixed with', ->
      $ = cheerio.load render('artwork')({ artwork: @artwork, imageWidth: 500 })
      $('.artwork-item-image').attr('width').should.equal '500'
      $('.artwork-item-image').attr('height').should.equal '250'
      $('.artwork-item-image').attr('src').should.containEql 'medium'

  describe 'artwork caption', ->
    beforeEach ->
      @artwork = new Artwork fabricate 'artwork'
      @html = render('artwork')({ artwork: @artwork })

    it 'displays the artwork title and year', ->
      $ = cheerio.load @html
      $('.artwork-item-title em').text().should.equal @artwork.get 'title'
      $('.artwork-item-title').html().should.equal @artwork.titleAndYear()

    it 'displays the artist name if available', ->
      $ = cheerio.load @html
      $('.artwork-item-artist').text().should.equal @artwork.artistName()
      $('.artwork-item-artist a').should.have.lengthOf 0

    it 'links to the artist if it\'s public', ->
      @artwork.get('artist').public = true
      $ = cheerio.load render('artwork')({ artwork: @artwork })
      $('.artwork-item-artist a').text().should.equal @artwork.artistName()
      $('.artwork-item-artist a').attr('href').should.equal @artwork.artistLink()

    it 'links to the partner name', ->
      @artwork.get('partner').default_profile_public = true
      @artwork.get('partner').default_profile_id = 'moma'
      $ = cheerio.load render('artwork')({ artwork: @artwork })
      $('.artwork-item-partner a').should.have.lengthOf 1
      $('.artwork-item-partner a').text().should.equal @artwork.partnerName()
      $('.artwork-item-partner a').attr('href').should.equal @artwork.partnerLink()

    it 'displays a sale message', ->
      @artwork.set
        sale_message: "$5,200"
        forsale: true
      $ = cheerio.load render('artwork')({ artwork: @artwork })
      $('.artwork-item-sale-price').text().should.equal @artwork.get 'sale_message'

    it 'displays a sale message if artwork is not for sale', ->
      @artwork.set
        sale_message: "$5,200"
        forsale: false
      $ = cheerio.load render('artwork')({ artwork: @artwork })
      $('.artwork-item-sale-price').length.should.equal 1

  describe 'nopin', ->
    beforeEach ->
      @artwork = new Artwork fabricate 'artwork'
      @html = render('artwork')({ artwork: @artwork })

    it 'renders a nopin attribute if the artwork is not sharable', ->
      @artwork.set 'can_share_image', false
      $ = cheerio.load render('artwork')({ artwork: @artwork })
      $('.artwork-item-image').attr('nopin').should.equal 'nopin'

    it 'does not render a nopin attribute if the artwork is sharable', ->
      @artwork.set 'can_share_image', true
      $ = cheerio.load render('artwork')({ artwork: @artwork })
      $('.artwork-item-image[nopin]').should.have.lengthOf 0

  describe 'blurb', ->

    it 'renders a blurb when the artwork has one and is part of a sale', ->
      @artwork = new Artwork fabricate 'artwork'
      $ = cheerio.load render('artwork')({ artwork: @artwork })
      $('.artwork-item-blurb').should.have.lengthOf 0

      @artwork.set 'blurb', 'This is the blurb'
      $ = cheerio.load render('artwork')({ artwork: @artwork })
      $('.artwork-item-blurb').should.have.lengthOf 0

      @artwork.set 'saleArtwork', fabricate 'sale_artwork'
      $ = cheerio.load render('artwork')({ artwork: @artwork })
      $('.artwork-item-blurb').should.have.lengthOf 1
      $('.artwork-item-blurb').text().should.equal @artwork.get 'blurb'

  describe 'buy button', ->

    it 'renders a buy button if the work is acquirable and purchase is allowed', ->
      @artwork = new Artwork fabricate 'artwork', { acquireable: true }
      $ = cheerio.load render('artwork')({ artwork: @artwork })
      $('.artwork-item-buy').should.have.lengthOf 0

      $ = cheerio.load render('artwork')({ artwork: @artwork, displayPurchase: true })
      $('.artwork-item-buy').should.have.lengthOf 1

  describe 'sold', ->

    it 'renders a sold message if the work is sold and purchase is allowed', ->
      @artwork = new Artwork fabricate 'artwork', { sold: true }
      $ = cheerio.load render('artwork')({ artwork: @artwork })
      $('.artwork-item-sold').should.have.lengthOf 0

      $ = cheerio.load render('artwork')({ artwork: @artwork, displayPurchase: true })
      $('.artwork-item-sold').should.have.lengthOf 1

  describe 'is auction', ->
    it 'displays a buy now price'
