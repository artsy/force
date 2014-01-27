_               = require 'underscore'
jade            = require 'jade'
path            = require 'path'
fs              = require 'fs'
cheerio         = require 'cheerio'
Backbone        = require 'backbone'
{ fabricate }   = require 'antigravity'
OrderedSets     = require '../../../collections/ordered_sets.coffee'
Partner         = require '../../../models/partner'
Profiles        = require '../../../collections/profiles'


render = (templateName) ->
  filename = path.resolve __dirname, "../#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Partners', ->

  before ->
    @sd =
      ARTSY_URL : 'http://localhost:5000'
      ASSET_PATH: 'http://localhost:5000'
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
          type: "Museum"
          name: "J. Paul Getty Museum"
          locations: new Backbone.Collection([fabricate('location')])
        ))
      )
      fabricate('featured_partners_profiles',
        id: 'lacma'
        owner: new Partner(fabricate('partner',
          type: "Museum"
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
      @profiles.each (profile) ->
        partner = profile.get 'owner'
        $featuredProfile =  $(".featured-partner-profile[data-profile-id='#{profile.get('id')}']")
        $featuredProfile.length.should.equal 1
        $featuredProfile.find("a[href='/#{profile.get('id')}']").length.should.equal 2
        $featuredProfile.find(".featured-partner-profile-name").length.should.equal 1
        $featuredProfile.find(".featured-partner-profile-name").text().should.equal partner.displayName()
        $featuredProfile.find(".featured-partner-profile-location").text().should.include partner.get('type')
        $featuredProfile.find(".featured-partner-profile-location").text().should.include partner.get('locations').first().get('city')

    it 'includes a page title', ->
      $ = cheerio.load @html
      $('.featured-partners-title').text().should.equal "Featured Partners"

    it 'includes a link to a wufoo "become a partner" form', ->
      $ = cheerio.load @html
      $('.featured-partners-partner-invite').length.should.equal 1
      $('.featured-partners-partner-invite a').attr('href').should.equal "https://artsy.wufoo.com/forms/artsy-partnership-request-form/"

    it 'includes links to galleries and instutions in the header and footer', ->
      $ = cheerio.load @html
      $('.featured-partners-nav').length.should.equal 2
      $(".featured-partners-nav a[href='/galleries']").length.should.equal 2
      $(".featured-partners-nav a[href='/institutions']").length.should.equal 2

    it 'includes a button to follow partner profiles', ->
      $ = cheerio.load @html
      $('.follow-button').should.have.lengthOf @profiles.length

    it 'renders all follow buttons in an unfollowed state', ->
      $ = cheerio.load @html
      $(".follow-button[data-state='following']").should.have.lengthOf 0

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
      $(".featured-partner-profile-location").length.should.equal 2
      $($(".featured-partner-profile-location")[0]).text().should.equal 'Gallery'
      $($(".featured-partner-profile-location")[1]).text().should.equal 'Gallery'
