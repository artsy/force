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
    @show = new PartnerShow(
      id: 'gagosian-gallery-inez-and-vinoodh'
      fair: null
      location:
        id: '51df5e068b3b815b62000012'
        name: 'Location 4'
        address: '456 North Camden Drive'
        address_2: ''
        city: 'Beverly Hills'
        country: 'United States'
        state: 'CA'
        postal_code: '90201'
        phone: '1 (310) 271-9400'
        coordinates: null
        position: 4
        email: ''
        fax: ''
        publicly_viewable: true
      fair_location: null
      partner:
        id: 'gagosian-gallery'
        default_profile_id: 'gagosian-gallery'
        default_profile_public: true
        sortable_id: 'gagosian-gallery'
        type: 'Gallery'
        name: 'Gagosian Gallery'
        website: 'http://www.gagosian.com'
        has_full_profile: true
      name: 'Inez & Vinoodh'
      image_url: '/local/partner_show_images/51f6a51d275b24a787000c36/1/:version.jpg'
      image_versions: [ 'medium', 'tall', 'large', 'larger', 'featured', 'general' ]
      description: ''
      press_release: ''
      created_at: '2013-07-17T21:27:50Z'
      publish_at: '2013-09-05T21:14:23Z'
      featured: false
      start_at: '2013-07-12T04:00:00+00:00'
      end_at: '2013-08-23T04:00:00+00:00'
      eligible_artworks_count: 6
      displayable: true
      images_count: 0
      status: 'closed'
      updated_at: '2013-09-26T15:03:29Z'
      coordinates: null
    )
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
