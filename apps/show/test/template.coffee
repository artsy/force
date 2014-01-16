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

  beforeEach ->
    @sd =
      ARTSY_URL : 'http://localhost:5000'
      ASSET_PATH: 'http://localhost:5000'
    @show = new PartnerShow fabricate('show')
    @profile = new Profile fabricate 'partner_profile'
    @html = render('template')({
      fair    : @show.fair()
      location: @show.location()
      partner : @show.partner()
      sd      : @sd
      show    : @show
      profile : @profile
    })

  describe 'template', ->

    it 'renders a container for install shots if the show has them', ->
      @show.set 'images_count', 3
      @html = render('template')({
        fair    : @show.fair()
        location: @show.location()
        partner : @show.partner()
        sd      : @sd
        show    : @show
        profile : @profile
      })
      $ = cheerio.load @html
      $('.carousel').should.have.lengthOf 1

    it 'does not render the install shot carousel container if there are no install shots', ->
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

    it 'renders a container for artwork columns', ->
      $ = cheerio.load @html
      $(".artworks-columns").should.have.lengthOf 1
