_ = require 'underscore'
jade = require 'jade'
path = require 'path'
fs = require 'fs'
cheerio = require 'cheerio'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
Partner = require '../../../models/partner'
Profiles = require '../../../collections/profiles'


render = (templateName) ->
  filename = path.resolve __dirname, "../#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Partners', ->

  before ->
    @sd =
      API_URL: 'http://localhost:5000'
    @profiles = new Profiles [
      fabricate('featured_partners_profiles',
        id: 'gagosian'
        owner: new Partner(fabricate('partner',
          type: "Gallery"
          locations: new Backbone.Collection([fabricate('location')])
        ))
      )
      fabricate('featured_partners_profiles',
        id: 'getty'
        owner: new Partner(fabricate('partner',
          type: "Institution"
          name: "J. Paul Getty Museum"
          locations: new Backbone.Collection([fabricate('location')])
        ))
      )
      fabricate('featured_partners_profiles',
        id: 'lacma'
        owner: new Partner(fabricate('partner',
          type: "Institution"
          name: "LACMA"
          locations: new Backbone.Collection([fabricate('location')])
        ))
      )
    ]
    @html = render('template')({
      sd: @sd
      featuredPartnerProfiles: @profiles
    })

  describe 'template', ->

    it 'renders featured partners', ->
      $ = cheerio.load @html
      $("a.nav-image-item").length.should.equal 3
      @profiles.each (profile) ->
        partner = profile.get 'owner'
        $partnerItem = $("a.nav-image-item[href='/#{profile.get('id')}']")
        $partnerItem.length.should.equal 1
        $partnerItem.find(".nav-image-item-label-title").length.should.equal 1
        $partnerItem.find(".nav-image-item-label-title").text().should.equal partner.get 'name'
        $partnerItem.find(".nav-image-item-label-subtitle").text().should.containEql partner.get('locations').first().get('city')

    it 'includes a page title', ->
      $ = cheerio.load @html
      $('.page-heading').text().should.equal "Featured Partners"

    it 'includes a link to the "become a partner" form', ->
      $ = cheerio.load @html
      $('.featured-partners-invite').length.should.equal 1
      $('.featured-partners-invite a').attr('href').should.equal "https://www.artsy.net/apply/"

    # TODO: Add this with the other index pages
    #it 'includes links to galleries and instutions in the header and footer', ->
    #  $ = cheerio.load @html
    #  $('.featured-partners-nav').length.should.equal 2
    #  $(".featured-partners-nav a[href='/galleries']").length.should.equal 2
    #  $(".featured-partners-nav a[href='/institutions']").length.should.equal 2

    describe 'with incomplete location data', ->

      it 'renders without a location', ->
        @profiles = new Profiles [
          fabricate('featured_partners_profiles',
            id: 'gagosian'
            owner: new Partner(fabricate('partner',
              type: "Gallery"
              locations: new Backbone.Collection()  # No locations
            ))
          )
          fabricate('featured_partners_profiles',
            id: 'pace'
            owner: new Partner(fabricate('partner',
              type: "Gallery"
              locations: new Backbone.Collection([fabricate 'location', city: ''])  # No city
            ))
          )
        ]
        html = render('template')({
          sd: @sd
          featuredPartnerProfiles: @profiles
        })
        $ = cheerio.load html
        $(".nav-image-item-label-subtitle").length.should.equal 1
        $(".nav-image-item-label-subtitle").text().should.equal ''
