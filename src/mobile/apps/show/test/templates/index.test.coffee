jade = require 'jade'
path = require 'path'
fs = require 'fs'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
Show = require '../../../../models/show.coffee'
Location = require '../../../../models/location.coffee'
FairLocation = require '../../../../models/fair_location.coffee'
Artworks = require '../../../../collections/artworks.coffee'
Fair = require '../../../../models/fair.coffee'
InstallShots = require '../../../../collections/install_shots.coffee'
cheerio = require 'cheerio'

render = (templateName) ->
  filename = path.resolve __dirname, "../../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'header', ->
  describe 'fair booth with install shots', ->
    before ->
      @show = new Show fabricate 'show', fair: fabricate 'fair'
      @template = render('index')(
        show: @show
        fair: new Fair fabricate 'fair', name: 'Foo Bar Fair', published: true, has_full_feature: true
        location: new FairLocation fabricate 'location'
        installShots: new InstallShots [fabricate 'show_install_shot']
        artworks: new Artworks [ fabricate 'artwork', partner: fabricate 'partner' ]
        sd: {}
      )

    it 'displays information for fair booth', ->
      $ = cheerio.load @template
      $('.show-page-title').html().should.containEql 'Gagosian Gallery'
      $('.show-page-title').html().should.containEql 'Foo Bar Fair'
      $('.show-page-location-address').html().should.containEql 'Foo Bar Fair'

    it 'does not display installshots on fair booth', ->
      $ = cheerio.load @template
      $.html().should.not.containEql 'show-installation-shot-carousel'

    it 'links to the fair if possible', ->
      $ = cheerio.load @template
      $('.show-page-location-map').html().should.containEql 'a href="/the-armory-show"'

  describe 'gallery show with install shots', ->
    before ->
      @show = new Show fabricate 'show', name: "Test Gallery Show"
      @template = render('index')(
        show: @show
        fair: []
        location: new FairLocation fabricate 'location'
        installShots: new InstallShots [fabricate 'show_install_shot']
        artworks: new Artworks [ fabricate 'artwork', partner: fabricate 'partner' ]
        sd: {}
      )

    it 'displays information for gallery show', ->
      $ = cheerio.load @template
      $('.show-page-title').html().should.containEql "Test Gallery Show"
      $('.show-page-location-address').text().should.containEql "529 W 20th St."

    it 'formats the running dates correctly', ->
      $ = cheerio.load @template
      $('.show-page-running-dates').text().should.containEql "Jul 12th – Aug 23rd, 2013"

    it 'displays the install shots carousel', ->
      $ = cheerio.load @template
      $.html().should.containEql 'show-installation-shot-carousel'

    it 'displays the correct number of install shots', ->
      $ = cheerio.load @template
      $('#carousel-track').children().length.should.equal 1

    it 'displays the correct google maps link', ->
      $ = cheerio.load @template
      $('.show-page-location-map').html().should.containEql "q=529%20W%2020th%20St.%2C%20New%20York"

describe 'artworks', ->
  describe 'show with less than 8 artworks', ->
    before ->
      @show = new Show fabricate 'show', fair: fabricate 'fair'
      @template = render('index')(
        show: @show
        fair: new Fair fabricate 'fair', name: 'Foo Bar Fair'
        location: new FairLocation fabricate 'location'
        installShots: new InstallShots [fabricate 'show_install_shot']
        artworks: new Artworks [ fabricate 'artwork', partner: fabricate 'partner' ]
        sd: {}
      )

    it 'should not have an artwork slider', ->
      $ = cheerio.load @template
      $.html().should.not.containEql 'show-page-artworks-slider'

  describe 'show with more than 8 artworks', ->
    before ->
      @show = new Show fabricate 'show', fair: fabricate 'fair'
      @template = render('index')(
        show: @show
        fair: new Fair fabricate 'fair', name: 'Foo Bar Fair'
        location: new FairLocation fabricate 'location'
        installShots: new InstallShots [fabricate 'show_install_shot']
        artworks: new Artworks [
          fabricate('artwork', id: 1),
          fabricate('artwork', id: 2),
          fabricate('artwork', id: 3),
          fabricate('artwork', id: 4),
          fabricate('artwork', id: 5),
          fabricate('artwork', id: 6),
          fabricate('artwork', id: 7),
          fabricate('artwork', id: 8),
          fabricate('artwork', id: 9),
        ]
        sd: {}
      )

    xit 'should have an artwork slider', ->
      $ = cheerio.load @template
      $.html().should.containEql 'show-page-artworks-slider'

    it 'displays the correct number of artworks', ->
      $ = cheerio.load @template
      $('.show-page-artworks-title').html().should.containEql "9 Works"

describe 'index', ->
  describe 'show with events, press release and associated artist', ->
    before ->
      @show = new Show fabricate 'show', press_release: "The gallery is proud to present Inez and Vinoodh."
      @show.related().artists.set [fabricate 'artist']
      @template = render('index')(
        show: @show
        fair: new Fair fabricate 'fair', name: 'Foo Bar Fair'
        location: new FairLocation fabricate 'location'
        installShots: new InstallShots [fabricate 'show_install_shot']
        artworks: new Artworks [ fabricate 'artwork', partner: fabricate 'partner' ]
        sd: {}
      )

    it 'displays events if they are present', ->
      $ = cheerio.load @template
      $('.show-page-event').first().text().should.containEql "Opening Reception: Inez and Vinoodh Opening, Jan 7th, 8 – 9pm"

    it 'renders the correct information from the press release', ->
      $ = cheerio.load @template
      $('.show-page-press-release-content').text().should.containEql "The gallery is proud to present Inez and Vinoodh."

    it 'renders the artists with follow buttons', ->
      $ = cheerio.load @template
      $('#show-follow-artists').html().should.containEql 'Pablo Picasso'

describe 'index', ->
  describe 'show with no events, no press release and no associated artists', ->
    before ->
      @show = new Show fabricate 'show', events: []
      @template = render('index')(
        show: @show
        fair: new Fair fabricate 'fair', name: 'Foo Bar Fair'
        location: new FairLocation fabricate 'location'
        installShots: new InstallShots [fabricate 'show_install_shot']
        artworks: new Artworks [ fabricate 'artwork', partner: fabricate 'partner' ]
        sd: {}
      )

    it 'should not render the events container', ->
      $ = cheerio.load @template
      $.html().should.not.containEql '.show-page-event'

    it 'should not load the press release container', ->
      $ = cheerio.load @template
      $.html().should.not.containEql '.show-page-press-release-content'

    it 'should not load the artist follow buttons', ->
      $ = cheerio.load @template
      $.html().should.not.containEql '#show-follow-artists'
