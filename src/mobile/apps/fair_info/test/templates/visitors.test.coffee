_ = require 'underscore'
jade = require 'jade'
path = require 'path'
fs = require 'fs'
cheerio = require 'cheerio'
Backbone = require 'backbone'
Fair = require '../../../../models/fair'
PartnerLocation = require '../../../../models/partner_location'
Profile = require '../../../../models/profile'
InfoMenu = require '../../info_menu.coffee'
{ fabricate } = require '@artsy/antigravity'

describe 'Visitors', ->
  infoMenu = null
  beforeEach ->
    infoMenu = new InfoMenu fair: new Fair fabricate 'fair'
    infoMenu.infoMenu = {
      events: true,
      programming: true,
      artsyAtTheFair: false,
      aboutTheFair: false
    }

  render = (fair, location) ->
    filename = path.resolve __dirname, "../../templates/visitors.jade"
    jade.compile(fs.readFileSync(filename), filename: filename)
      fair: fair
      location: location
      infoMenu: infoMenu
      sd: { FAIR: fair, profile: new Profile fabricate 'fair' }

  it 'should not display map without coordinates', ->
    location = new PartnerLocation(fabricate('partner_location'))
    fair = new Fair(fabricate('fair'))

    @html = render(fair, location)
    @html.should.not.containEql 'fair-page-info-map'
    @html.should.not.containEql 'Hours'
    @html.should.not.containEql 'Tickets'
    @html.should.containEql 'Links'

  it 'render a map with coordinates', ->
    fair = new Fair fabricate('fair')
    location = new PartnerLocation(fabricate('partner_location', coordinates: { lat: 30, lng: 74 } ))
    @html = render fair, location
    @html.should.containEql 'fair-info2-map'

  it 'renders location', ->
    fair = new Fair fabricate('fair')
    location = new PartnerLocation(fabricate('partner_location', summary: '401 Broadway New York, New York' ))
    @html = render fair, location
    $ = cheerio.load @html
    @html.should.containEql 'Location'
    @html.should.containEql 'fair-page-info-location-summary'
    $('.fair-page-info-location-summary').html().should.containEql '401 Broadway New York, New York'

  it 'renders hours', ->
    fair = new Fair fabricate('fair', hours: '8:00am - 5:00pm')
    location = new PartnerLocation(fabricate('partner_location'))
    @html = render fair, location
    $ = cheerio.load @html
    @html.should.containEql 'Hours'
    $('.fair-info-hours.formatted-markdown').html().should.containEql '8:00am - 5:00pm'

  it 'renders tickets', ->
    fair = new Fair fabricate('fair', tickets: 'Adult - $25')
    location = new PartnerLocation(fabricate('partner_location'))
    @html = render fair, location
    $ = cheerio.load @html
    @html.should.containEql 'Tickets'
    $('.fair-info-tickets').html().should.containEql 'Adult - $25'

  it 'renders contact', ->
    fair = new Fair fabricate('fair')
    location = new PartnerLocation(fabricate('partner_location'))
    @html = render fair, location
    $ = cheerio.load @html
    @html.should.containEql 'Contact'
    $('.fair-info-contact').html().should.containEql "<p>Design Miami/ Office<br>Call + 1 555 555 5555</p>"

  it 'renders links', ->
    fair = new Fair fabricate('fair')
    location = new PartnerLocation(fabricate('partner_location'))
    @html = render fair, location
    $ = cheerio.load @html
    @html.should.containEql 'Links'
    $('.fair-info-link').html().should.containEql '<p><a href="http://google.com">Google</a></p>'
