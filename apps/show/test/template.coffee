_               = require 'underscore'
jade            = require 'jade'
path            = require 'path'
fs              = require 'fs'
cheerio         = require 'cheerio'
Backbone        = require 'backbone'
{ fabricate }   = require 'antigravity'
PartnerShow     = require '../../../models/partner_show.coffee'
Profile         = require '../../../models/profile'
AdditionalImage = require '../../../models/additional_image'
Artwork         = require '../../../models/artwork'
Artworks        = require '../../../collections/artworks'


render = (templateName) ->
  filename = path.resolve __dirname, "../#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Partner Show', ->

  before ->
    @sd =
      ARTSY_URL : 'http://localhost:5000'
      ASSET_PATH: 'http://localhost:5000'
    @show = new PartnerShow fabricate('show')
    @profile = new Profile fabricate 'partner_profile'
    @artworks = new Artworks [
      new Artwork fabricate 'artwork'
      new Artwork fabricate 'artwork'
      new Artwork fabricate 'artwork'
      new Artwork fabricate 'artwork'
      new Artwork fabricate 'artwork'
      new Artwork fabricate 'artwork'
    ]
    @installShots = new Backbone.Collection [
      new AdditionalImage fabricate 'artwork_image', { default: true }
      new AdditionalImage fabricate 'artwork_image'
      new AdditionalImage fabricate 'artwork_image'
      new AdditionalImage fabricate 'artwork_image'
      new AdditionalImage fabricate 'artwork_image'
      new AdditionalImage fabricate 'artwork_image'
    ]
    @html = render('template')({
      artworkColumns  : @artworks.groupByColumnsInOrder 3
      carouselFigures : @installShots.models
      fair            : @show.fair()
      location        : @show.location()
      partner         : @show.partner()
      sd              : @sd
      show            : @show
      profile         : @profile
    })

  describe 'template', ->

    it 'renders install shots', ->
      $ = cheerio.load @html
      $('.carousel').should.have.lengthOf 1

    it 'does not render the install shot carousel container if there are no install shots', ->
      @html = render('template')({
        artworkColumns  : @artworks.groupByColumnsInOrder 3
        carouselFigures : []
        fair            : @show.fair()
        location        : @show.location()
        partner         : @show.partner()
        sd              : @sd
        show            : @show
        profile         : @profile
      })
      $ = cheerio.load @html
      $('.carousel').should.have.lengthOf 0

    it 'renders a small profile badge', ->
      $ = cheerio.load @html
      $('.profile-badge-small').should.have.lengthOf 1
      $('.profile-badge-small').text().should.include @profile.displayName()

    it 'renders social sharing links', ->
      $ = cheerio.load @html
      $('.show-share').should.have.lengthOf 1
      $('.show-share .share-to-facebook').should.have.lengthOf 1
      $('.show-share .share-to-twitter').should.have.lengthOf 1

    it 'renders a show title', ->
      $ = cheerio.load @html
      $('.show-heading-title').text().should.equal @show.title()

    it 'renders show details', ->
      $ = cheerio.load @html
      $('.show-header-last').text().should.include @show.get('partner').name
      $('.show-header-last').text().should.include @show.location().singleLine()
      $('.show-header-last').html().should.include @show.runningDates()

    it 'renders show artworks in three columns', ->
      $ = cheerio.load @html
      @artworks.each (artwork) ->
        $(".artwork-item[data-artwork='#{artwork.get('id')}']").should.have.lengthOf 1
        $(".artwork-item[data-artwork='#{artwork.get('id')}'] img").attr('src').should.include artwork.defaultImageUrl()
      $(".artwork-column").should.have.lengthOf 3
