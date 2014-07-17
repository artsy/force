jade = require 'jade'
path = require 'path'
fs = require 'fs'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
PartnerShow = require '../../../models/partner_show'
PartnerShows = require '../../../collections/partner_shows'
Fair = require '../../../models/fair'
Fairs = require '../../../collections/fairs'
Partners = require '../../../collections/partners'
Profile = require '../../../models/profile'
Profiles = require '../../../collections/profiles'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'location page', ->
  describe 'fair', ->
    beforeEach ->
      @fair = new Fair fabricate 'fair', { organizer: {profile_id: 'big-fair'}, name: 'Big Fair', summary: 'huge fair' }
      @template = render('show')(
        title: "Galleries and Art Shows Near Tokyo"
        name: 'Tokyo'
        showsOpeningThisWeek: []
        otherShows: []
        profiles: new Profiles()
        fairs: new Fairs([@fair])
        sd: {}
        otherLocations: []
      )

    it 'should be titled with location name', ->
      @template.should.include "Galleries and Art Shows Near Tokyo"
      @template.should.include "View galleries and art shows near Tokyo on Artsy."  # description

    it 'should list fairs', ->
      @template.should.include "Big Fair"
      @template.should.include "huge fair"

  describe 'shows', ->
    beforeEach ->
      @show1 = new PartnerShow fabricate 'show', { name: 'This Show', start_at: '2013-07-12', end_at: '2013-09-01' }
      @show2 = new PartnerShow fabricate 'show', { name: 'That Show', start_at: '2013-07-12', end_at: '2013-09-01' }
      @template = render('show')(
        title: "Galleries and Art Shows Near Tokyo"
        name: 'Tokyo'
        showsOpeningThisWeek: [@show1]
        otherShows: [@show2]
        profiles: new Profiles()
        fairs: new Fairs()
        sd: {}
        otherLocations: [['san-francisco', {name: 'San Francisco'}]]
      )

    it 'should list shows', ->
      @template.should.include "This Show"
      @template.should.include "Jul. 12th &#x2013; Sep. 1st 2013"
      @template.should.include "That Show"
      @template.should.include "Other Current and Upcoming Shows"
      @template.should.include "Other Cities"
      @template.should.include "San Francisco"

  describe 'partner profiles', ->
    beforeEach ->
      @profile = new Profile fabricate 'partner_profile', { partner: { name: 'Gagosian Gallery' } }
      @template = render('show')(
        title: "Galleries and Art Shows Near Tokyo"
        name: 'Tokyo'
        showsOpeningThisWeek: []
        otherShows: []
        profiles: new Profiles([@profile])
        fairs: new Fairs()
        sd: {}
        otherLocations: []
      )

    it 'should list profiles', ->
      @template.should.include "Gagosian Gallery"
