cheerio       = require 'cheerio'
fs            = require 'fs'
jade          = require 'jade'
path          = require 'path'
Backbone      = require 'backbone'
{ fabricate } = require 'antigravity'
Artwork       = require '../../../models/artwork'

render = (template) ->
  filename = path.resolve __dirname, "../#{template}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Artwork Item template', ->

  describe 'artwork item image', ->
    before ->
      @artwork = new Artwork fabricate 'artwork'

    it 'defaults to a medium size artwork image', ->
      $ = cheerio.load render('template')({ artwork: @artwork })
      $('.artwork-item-image').attr('src').should.include 'medium'

    it 'can render a specified size', ->
      $ = cheerio.load render('template')({ artwork: @artwork, artworkSize: 'large' })
      $('.artwork-item-image').attr('src').should.include 'large'

    it 'displays missing image if the size is not available', ->
      @artwork.attributes
      $ = cheerio.load render('template')({ artwork: @artwork, artworkSize: 'banana' })
      $('.artwork-item-image').attr('src').should.not.include 'banana'
      $('.artwork-item-image').attr('src').should.include 'missing'

  describe 'artwork caption', ->
    beforeEach ->
      @artwork = new Artwork fabricate 'artwork'
      @html = render('template')({ artwork: @artwork })

    it 'displays the artwork title and year', ->
      $ = cheerio.load @html
      $('.artwork-item-title em').text().should.equal @artwork.get 'title'
      $('.artwork-item-title').html().should.equal @artwork.titleAndYear()

    it 'displays the artist name if available', ->
      $ = cheerio.load @html
      $('.artwork-item-artist').text().should.equal @artwork.get('artist').name
      $('.artwork-item-artist a').should.have.lengthOf 0

    it 'links to the artist if it\'s public', ->
      @artwork.get('artist').public = true
      $ = cheerio.load render('template')({ artwork: @artwork })
      $('.artwork-item-artist a').text().should.equal @artwork.get('artist').name
      $('.artwork-item-artist a').attr('href').should.equal @artwork.artistLink()

    it 'links to the partner name', ->
      @artwork.get('partner').default_profile_public = true
      @artwork.get('partner').default_profile_id = 'moma'
      $ = cheerio.load render('template')({ artwork: @artwork })
      $('.artwork-item-partner a').text().should.equal @artwork.partnerName()
      $('.artwork-item-partner a').attr('href').should.equal @artwork.partnerLink()

    it 'displays a sale message', ->
      @artwork.set 'sale_message', "$5,200"
      $ = cheerio.load render('template')({ artwork: @artwork })
      $('.artwork-item-sale-price').text().should.equal @artwork.get 'sale_message'
