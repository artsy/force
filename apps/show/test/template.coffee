_ = require 'underscore'
jade = require 'jade'
path = require 'path'
fs = require 'graceful-fs'
sd = require('sharify').data
cheerio = require 'cheerio'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
PartnerShow = require '../../../models/partner_show'
Profile = require '../../../models/profile'
AdditionalImage = require '../../../models/additional_image'
Artwork = require '../../../models/artwork'
Artworks = require '../../../collections/artworks'
InstallShots = require '../../../collections/install_shots'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Partner Show', ->
  describe 'with a public profile', ->
    beforeEach ->
      @show = new PartnerShow fabricate('show')
      @profile = new Profile fabricate 'partner_profile'
      @html = render('index')
        fair: @show.fair()
        location: @show.location()
        partner: @show.partner()
        sd: sd
        asset: (->)
        show: @show
        profile: @profile
        installShots: new InstallShots

    describe 'template', ->
      it 'renders a show title', ->
        $ = cheerio.load @html
        $('.show-heading-title').text().should.equal @show.title()

      it 'renders show details', ->
        $ = cheerio.load @html
        $('.show-header__left').text().should.containEql @show.get('partner').name
        $('.show-header__left').text().should.containEql @show.location().singleLine()
        $('.show-header__left').text().should.containEql @show.runningDates()
        $(".show-header__left a[href*='/show/#{@show.get('id')}']").should.have.lengthOf 0

      it 'renders back navigation', ->
        @show.set fair: fabricate('fair')
        @html = render('index')({
          fair: @show.fair()
          location: @show.location()
          partner: @show.partner()
          sd: sd
          asset: (->)
          show: @show
          profile: @profile
          context: 'fair'
          installShots: new InstallShots
        })
        $ = cheerio.load @html
        $('.show-metadata__fair-organizer').should.have.lengthOf 1
        $('.show-metadata__fair-organizer').text().should.containEql @show.fair().get('name')

      it 'renders back navigation without fair organizer', ->
        @show.set fair: fabricate('fair')
        @show.fair().set organizer: undefined
        @html = render('index')({
          fair: @show.fair()
          location: @show.location()
          partner: @show.partner()
          sd: sd
          asset: (->)
          show: @show
          profile: @profile
          context: 'fair'
          installShots: new InstallShots
        })
        $ = cheerio.load @html
        $('.show-metadata__fair-organizer').should.have.lengthOf 1
        $('.show-metadata__fair-organizer').text().should.containEql @show.fair().get('name')

      it 'renders social sharing links', ->
        $ = cheerio.load @html
        $('.show-share').should.have.lengthOf 1
        $('.show-share .share-to-facebook').should.have.lengthOf 1
        $('.show-share .share-to-twitter').should.have.lengthOf 1

      it 'renders a container for artwork columns', ->
        $ = cheerio.load @html
        $(".artworks-columns").should.have.lengthOf 1

  describe 'with a private profile', ->
    beforeEach ->
      @show = new PartnerShow fabricate('show')
      @show.partner().default_profile_public = false
      @html = render('index')({
        fair: @show.fair()
        location: @show.location()
        partner: @show.partner()
        sd: sd
        asset: (->)
        show: @show
        installShots: new InstallShots
      })

    describe 'template', ->
      it 'doesnt render a small profile badge', ->
        $ = cheerio.load @html
        $('.profile-badge-small').should.have.lengthOf 0

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
        $('.show-header__left').text().should.containEql @show.get('partner').name
        $('.show-header__left').text().should.containEql @show.location().singleLine()
        $('.show-header__left').text().should.containEql @show.runningDates()
        $(".show-header__left a[href*='/show/#{@show.get('id')}']").should.have.lengthOf 0

      it 'renders a container for artwork columns', ->
        $ = cheerio.load @html
        $(".artworks-columns").should.have.lengthOf 1


  describe 'with 1 installation shot', ->
    beforeEach ->
      @show = new PartnerShow fabricate('show')
      @html = render('index')
        fair: @show.fair()
        location: @show.location()
        partner: @show.partner()
        sd: sd
        asset: (->)
        show: @show
        installShots: new InstallShots [fabricate 'show_install_shot']

    it 'does not render the carousel', ->
      $ = cheerio.load @html
      $('#show-installation-shot-carousel').should.have.lengthOf 0

  describe 'with 3 or more installation shots', ->
    beforeEach ->
      @show = new PartnerShow fabricate('show')
      @html = render('index')
        fair: @show.fair()
        location: @show.location()
        partner: @show.partner()
        sd: sd
        asset: (->)
        show: @show
        installShots: new InstallShots _.times 3, -> fabricate('show_install_shot')

    it 'renders installation shots', ->
      $ = cheerio.load @html
      $('#show-installation-shot-carousel').should.have.lengthOf 1
      $('.carousel-figure').should.have.lengthOf 9
