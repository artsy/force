_             = require 'underscore'
jade          = require 'jade'
path          = require 'path'
fs            = require 'fs'
cheerio       = require 'cheerio'
Backbone      = require 'backbone'
{ fabricate } = require 'antigravity'
OrderedSets   = require '../../../collections/ordered_sets.coffee'
Profiles      = require '../../../collections/profiles'
Partner       = require '../../../models/partner'


render = (templateName) ->
  filename = path.resolve __dirname, "../#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Partners', ->

  before ->
    sd =
      API_URL : 'http://localhost:5000'
      ASSET_PATH: 'http://localhost:5000'

    @profiles = new Profiles [
      fabricate('featured_partners_profiles',
        id: '43-salon-inter-nacional-de-artistas'
        owner: fabricate('partner',
          type: "Museum"
          name: '43 Salón (Inter) Nacional de Artistas'
        )
      )
      fabricate('featured_partners_profiles',
        id: 'getty'
        owner: fabricate('partner',
          type: "Museum"
          name: "J. Paul Getty Museum"
          sortable_id: 'getty'
          locations: new Backbone.Collection([fabricate('location')])
        )
      )
      fabricate('featured_partners_profiles',
        id: 'lacma'
        owner: fabricate('partner',
          type: "Museum"
          name: "LACMA"
          locations: new Backbone.Collection([fabricate('location')])
        )
      )
    ]
    @aToZGroup = @profiles.groupByAlphaWithColumns(3)
    @html = render('template')({
      sd: sd
      aToZGroup: @aToZGroup
      partnerCount: @profiles.length
    })

  describe 'template', ->

    it 'renders an A to Z list of institutional partners with links to the partner', ->
      $ = cheerio.load @html
      @profiles.each (profile) ->
        markup = $(".featured-partners-institutions-list").html()
        markup.should.include profile.get('owner').name
        markup.should.include "/#{profile.get('id')}"
      $(".a-to-z-row-letter").eq(0).text().should.equal @aToZGroup[0].letter
      $(".a-to-z-row-letter").eq(1).text().should.equal @aToZGroup[1].letter
      $(".a-to-z-row-letter").eq(2).text().should.equal @aToZGroup[2].letter

    it 'includes a page title', ->
      $ = cheerio.load @html
      $('.featured-partners-title').text().should.equal "Institutions, Museums, and Nonprofits"

    it 'includes a count of the featured institutions', ->
      $ = cheerio.load @html
      $('.featured-partners-count-value').text().should.equal "#{@profiles.length}"
      $('.featured-partners-count-label').text().should.equal 'Selected Institutional Partners'

    it 'includes a link to the "become a partner" form', ->
      $ = cheerio.load @html
      $('.featured-partners-partner-invite').length.should.equal 1
      $('.featured-partners-partner-invite a').attr('href').should.equal "http://apply.artsy.net/"

    it 'includes links to galleries and instutions in the header and footer', ->
      $ = cheerio.load @html
      $('.featured-partners-nav').length.should.equal 2
      $(".featured-partners-nav a[href='/galleries']").length.should.equal 2
      $(".featured-partners-nav .is-active").length.should.equal 2
      $(".featured-partners-nav .is-active").attr('href').should.equal "/institutions"
