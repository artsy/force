$ = require 'cheerio'
fs = require 'fs'
jade = require 'jade'
{ fabricate } = require '@artsy/antigravity'
Profile = require '../../../../../models/profile'
template = jade.compile fs.readFileSync(filename = require.resolve '../template.jade'), filename: filename

describe 'PrimaryCarousel template', ->

  describe 'with at least one profile to show', ->
    before ->
      @profile = new Profile fabricate 'profile', owner_type: 'PartnerGallery'
      partner = @profile.related().owner
      partner.set fabricate 'partner'
      partner.related().shows.add fabricate 'show'

    it 'displays the carousel', ->
      @html = template profiles: [@profile]
      @$ = $.load @html
      @$('.gpc-body').should.not.be.empty()

    it 'renders correctly', ->
      @html = template profiles: [@profile]
      @$ = $.load @html

      @$('.gpc-subheadline').text()
        .should.equal 'Past New York Show'

      @$('.gpc-location-dates').text()
        .should.equal 'New York, Jul 12 – Aug 23, 2013'

    describe 'with more than one profile to show', ->
      it 'shows navigation arrows', ->
        @html = template profiles: [@profile, @profile]
        @$ = $.load @html
        @$*('.gpc-bumpers').should.not.be.empty()

  describe 'with no profiles to show', ->
    it 'does not display the carousel', ->
      @html = template profiles: []
      @html.should.be.empty()
