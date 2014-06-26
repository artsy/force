_             = require 'underscore'
jade          = require 'jade'
path          = require 'path'
fs            = require 'fs'
cheerio       = require 'cheerio'
Backbone      = require 'backbone'
{ fabricate } = require 'antigravity'
Partners      = require '../../../collections/partners'

render = (templateName) ->
  filename = path.resolve __dirname, "../#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Galleries', ->

  before ->
    sd =
      API_URL : 'http://localhost:5000'
      ASSET_PATH: 'http://localhost:5000'
    @partners = new Partners [
      fabricate('partner',
        type: "Gallery"
        name: '21st Twenty First'
        default_profile_id: '21st-twenty-first'
        sortable_id: '21st-twenty-first'
      )
      fabricate('partner',
        type: "Gallery"
        name: "Zach Feuer"
        sortable_id: 'feuer-zach'
        default_profile_id: 'zach-feuer'
      )
      fabricate('partner',
        type: "Gallery"
        name: "UNIX Gallery"
        sortable_id: 'unix-gallery'
        default_profile_id: 'unix-gallery'
      )
    ]
    @aToZGroup = @partners.groupByAlphaWithColumns(3)
    @html = render('template')({
      sd          : sd
      aToZGroup   : @aToZGroup
      partnerCount: @partners.length
    })

  describe 'template', ->

    it 'renders an A to Z list of gallery partners with links to the partner', ->
      $ = cheerio.load @html
      @partners.each (partner) ->
        markup = $(".featured-partners-galleries-list").html()
        markup.should.include partner.get 'name'
        markup.should.include "/#{partner.get('default_profile_id')}"
      $(".a-to-z-row-letter").eq(0).text().should.equal @aToZGroup[0].letter
      $(".a-to-z-row-letter").eq(1).text().should.equal @aToZGroup[1].letter
      $(".a-to-z-row-letter").eq(2).text().should.equal @aToZGroup[2].letter

    it 'includes a page title', ->
      $ = cheerio.load @html
      $('.featured-partners-title').text().should.equal "Selected Galleries"

    it 'includes a count of the featured galleries', ->
      $ = cheerio.load @html
      $('.featured-partners-count-value').text().should.equal "#{@partners.length}"
      $('.featured-partners-count-label').text().should.equal 'Selected Gallery Partners'

    it 'includes a link to the "become a partner" form', ->
      $ = cheerio.load @html
      $('.featured-partners-partner-invite').length.should.equal 1
      $('.featured-partners-partner-invite a').attr('href').should.equal "http://apply.artsy.net/"

    it 'includes links to galleries and instutions in the header and footer', ->
      $ = cheerio.load @html
      $('.featured-partners-nav').length.should.equal 2
      $(".featured-partners-nav a[href='/institutions']").length.should.equal 2
      $(".featured-partners-nav .is-active").length.should.equal 2
      $(".featured-partners-nav .is-active").attr('href').should.equal "/galleries"
