$ = require 'cheerio'
fs = require 'fs'
jade = require 'jade'
{ fabricate } = require 'antigravity'
Profile = require '../../../../../models/profile'
template = jade.compile fs.readFileSync(filename = require.resolve '../template.jade'), filename: filename

describe 'PrimaryCarousel template', ->
  beforeEach ->
    @profile = new Profile fabricate 'profile', owner_type: 'PartnerGallery'
    partner = @profile.related().owner
    partner.set fabricate 'partner'
    partner.related().shows.add fabricate 'show'

  it 'renders correctly', ->
    @html = template profiles: [@profile]
    @$ = $.load @html

    @$('.gpc-subheadline').text()
      .should.equal 'Past New York Show'

    @$('.gpc-location-dates').text()
      .should.equal 'New York, Jul 12 – Aug 23, 2013'
